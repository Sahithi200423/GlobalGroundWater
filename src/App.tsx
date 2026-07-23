import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import HydroJarvis from './components/HydroJarvis';
import Dashboard from './components/Dashboard';

import { 
  Appointment, 
  ContactInquiry, 
  Testimonial, 
  GalleryItem, 
  ServiceItem 
} from './types';

import { 
  Calendar, 
  X, 
  Check, 
  HelpCircle, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function App() {
  const [currentView, setView] = React.useState<'landing' | 'admin'>('landing');
  const [darkMode, setDarkMode] = React.useState<boolean>(true);

  // Consolidated Database state from server
  const [services, setServices] = React.useState<ServiceItem[]>([]);
  const [gallery, setGallery] = React.useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [contacts, setContacts] = React.useState<ContactInquiry[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Overlay Booking dialog
  const [showBookModal, setShowBookModal] = React.useState(false);
  const [bookServicePreset, setBookServicePreset] = React.useState('');
  const [bookingForm, setBookingForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '11:00 AM',
    service: 'Ground Water Investigation',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = React.useState(false);
  const [bookingLoading, setBookingLoading] = React.useState(false);

  // Fetch all states from Express REST endpoints
  const fetchAllData = async () => {
    try {
      const [resServices, resGallery, resTestimonials, resAppointments, resContacts] = await Promise.all([
        fetch('/api/services').then(r => r.json()),
        fetch('/api/gallery').then(r => r.json()),
        fetch('/api/testimonials').then(r => r.json()),
        fetch('/api/appointments').then(r => r.json()),
        fetch('/api/contacts').then(r => r.json())
      ]);

      setServices(resServices);
      setGallery(resGallery);
      setTestimonials(resTestimonials);
      setAppointments(resAppointments);
      setContacts(resContacts);
    } catch (err) {
      console.error('Failed to sync state from local Full Stack API:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAllData();
  }, []);

  // Update HTML body theme classes
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#0A0915';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#FAF8F5';
    }
  }, [darkMode]);

  const handleOpenBookingModal = (servicePreset?: string) => {
    if (servicePreset) {
      setBookServicePreset(servicePreset);
      setBookingForm(prev => ({ ...prev, service: servicePreset }));
    } else {
      setBookServicePreset('');
    }
    setShowBookModal(true);
  };

  const handleModalBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.date || !bookingForm.phone) return;
    setBookingLoading(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingForm)
      });
      if (response.ok) {
        setBookingSuccess(true);
        fetchAllData();
        setTimeout(() => {
          setShowBookModal(false);
          setBookingSuccess(false);
          setBookingForm({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '11:00 AM',
            service: 'Ground Water Investigation',
            notes: ''
          });
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-500 ${
      darkMode ? 'bg-[#0A0915] text-[#ECE9E6]' : 'bg-[#FAF8F5] text-[#2C2520]'
    }`}>
      
      {/* Global Luxury Glass Navigation Bar */}
      <Navbar 
        currentView={currentView}
        setView={setView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onBookClick={() => handleOpenBookingModal()}
      />

      {loading ? (
        <div className="min-h-screen flex flex-col justify-center items-center text-center font-mono text-sm opacity-70">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin mb-3"></div>
          Syncing geological datasets...
        </div>
      ) : (
        /* Render Active view router */
        currentView === 'landing' ? (
          <main className="relative">
            {/* Landing Hero */}
            <Hero 
              darkMode={darkMode} 
              onBookClick={() => handleOpenBookingModal()}
              onExploreClick={() => {
                const s = document.getElementById('services');
                if (s) s.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Services Showcase */}
            <Services 
              darkMode={darkMode}
              services={services}
              onBookClick={(preset) => handleOpenBookingModal(preset)}
            />

            {/* Interactive Timeline About Srikanth & Ravikanth */}
            <About darkMode={darkMode} />

            {/* Experience Timeline */}
            <Timeline darkMode={darkMode} />

            {/* Portfolio Project Gallery */}
            <Gallery darkMode={darkMode} items={gallery} />

            {/* Geophysical Rigor & Scientific edge comparisons */}
            <WhyChooseUs darkMode={darkMode} />

            {/* Testimonials Auto Slider with review form submission */}
            <Testimonials 
              darkMode={darkMode} 
              testimonials={testimonials}
              onSubmitSuccess={fetchAllData}
            />

            {/* Interactive Contact & Location forms */}
            <Contact 
              darkMode={darkMode}
              onSubmitSuccess={fetchAllData}
            />

            {/* Corporate Footer */}
            <footer className={`py-12 border-t text-xs text-center font-mono ${
              darkMode ? 'bg-slate-950/80 border-white/5 opacity-70' : 'bg-slate-100 border-slate-200'
            }`}>
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-left md:text-left space-y-1">
                  <span className="font-bold tracking-widest text-[#D4AF37] uppercase font-display-sans text-sm">HYDROVISION AI</span>
                  <p className="opacity-75">Ground Water Consultants & Hydrogeological Engineers</p>
                  <p className="opacity-60 text-[10px]">Office: 84 – III Floor, Humayun Pur, Safdarjung Enclave, New Delhi – 110029</p>
                </div>
                
                <div className="text-center space-y-1">
                  <p>© 2026 HydroVision AI. All rights secured.</p>
                  <p className="opacity-60 text-[10px]">Direct guidance under Mr. Srikanth & Mr. Ravikanth (30+ Years)</p>
                </div>

                <div className="text-right md:text-right text-[10px] space-y-1">
                  <p>Designed for premium compliance & maximum borehole success rates.</p>
                  <p className="text-[#D4AF37] hover:underline cursor-pointer font-bold" onClick={() => setView('admin')}>
                    Manage CRM Portal Admin Account
                  </p>
                </div>
              </div>
            </footer>

            {/* HydroJarvis Chat Assist Launcher */}
            <HydroJarvis 
              darkMode={darkMode}
              onAppointmentBooked={fetchAllData}
            />
          </main>
        ) : (
          /* Secure Administrative Dashboard Console */
          <Dashboard 
            darkMode={darkMode}
            appointments={appointments}
            contacts={contacts}
            testimonials={testimonials}
            gallery={gallery}
            services={services}
            onRefresh={fetchAllData}
          />
        )
      )}

      {/* Global Booking Modal Form Overlay */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
          <div 
            className={`w-full max-w-md rounded-2xl border p-6 relative transition-all duration-300 shadow-2xl artistic-card ${
              darkMode ? 'bg-[#0a0f24] border-[#D4AF37]/25 text-white' : 'bg-[#FAF8F5] border-amber-900/15 text-slate-900'
            }`}
            id="global-booking-modal"
          >
            {/* Close Button */}
            <button
              id="close-booking-modal"
              onClick={() => setShowBookModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 animate-fade-in">
                <Check className="w-12 h-12 text-emerald-500 mx-auto mb-3 border-2 border-emerald-500 rounded-full p-2 animate-bounce" />
                <h4 className="text-lg font-bold font-display-serif text-[#D4AF37]">Consultation Slot Requested!</h4>
                <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Your priority slot on <strong>{bookingForm.date}</strong> at <strong>{bookingForm.time}</strong> is securely saved. Srikanth or Ravikanth ji will call you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleModalBookingSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-bold font-display-serif text-slate-900 dark:text-white">Book Hydrogeological Consultation</h3>
                </div>

                {bookServicePreset && (
                  <div className="p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-lg text-xs font-mono text-[#D4AF37] font-bold">
                    Selected Solution focus: <strong>{bookServicePreset}</strong>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-1 font-bold">Your Name*</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Srikanth Verma"
                    className={`w-full px-4 py-2 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                      darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-1 font-bold">Email Address*</label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g., srikanth@gmail.com"
                    className={`w-full px-4 py-2 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                      darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-1 font-bold">Contact Phone*</label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g., +91 98765 43210"
                    className={`w-full px-4 py-2 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                      darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-1 font-bold">Date Selection*</label>
                    <input
                      type="date"
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, date: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-1 font-bold">Select Solution Focus</label>
                    <select
                      value={bookingForm.service}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, service: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                      }`}
                    >
                      <option value="Ground Water Investigation">Ground Water Investigation</option>
                      <option value="Hydrogeological Survey">Hydrogeological Survey</option>
                      <option value="Borewell site selection">Borewell site selection</option>
                      <option value="CGWA NOC Approvals">CGWA NOC Approvals</option>
                      <option value="Water resource planning">Water resource planning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider mb-1 font-bold">Geological/Site Notes</label>
                  <input
                    type="text"
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="e.g., near Gurgaon hard rock fractures..."
                    className={`w-full px-4 py-2 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                      darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                    }`}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="px-4 py-2 rounded-full text-xs font-mono cursor-pointer hover:bg-white/5 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    id="submit-booking-modal-btn"
                    type="submit"
                    disabled={bookingLoading}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-[#D4AF37] text-white text-xs font-semibold shadow-md cursor-pointer hover:opacity-90 transition-all"
                  >
                    {bookingLoading ? 'Securing slots...' : 'Book consult'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
