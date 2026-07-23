import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { ContactInquiry } from '../types';

interface ContactProps {
  darkMode: boolean;
  onSubmitSuccess: () => void;
}

export default function Contact({ darkMode, onSubmitSuccess }: ContactProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Borewell Consultancy',
    message: ''
  });

  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: 'Borewell Consultancy', message: '' });
        onSubmitSuccess();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Failed to log your inquiry. Please try again.');
      }
    } catch (err) {
      setError('Connection issue. Please check your network.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2 font-semibold">Connect</span>
          <h2 className={`text-3xl md:text-5xl font-bold font-display-serif ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
            Initiate Your Site Investigation
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-rose-400 to-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Office details & stylized Map (5cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-1 font-semibold">Corporate Office</span>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 font-display-serif ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
                HydroVision Headquarters
              </h3>
              <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Visit our consult desk in New Delhi or coordinate an active on-site geological resistivity layout with our field engineers.
              </p>
            </div>

            {/* Quick Details Cards list */}
            <div className="space-y-4">
              {/* Card Address */}
              <div className={`p-4 rounded-xl border flex items-start gap-4 transition-all artistic-card ${
                darkMode ? 'bg-[#0d0c1c]/90 border-[#D4AF37]/15' : 'bg-white border-amber-900/10 shadow-md shadow-[#D4AF37]/5'
              }`}>
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Address
                  </h4>
                  <p className={`text-sm font-semibold mt-1 leading-relaxed ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
                    84 – III Floor, Humayun Pur, Safdarjung Enclave, New Delhi – 110029
                  </p>
                </div>
              </div>

              {/* Card Phone & Whatsapp */}
              <div className={`p-4 rounded-xl border flex items-start gap-4 transition-all artistic-card ${
                darkMode ? 'bg-[#0d0c1c]/90 border-[#D4AF37]/15' : 'bg-white border-amber-900/10 shadow-md shadow-[#D4AF37]/5'
              }`}>
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Inquiries Phone
                    </h4>
                    <p className={`text-sm font-semibold mt-1 ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
                      +91 98765 43210 / +91 11 4321 0987
                    </p>
                  </div>
                  <a
                    href="https://wa.me/919876543210?text=Hello%20HydroVision%20AI%20Consultants%20I%20would%20like%20to%20inquire%20about%20a%20groundwater%20resistivity%20survey."
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all text-xs font-mono self-start sm:self-center cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Card Email */}
              <div className={`p-4 rounded-xl border flex items-start gap-4 transition-all artistic-card ${
                darkMode ? 'bg-[#0d0c1c]/90 border-[#D4AF37]/15' : 'bg-white border-amber-900/10 shadow-md shadow-[#D4AF37]/5'
              }`}>
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Official Email
                  </h4>
                  <a 
                    href="mailto:inquiry@hydrovision.ai" 
                    className="text-sm font-semibold mt-1 block text-[#D4AF37] hover:underline"
                  >
                    inquiry@hydrovision.ai
                  </a>
                </div>
              </div>
            </div>

            {/* Stylized custom scientific Map block instead of broken standard frame */}
            <div className={`rounded-xl overflow-hidden border relative p-4 artistic-card ${
              darkMode ? 'bg-[#0d0c1c]/90 border-[#D4AF37]/15' : 'bg-slate-100 border-amber-900/15'
            }`}>
              <div className="absolute top-3 left-3 bg-slate-950/90 text-white text-[10px] font-mono px-2 py-1 rounded border border-[#D4AF37]/20 z-10 flex items-center gap-1.5 font-bold">
                <Clock className="w-3 h-3 text-[#D4AF37]" /> Active hours: 9:00 AM - 6:00 PM (Mon-Sat)
              </div>
              
              {/* Geological Grid Illustration */}
              <div className="h-44 rounded-lg bg-slate-950 relative overflow-hidden border border-white/5 flex flex-col justify-center items-center text-center p-4">
                {/* Horizontal Stratigraphic Lines */}
                <div className="absolute left-0 right-0 top-1/4 h-0.5 bg-yellow-600/10" />
                <div className="absolute left-0 right-0 top-2/4 h-0.5 bg-cyan-600/10" />
                <div className="absolute left-0 right-0 top-3/4 h-0.5 bg-[#D4AF37]/10" />
                
                <MapPin className="w-8 h-8 text-[#D4AF37] animate-bounce z-10" />
                <h5 className="font-mono text-xs text-white mt-2 z-10 font-bold">SAFDERJUNG ENCLAVE, NEW DELHI</h5>
                <p className="text-[10px] text-slate-400 mt-1 max-w-xs z-10">
                  84 – III Floor, Humayun Pur, Safdarjung Enclave, New Delhi – 110029
                </p>
                <span className="text-[9px] font-mono mt-2 text-slate-500 z-10">
                  Lat: 28.5683° N | Long: 77.2008° E
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated form panel (7cols) */}
          <div className="lg:col-span-7">
            <div className={`p-8 rounded-2xl border artistic-card ${
              darkMode ? 'glass-panel border-[#D4AF37]/20 bg-[#0d0c1c]/90' : 'bg-white border-amber-900/15 shadow-xl'
            }`}
            id="contact-form-panel"
            >
              <h3 className={`text-xl md:text-2xl font-bold font-display-serif mb-2 ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
                Submit a Hydrogeological Inquiry
              </h3>
              <p className={`text-xs md:text-sm mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Fill out this secure questionnaire. Srikanth ji or Ravikanth ji will call you within 24 business hours.
              </p>

              {submitted ? (
                <div className="text-center py-12 animate-fade-in" id="contact-success-screen">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold font-display-serif">Inquiry Logged Successfully!</h4>
                  <p className={`text-sm mt-2 max-w-md mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Thank you! Your information is securely logged in the HydroVision AI CRM. A copy of confirmation has been simulated.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Your Name*</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Srikanth Verma"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                          darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Email Address*</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g., srikanth@gmail.com"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                          darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g., +91 98765 43210"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                          darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Service Category</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                          darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                        }`}
                      >
                        <option value="Ground Water Investigation">Ground Water Investigation</option>
                        <option value="Hydrogeological Survey">Hydrogeological Survey</option>
                        <option value="Borewell Site Selection">Borewell Site Selection</option>
                        <option value="Industrial NOC Consulting">Industrial NOC Consulting</option>
                        <option value="Agricultural Irrigation Blueprints">Agricultural Irrigation Blueprints</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Geological Inquiries / Project Scope*</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please details your land area, general location (e.g., Delhi, Haryana), depth requirements or compliance targets..."
                      className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      id="submit-contact-btn"
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-[#D4AF37] hover:opacity-90 text-white font-semibold text-xs md:text-sm active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      {submitting ? 'Verifying geological parameters...' : 'Transmit Inquiries'}
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
