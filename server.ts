import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { JsonDb } from './server/db';
import dotenv from 'dotenv';

dotenv.config();

// Create the Gemini client with official configuration and user-agent header
let ai: GoogleGenAI | null = null;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (GEMINI_API_KEY && GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log('Gemini API client initialized successfully.');
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.warn('GEMINI_API_KEY environment variable is not defined or is placeholder. HydroJarvis will use local rule-based system.');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // === API ROUTES ===

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Services API
  app.get('/api/services', (req, res) => {
    res.json(JsonDb.getServices());
  });

  app.post('/api/services', (req, res) => {
    const service = req.body;
    if (!service.title || !service.description) {
      return res.status(400).json({ error: 'Title and Description are required' });
    }
    const newService = JsonDb.addService(service);
    res.status(201).json(newService);
  });

  app.delete('/api/services/:id', (req, res) => {
    const success = JsonDb.deleteService(req.params.id);
    res.json({ success });
  });

  // Gallery API
  app.get('/api/gallery', (req, res) => {
    res.json(JsonDb.getGallery());
  });

  app.post('/api/gallery', (req, res) => {
    const item = req.body;
    if (!item.title || !item.imageUrl) {
      return res.status(400).json({ error: 'Title and Image URL are required' });
    }
    const newItem = JsonDb.addGalleryItem(item);
    res.status(201).json(newItem);
  });

  app.delete('/api/gallery/:id', (req, res) => {
    const success = JsonDb.deleteGalleryItem(req.params.id);
    res.json({ success });
  });

  // Testimonials API
  app.get('/api/testimonials', (req, res) => {
    res.json(JsonDb.getTestimonials());
  });

  app.post('/api/testimonials', (req, res) => {
    const testimonial = req.body;
    if (!testimonial.name || !testimonial.feedback) {
      return res.status(400).json({ error: 'Name and Feedback are required' });
    }
    const newTestimonial = JsonDb.addTestimonial({
      name: testimonial.name,
      company: testimonial.company || 'Private Farm/Estate',
      role: testimonial.role || 'Client',
      feedback: testimonial.feedback,
      rating: Number(testimonial.rating) || 5,
      avatar: testimonial.avatar || `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 99999)}?auto=format&fit=crop&w=120&q=80`
    });
    res.status(201).json(newTestimonial);
  });

  app.put('/api/testimonials/:id/approve', (req, res) => {
    const approved = req.body.approved !== false;
    const updated = JsonDb.approveTestimonial(req.params.id, approved);
    if (!updated) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(updated);
  });

  app.delete('/api/testimonials/:id', (req, res) => {
    const success = JsonDb.deleteTestimonial(req.params.id);
    res.json({ success });
  });

  // Contacts / Inquiries API
  app.get('/api/contacts', (req, res) => {
    res.json(JsonDb.getContacts());
  });

  app.post('/api/contacts', (req, res) => {
    const contact = req.body;
    if (!contact.name || !contact.email || !contact.message) {
      return res.status(400).json({ error: 'Name, Email and Message are required' });
    }
    const newContact = JsonDb.addContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || '',
      subject: contact.subject || 'General Inquiry',
      message: contact.message
    });

    // Mock Nodemailer sending confirmation in console beautifully
    console.log(`
=========================================
[SMTP EMAIL SIMULATION]
To: ${contact.email}
Subject: Inquiry Confirmed - HydroVision AI
Body: Dear ${contact.name}, thank you for contacting HydroVision AI. Srikanth or Ravikanth will review your hydrogeological inquiry ("${contact.subject}") shortly.
=========================================
[SMTP ADMIN NOTIFICATION]
To: admin@hydrovision.ai
Subject: NEW CUSTOMER INQUIRY received
From: ${contact.name} (${contact.email})
Message: ${contact.message}
=========================================
    `);

    res.status(201).json(newContact);
  });

  app.post('/api/contacts/:id/reply', (req, res) => {
    const { replyText } = req.body;
    if (!replyText) return res.status(400).json({ error: 'Reply text is required' });
    const updated = JsonDb.replyToContact(req.params.id, replyText);
    if (!updated) return res.status(404).json({ error: 'Inquiry not found' });

    console.log(`
=========================================
[SMTP EMAIL SENT OUT]
To: ${updated.email}
Subject: Re: ${updated.subject} - HydroVision AI
Body: ${replyText}
--
Best regards,
Srikanth & Ravikanth
Senior Ground Water Consultants
New Delhi
=========================================
    `);

    res.json(updated);
  });

  app.delete('/api/contacts/:id', (req, res) => {
    const success = JsonDb.deleteContact(req.params.id);
    res.json({ success });
  });

  // Appointments API
  app.get('/api/appointments', (req, res) => {
    res.json(JsonDb.getAppointments());
  });

  app.post('/api/appointments', (req, res) => {
    const apt = req.body;
    if (!apt.name || !apt.email || !apt.date || !apt.time || !apt.service) {
      return res.status(400).json({ error: 'Name, Email, Date, Time, and Service are required' });
    }
    const newApt = JsonDb.addAppointment({
      name: apt.name,
      email: apt.email,
      phone: apt.phone || '',
      date: apt.date,
      time: apt.time,
      service: apt.service,
      notes: apt.notes || ''
    });

    console.log(`
=========================================
[GOOGLE CALENDAR API SIMULATION]
Event Created: Hydrogeological Consultation with ${apt.name}
Service: ${apt.service}
Time: ${apt.date} at ${apt.time}
Google Calendar Event ID: gcal-${Math.random().toString(36).substr(2, 9)}
=========================================
[SMTP APPOINTMENT CONFIRMATION]
To: ${apt.email}
Subject: Consultation Scheduled - HydroVision AI
Body: Dear ${apt.name}, your appointment for "${apt.service}" is scheduled on ${apt.date} at ${apt.time}. Our senior consultants Srikanth/Ravikanth will call you at ${apt.phone || 'your number'}.
=========================================
    `);

    res.status(201).json(newApt);
  });

  app.put('/api/appointments/:id/status', (req, res) => {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });
    const updated = JsonDb.updateAppointmentStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ error: 'Appointment not found' });

    console.log(`
=========================================
[GOOGLE CALENDAR API UPDATE]
Event ID: gcal-... for ${updated.name} updated to: ${status}
=========================================
    `);

    res.json(updated);
  });

  app.delete('/api/appointments/:id', (req, res) => {
    const success = JsonDb.deleteAppointment(req.params.id);
    res.json({ success });
  });

  // Admin Auth API
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
    const admin = JsonDb.authenticate(email, password);
    if (!admin) return res.status(401).json({ error: 'Invalid email or password' });
    res.json({ token: `mock-jwt-token-${Math.random().toString(36).substr(2)}`, admin });
  });

  // Jarvis Chat API
  app.post('/api/jarvis/chat', async (req, res) => {
    const { messages, message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const promptMessage = message;

    // Strict system context about HydroVision AI (Srikanth & Ravikanth)
    const systemInstruction = `You are HydroJarvis, a brilliant, highly professional, futuristic groundwater AI Assistant representing "HydroVision AI", led by senior ground water consultants Mr. Srikanth and Mr. Ravikanth, who possess 30+ years of hydrogeological expertise in Northern India (Delhi, Punjab, Haryana, UP, Rajasthan).
    
Your role is to:
1. Provide highly scientific, precise groundwater recommendations, explaining geological formations (Alluvial sands, fracture rock aquifers, clay aquifers) and electrical resistivity techniques (Schlumberger, Wenner configuration).
2. Answer inquiries about the office address: "84 – III Floor, Humayun Pur, Safdarjung Enclave, New Delhi – 110029".
3. Promote collaboration with entities like Neer Company.
4. Assist users who want to book a consultation. Guide them to schedule by giving precise suggestions, and tell them they can book right inside the panel.
5. Provide helpful FAQ details about Borewells, water auditing, rainwater harvesting design, and CGWA (Central Ground Water Authority) NOC legal rules.

Be extremely articulate, technical yet elegant, helpful, and concise. Do NOT give long generic paragraphs; use beautifully structured bullet points and bold headers.`;

    // Local rule-based system if Gemini API Key is missing or invalid
    if (!ai) {
      console.log('Using rule-based response for HydroJarvis (No Gemini Key)');
      let replyText = '';
      const lowercaseMsg = promptMessage.toLowerCase();

      if (lowercaseMsg.includes('address') || lowercaseMsg.includes('location') || lowercaseMsg.includes('office')) {
        replyText = `Our premium consulting office is located at:
• **Address:** 84 – III Floor, Humayun Pur, Safdarjung Enclave, New Delhi – 110029
• **Consultants:** Mr. Srikanth & Mr. Ravikanth (30+ Years Experience)
Would you like to schedule an in-person meeting or an on-site field investigation?`;
      } else if (lowercaseMsg.includes('services') || lowercaseMsg.includes('investigation') || lowercaseMsg.includes('survey')) {
        replyText = `Under the direct guidance of Mr. Srikanth and Mr. Ravikanth, HydroVision AI provides:
• **Electrical Resistivity Surveys:** Schlumberger & Wenner arrays for fracture zones.
• **Hydrogeological Mapping:** Watershed planning, aquifer recharge models.
• **Borewell Consultancy:** Site selection, casing design, yield testing (V-notch).
• **Regulatory Approvals:** CGWA (Central Ground Water Authority) NOCs & impact audits.
Would you like to book an appointment with our senior consultants?`;
      } else if (lowercaseMsg.includes('book') || lowercaseMsg.includes('schedule') || lowercaseMsg.includes('consultation') || lowercaseMsg.includes('meeting')) {
        replyText = `I can absolutely help you schedule a priority hydrogeological consultation! 
You can use the **Book Appointment** form inside this HydroJarvis assistant window. 
• Choose your required service (e.g., Ground Water Investigation).
• Choose a convenient date and time.
Mr. Srikanth or Mr. Ravikanth will review your request instantly. Let me know if you need help with soil resistivity configurations!`;
      } else if (lowercaseMsg.includes('cgwa') || lowercaseMsg.includes('noc') || lowercaseMsg.includes('legal') || lowercaseMsg.includes('industrial')) {
        replyText = `Securing a CGWA (Central Ground Water Authority) NOC is mandatory for industrial units in Northern India. We provide:
• **Hydrogeological Impact Assessment Reports**
• **In-situ permeability & rainwater harvesting recharge plans** (essential for CGWA approvals)
• **Digital Telemetry Installation Consultancy**
Let us know your daily industrial water requirement so we can model your water balance sheet!`;
      } else {
        replyText = `Welcome to HydroVision AI, guided by 30+ years of professional hydrogeological excellence. I am **HydroJarvis**, your geological advisor.
        
How may I assist you today?
• Describe your land's location (Punjab, Haryana, Delhi NCR) for specific aquifer depth suggestions.
• Ask about **Electrical Resistivity Geophysical Imaging**.
• Select **Book Appointment** inside this window to reserve a live technical survey with Mr. Srikanth & Mr. Ravikanth.`;
      }

      return res.json({ text: replyText });
    }

    try {
      console.log(`Sending query to Gemini Model gemini-3.6-flash: "${promptMessage.substring(0, 50)}..."`);
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptMessage,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || 'I apologize, I am processing groundwater data but had a brief telemetry issue. Please try again.';
      res.json({ text: reply });
    } catch (err: any) {
      console.error('Error contacting Gemini API:', err);
      res.status(500).json({ error: 'Failed to communicate with HydroJarvis AI engine' });
    }
  });

  // === VITE MIDDLEWARE AND STATIC SERVING ===

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development middleware integrated.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production static assets.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HydroVision AI Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
