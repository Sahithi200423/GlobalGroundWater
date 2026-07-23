import React from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Calendar, 
  Layers, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight,
  Eye,
  Sparkles
} from 'lucide-react';
import { ChatMessage } from '../types';

interface HydroJarvisProps {
  darkMode: boolean;
  onAppointmentBooked: () => void;
}

export default function HydroJarvis({ darkMode, onAppointmentBooked }: HydroJarvisProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'chat' | 'book' | 'recs' | 'faq'>('chat');
  
  // Chat state
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      sender: 'jarvis',
      text: "Greetings! I am HydroJarvis, your geoelectrical and hydrogeological predictive assistant. Guided by Mr. Srikanth and Mr. Ravikanth's 30+ years of local basin studies, how can I advise you on groundwater investigations today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = React.useState('');
  const [sendingMsg, setSendingMsg] = React.useState(false);
  
  // Booking state
  const [bookForm, setBookForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '11:00 AM',
    service: 'Ground Water Investigation',
    notes: 'Inquiry booked via HydroJarvis floating panel.'
  });
  const [bookingStatus, setBookingStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Ground water recommendations tool state
  const [selectedState, setSelectedState] = React.useState('Delhi NCR');
  const [soilYieldRec, setSoilYieldRec] = React.useState('');
  const [loadingRecs, setLoadingRecs] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  // Auto scroll messages to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle standard Gemini chat
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || sendingMsg) return;

    const userText = inputVal.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Append User Message
    const userMsg: ChatMessage = { sender: 'user', text: userText, timestamp };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setSendingMsg(true);

    try {
      const response = await fetch('/api/jarvis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      if (response.ok) {
        const data = await response.json();
        const jarvisMsg: ChatMessage = {
          sender: 'jarvis',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, jarvisMsg]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'jarvis',
          text: "I apologize. My satellite telemetry link had a brief disturbance. Let's retry that resistivity or mapping question, or contact Srikanth directly at our safdarjung desk.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setSendingMsg(false);
    }
  };

  // Handle local predictive guidelines using Gemini chat endpoint
  const loadStateRecommendations = async (stateVal: string) => {
    setLoadingRecs(true);
    setSelectedState(stateVal);
    try {
      const promptText = `Provide a scientific groundwater recommendation summary for the region of: ${stateVal}. 
      Mention estimated aquifer depth, geological soil formations, recommended resistivity array types (e.g. Schlumberger vertical electrical sounding), and estimated yield parameters (LPM). Keep it extremely concise (under 4 bullets, very technical).`;
      
      const response = await fetch('/api/jarvis/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: promptText })
      });
      if (response.ok) {
        const data = await response.json();
        setSoilYieldRec(data.text);
      } else {
        throw new Error();
      }
    } catch (err) {
      setSoilYieldRec("Failed to retrieve recommendations. Please check your network.");
    } finally {
      setLoadingRecs(false);
    }
  };

  // Load Delhi NCR initial data when tab clicked
  React.useEffect(() => {
    if (activeTab === 'recs' && !soilYieldRec) {
      loadStateRecommendations('Delhi NCR');
    }
  }, [activeTab]);

  // Handle quick booking inside HydroJarvis
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookForm.name || !bookForm.email || !bookForm.date || !bookForm.phone) {
      setBookingStatus('error');
      return;
    }
    setBookingStatus('loading');
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookForm)
      });
      if (response.ok) {
        setBookingStatus('success');
        onAppointmentBooked();
        setTimeout(() => {
          setBookForm({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '11:00 AM',
            service: 'Ground Water Investigation',
            notes: 'Inquiry booked via HydroJarvis floating panel.'
          });
          setBookingStatus('idle');
          setActiveTab('chat');
        }, 3000);
      } else {
        setBookingStatus('error');
      }
    } catch (err) {
      setBookingStatus('error');
    }
  };

  const localFaqs = [
    {
      q: 'What is an Electrical Resistivity survey?',
      a: 'A geophysical method sending electric current into the soil. We measure resistance down to 300 meters to map clay, alluvial sands, fracture zones, or hard basalt bedrock layers.'
    },
    {
      q: 'Why do borewells fail in Northern India?',
      a: 'Contractors often dig blindly without locating specific fracture-joint patterns. In hard rock layers (e.g. South Delhi, Gurgaon), water is localized; drilling 5 meters away from a joint can yield a completely dry dry borehole.'
    },
    {
      q: 'How do I obtain CGWA NOC permits?',
      a: 'Central Ground Water Authority requires full hydrogeological assessments for industrial draws. We execute local soil percolation tests, water budgets, and submit validated architectural harvesting designs for seamless clearance.'
    },
    {
      q: 'Where is Srikanth and Ravikanth ji office?',
      a: 'We consult from 84 – III Floor, Humayun Pur, Safdarjung Enclave, New Delhi – 110029. We supervise active drilling rigs on-site throughout Delhi, UP, Punjab, Rajasthan, and Haryana.'
    }
  ];

  return (
    <>
      {/* Floating Circular Jarvis Launcher Button with Futuristic Pulsing Ring */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Pulsing Back Ring */}
        <span className="absolute inset-0 rounded-full bg-[#D4AF37]/20 glow-pulse scale-125 z-0"></span>
        <button
          id="hydro-jarvis-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 via-[#D4AF37] to-amber-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-300 shadow-xl cursor-pointer"
          title="Open HydroJarvis AI Assistant"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 animate-bounce" />}
        </button>
      </div>

      {/* Futuristic HydroJarvis Side Console Panel */}
      {isOpen && (
        <div 
          className={`fixed top-24 bottom-6 right-6 w-[360px] md:w-[400px] z-40 rounded-2xl overflow-hidden border flex flex-col shadow-2xl transition-all duration-300 artistic-card ${
            darkMode ? 'bg-[#050816]/95 border-[#D4AF37]/25 text-white' : 'bg-white/95 border-amber-900/15 text-slate-900'
          }`}
          style={{ backdropFilter: 'blur(16px)' }}
          id="hydro-jarvis-console"
        >
          {/* Header Panel */}
          <div className="p-4 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-[#D4AF37]/20">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                <Bot className="w-5.5 h-5.5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold tracking-tight font-display-sans">HydroJarvis AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
                <span className="text-[10px] font-mono text-[#D4AF37] block font-bold">30+ Yrs Geological Memory Matrix</span>
              </div>
            </div>
            
            {/* Direct Close Button */}
            <button
              id="close-jarvis-panel"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5 text-[#D4AF37]" />
            </button>
          </div>

          {/* Assistant Navigation Tabs */}
          <div className="flex border-b border-white/5 text-xs font-mono">
            <button
              id="jarvis-tab-chat"
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                activeTab === 'chat' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'border-transparent opacity-70'
              }`}
            >
              Consult AI
            </button>
            <button
              id="jarvis-tab-recs"
              onClick={() => setActiveTab('recs')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                activeTab === 'recs' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'border-transparent opacity-70'
              }`}
            >
              Stratigraphy
            </button>
            <button
              id="jarvis-tab-book"
              onClick={() => setActiveTab('book')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                activeTab === 'book' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'border-transparent opacity-70'
              }`}
            >
              Book Consult
            </button>
            <button
              id="jarvis-tab-faq"
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
                activeTab === 'faq' ? 'border-[#D4AF37] text-[#D4AF37] font-bold' : 'border-transparent opacity-70'
              }`}
            >
              FAQs
            </button>
          </div>

          {/* Active Tab Screen Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Tab 1: AI Chat Console */}
            {activeTab === 'chat' && (
              <div className="h-full flex flex-col justify-between" id="jarvis-chat-screen">
                <div className="flex-1 space-y-3 pr-1 overflow-y-auto max-h-[380px]">
                  {messages.map((m, idx) => (
                    <div 
                      key={idx}
                      className={`flex flex-col max-w-[85%] ${
                        m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                      }`}
                    >
                      {/* Message Bubble */}
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-700 to-[#D4AF37] text-white rounded-tr-none font-medium'
                          : darkMode 
                            ? 'bg-slate-900 border border-[#D4AF37]/15 text-slate-100 rounded-tl-none' 
                            : 'bg-slate-100 text-slate-800 border border-amber-900/10 rounded-tl-none'
                      }`}>
                        {/* Markdown representation using split lines for readability */}
                        {m.text.split('\n').map((line, lIdx) => (
                          <p key={lIdx} className={lIdx > 0 ? 'mt-1' : ''}>{line}</p>
                        ))}
                      </div>
                      <span className="text-[9px] opacity-50 font-mono mt-1 px-1">
                        {m.timestamp}
                      </span>
                    </div>
                  ))}
                  {sendingMsg && (
                    <div className="flex items-center gap-2 text-xs opacity-60 font-mono pl-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" />
                      HydroJarvis processing basin records...
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input form */}
                <form onSubmit={handleSendMessage} className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                  <input
                    type="text"
                    required
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask about resistivity, Haryana aquifers, casing..."
                    className={`flex-1 px-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#D4AF37] ${
                      darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                    }`}
                  />
                  <button
                    id="jarvis-send-msg"
                    type="submit"
                    className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-[#D4AF37] text-white hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: Geological Stratigraphy recommendations */}
            {activeTab === 'recs' && (
              <div className="space-y-4" id="jarvis-recs-screen">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">Stratigraphic Model Solver</h4>
                  <p className="text-[11px] opacity-75">Select a regional district block to generate specialized resistivity array layouts and predicted yield parameters.</p>
                </div>

                {/* State selector dropdown */}
                <div className="flex gap-2">
                  <select
                    id="state-rec-selector"
                    value={selectedState}
                    onChange={(e) => loadStateRecommendations(e.target.value)}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                      darkMode ? 'bg-slate-900 border-[#D4AF37]/15 text-white' : 'bg-white border-amber-900/10 text-slate-900'
                    }`}
                  >
                    <option value="Delhi NCR">Delhi NCR (Safdarjung, Noida, Gurgaon)</option>
                    <option value="Punjab Plains">Punjab (Ludhiana, Jalandhar, Patiala)</option>
                    <option value="Haryana Bedrock">Haryana (Gurgaon Basements, Rohtak)</option>
                    <option value="Rajasthan Aquifer">Rajasthan (Jaipur basins, Sandstone)</option>
                    <option value="Uttar Pradesh Alluvium">Western UP (Meerut, Ghaziabad)</option>
                  </select>
                </div>

                {/* Soil advice output */}
                <div className={`p-4 rounded-xl border min-h-[180px] flex flex-col justify-center ${
                  darkMode ? 'bg-slate-950/80 border-[#D4AF37]/15' : 'bg-slate-50 border-amber-900/10'
                }`}>
                  {loadingRecs ? (
                    <div className="text-center text-xs opacity-60 font-mono py-8">
                      <Sparkles className="w-6 h-6 text-[#D4AF37] animate-spin mx-auto mb-2" />
                      Computing local stratigraphic curves...
                    </div>
                  ) : (
                    <div className="text-xs leading-relaxed space-y-2">
                      <div className="flex items-center gap-1.5 mb-2 font-bold font-mono text-[#D4AF37] border-b border-white/5 pb-1">
                        <Layers className="w-4 h-4" /> LOCAL SOIL Blueprints
                      </div>
                      {soilYieldRec ? (
                        soilYieldRec.split('\n').map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))
                      ) : (
                        <p>Loading geological profiles...</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-[10px] opacity-50 text-center font-mono">
                  *Formulated under CGWA norms and resistivity profiles.
                </div>
              </div>
            )}

            {/* Tab 3: Quick Book Appointment */}
            {activeTab === 'book' && (
              <div id="jarvis-book-screen">
                {bookingStatus === 'success' ? (
                  <div className="text-center py-8 animate-fade-in">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                    <h4 className="text-sm font-bold font-display-serif">Priority Consultation Booked!</h4>
                    <p className="text-[11px] opacity-75 mt-1">Logged securely in our Delhi database. Mr. Srikanth or Mr. Ravikanth will call you directly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] font-bold">Request technical site survey</h4>
                    
                    <input
                      type="text"
                      required
                      placeholder="Your Name*"
                      value={bookForm.name}
                      onChange={(e) => setBookForm(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-900 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                      }`}
                    />

                    <input
                      type="email"
                      required
                      placeholder="Your Email*"
                      value={bookForm.email}
                      onChange={(e) => setBookForm(prev => ({ ...prev, email: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-900 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                      }`}
                    />

                    <input
                      type="tel"
                      required
                      placeholder="Phone Number*"
                      value={bookForm.phone}
                      onChange={(e) => setBookForm(prev => ({ ...prev, phone: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-900 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                      }`}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        required
                        value={bookForm.date}
                        onChange={(e) => setBookForm(prev => ({ ...prev, date: e.target.value }))}
                        className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                          darkMode ? 'bg-slate-900 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                        }`}
                      />
                      <select
                        value={bookForm.service}
                        onChange={(e) => setBookForm(prev => ({ ...prev, service: e.target.value }))}
                        className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                          darkMode ? 'bg-slate-900 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                        }`}
                      >
                        <option value="Ground Water Investigation">Investigation</option>
                        <option value="Hydrogeological Survey">Hydro Survey</option>
                        <option value="Borewell Site Selection">Borewell Select</option>
                        <option value="Industrial NOC Clearance">CGWA NOC</option>
                      </select>
                    </div>

                    <button
                      id="jarvis-book-submit"
                      type="submit"
                      disabled={bookingStatus === 'loading'}
                      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-[#D4AF37] hover:opacity-90 text-white text-xs font-semibold shadow-md active:scale-95 transition-all mt-2 cursor-pointer"
                    >
                      {bookingStatus === 'loading' ? 'Securing Calendar Slots...' : 'Request priority Consultation'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Tab 4: Local FAQs */}
            {activeTab === 'faq' && (
              <div className="space-y-3" id="jarvis-faq-screen">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2 font-bold">Groundwater Knowledge Base</h4>
                
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  {localFaqs.map((faq, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-lg border ${
                        darkMode ? 'bg-slate-900/60 border-[#D4AF37]/15' : 'bg-slate-50 border-amber-900/10'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#D4AF37] block mb-1">Q: {faq.q}</span>
                      <p className="text-[11px] leading-relaxed opacity-85">A: {faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Assistant Footer Panel */}
          <div className="p-3 bg-slate-950 border-t border-white/5 text-[10px] text-center font-mono opacity-60 flex justify-center items-center gap-1.5 text-white">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" /> 84 – Humayun Pur, Safdarjung Enclave, New Delhi
          </div>

        </div>
      )}
    </>
  );
}
