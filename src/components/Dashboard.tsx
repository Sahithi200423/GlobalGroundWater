import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  Mail, 
  MessageSquare, 
  Settings, 
  Layers, 
  LogOut, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  Download, 
  ShieldCheck,
  Eye,
  TrendingUp,
  FileText
} from 'lucide-react';
import { Appointment, ContactInquiry, Testimonial, GalleryItem, ServiceItem } from '../types';

interface DashboardProps {
  darkMode: boolean;
  appointments: Appointment[];
  contacts: ContactInquiry[];
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  services: ServiceItem[];
  onRefresh: () => void;
}

export default function Dashboard({ 
  darkMode, 
  appointments, 
  contacts, 
  testimonials, 
  gallery, 
  services,
  onRefresh
}: DashboardProps) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loginEmail, setLoginEmail] = React.useState('admin@hydrovision.ai');
  const [loginPass, setLoginPass] = React.useState('admin');
  const [loginError, setLoginError] = React.useState('');
  const [loginLoading, setLoginLoading] = React.useState(false);

  // Nav inside dashboard
  const [activeSection, setActiveSection] = React.useState<'overview' | 'bookings' | 'contacts' | 'testimonials' | 'services' | 'gallery'>('overview');

  // Interactive Admin state
  const [replyTarget, setReplyTarget] = React.useState<ContactInquiry | null>(null);
  const [replyText, setReplyText] = React.useState('');
  const [sendingReply, setSendingReply] = React.useState(false);

  // New Service addition state
  const [showAddService, setShowAddService] = React.useState(false);
  const [newService, setNewService] = React.useState({
    title: '',
    description: '',
    iconName: 'Droplet',
    details: '',
    benefits: ''
  });

  // New Gallery addition state
  const [showAddGallery, setShowAddGallery] = React.useState(false);
  const [newGallery, setNewGallery] = React.useState({
    title: '',
    category: 'Investigation' as GalleryItem['category'],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    description: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass })
      });
      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        const data = await response.json();
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Connection failure.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Update Appointment Status
  const handleUpdateAptStatus = async (id: string, status: Appointment['status']) => {
    try {
      const response = await fetch(`/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Appointment
  const handleDeleteApt = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this booking?')) return;
    try {
      const response = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (response.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Reply to Contact Inquiry
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyTarget || !replyText.trim()) return;
    setSendingReply(true);

    try {
      const response = await fetch(`/api/contacts/${replyTarget.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyText })
      });
      if (response.ok) {
        setReplyTarget(null);
        setReplyText('');
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingReply(false);
    }
  };

  // Delete Contact Inquiry
  const handleDeleteContact = async (id: string) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      const response = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      if (response.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Approve Testimonial
  const handleApproveTestimonial = async (id: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/testimonials/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved })
      });
      if (response.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Testimonial
  const handleDeleteTestimonial = async (id: string) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      const response = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (response.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Bespoke Service
  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title || !newService.description) return;
    
    const payload = {
      ...newService,
      id: 'gw-custom-' + Math.random().toString(36).substr(2, 5),
      details: newService.details.split('\n').filter(Boolean),
      benefits: newService.benefits.split('\n').filter(Boolean)
    };

    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setShowAddService(false);
        setNewService({ title: '', description: '', iconName: 'Droplet', details: '', benefits: '' });
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Service
  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Remove this service?')) return;
    try {
      const response = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (response.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Gallery item
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.description) return;

    const payload = {
      ...newGallery,
      id: 'proj-' + Math.random().toString(36).substr(2, 5)
    };

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setShowAddGallery(false);
        setNewGallery({
          title: '',
          category: 'Investigation',
          imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
          description: ''
        });
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Gallery Item
  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (response.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Simulate exporting PDF data report
  const handleExportData = () => {
    const reportText = `
============================================================
HYDROVISION AI OPERATIONS AUDIT REPORT
Generated: ${new Date().toLocaleString()}
------------------------------------------------------------
Total Consultations booked: ${appointments.length}
Total Customer inquiries logged: ${contacts.length}
Total Bespoke geological solutions listed: ${services.length}
============================================================

BOOKING LIST SUMMARY:
${appointments.map((a, i) => `${i+1}. [${a.status}] ${a.name} (${a.email}) - ${a.service} on ${a.date}`).join('\n')}

INQUIRIES SUMMARY:
${contacts.map((c, i) => `${i+1}. [${c.status}] ${c.name}: ${c.subject}`).join('\n')}
============================================================
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `HydroVision_Audit_Report_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  // === RENDER SCREEN 1: Secure Admin Login Prompt ===
  if (!isLoggedIn) {
    return (
      <section className="min-h-screen pt-32 pb-16 flex items-center justify-center px-6">
        <div 
          className={`w-full max-w-md p-8 rounded-3xl border transition-all duration-300 artistic-card ${
            darkMode ? 'glass-panel border-[#D4AF37]/20 bg-[#0d0c1c]/90' : 'bg-white border-amber-900/15 shadow-2xl'
          }`}
          id="admin-login-card"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h2 className={`text-2xl font-bold font-display-serif ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
              Consultant Access Portal
            </h2>
            <p className="text-xs opacity-75 mt-1 font-mono text-[#D4AF37]">
              Safdarjung Enclave CRM Secure Verification
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs rounded-lg text-center font-bold">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="e.g., admin@hydrovision.ai"
                className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                  darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Security Password</label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                  darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                }`}
              />
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-[#D4AF37] text-white font-semibold text-sm active:scale-95 transition-all shadow-md cursor-pointer"
            >
              {loginLoading ? 'Decrypting keys...' : 'Authorize credentials'}
            </button>
          </form>

          <div className="mt-6 text-center text-[11px] opacity-50 font-mono">
            Default credentials preset: admin@hydrovision.ai / admin
          </div>
        </div>
      </section>
    );
  }

  // === RENDER SCREEN 2: Fully Managed Admin Control Dashboard ===
  return (
    <section className="min-h-screen pt-32 pb-16 px-6 relative z-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Menu (3cols) */}
        <div className={`lg:col-span-3 rounded-2xl border p-4 space-y-2 artistic-card ${
          darkMode ? 'bg-[#0d0c1c] border-[#D4AF37]/15' : 'bg-white border-amber-900/10 shadow-lg shadow-[#D4AF37]/5'
        }`}>
          <div className="p-3 border-b border-white/5 flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h3 className={`text-sm font-bold truncate font-display-sans ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>Srikanth & Ravikanth</h3>
              <span className="text-[9px] font-mono text-[#D4AF37] block font-bold">AUTHORIZED ADMINS</span>
            </div>
          </div>

          <button
            id="dash-nav-overview"
            onClick={() => setActiveSection('overview')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'overview' ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md' : 'opacity-75 hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Operations Overview
          </button>

          <button
            id="dash-nav-bookings"
            onClick={() => setActiveSection('bookings')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'bookings' ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md' : 'opacity-75 hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" /> Bookings ({appointments.length})
          </button>

          <button
            id="dash-nav-contacts"
            onClick={() => setActiveSection('contacts')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'contacts' ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md' : 'opacity-75 hover:bg-white/5'
            }`}
          >
            <Mail className="w-4 h-4" /> Inquiries ({contacts.length})
          </button>

          <button
            id="dash-nav-testimonials"
            onClick={() => setActiveSection('testimonials')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'testimonials' ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md' : 'opacity-75 hover:bg-white/5'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Reviews ({testimonials.length})
          </button>

          <button
            id="dash-nav-services"
            onClick={() => setActiveSection('services')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'services' ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md' : 'opacity-75 hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" /> Services Editor
          </button>

          <button
            id="dash-nav-gallery"
            onClick={() => setActiveSection('gallery')}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'gallery' ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md' : 'opacity-75 hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" /> Projects Gallery
          </button>

          <div className="pt-6 border-t border-white/5 mt-6">
            <button
              id="admin-logout-btn"
              onClick={() => setIsLoggedIn(false)}
              className="w-full px-4 py-2.5 rounded-xl text-xs font-mono text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign Out Portal
            </button>
          </div>
        </div>

        {/* Right Detail Console (9cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Section: OVERVIEW Dashboard statistics */}
          {activeSection === 'overview' && (
            <div className="space-y-6" id="overview-content">
              
              {/* Header Title block */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-xl md:text-2xl font-bold font-display-serif ${darkMode ? 'text-white' : 'text-slate-800'}`}>Operations Metrics Overview</h2>
                  <p className="text-xs opacity-75">Visualizing hydrogeological consulting workloads and legal pipeline clearances.</p>
                </div>
                
                {/* Export CTA */}
                <button
                  id="export-metrics-btn"
                  onClick={handleExportData}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-[#D4AF37] text-white text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Export Logs (.TXT)
                </button>
              </div>

              {/* Statistics Small Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`p-4 rounded-xl border artistic-card ${darkMode ? 'bg-[#0d0c1c] border-[#D4AF37]/15' : 'bg-white border-amber-900/10'}`}>
                  <span className="text-2xl md:text-3xl font-black font-mono text-[#D4AF37] block">{appointments.length}</span>
                  <span className="text-[10px] font-mono opacity-60 uppercase block font-bold">Reservations</span>
                </div>
                <div className={`p-4 rounded-xl border artistic-card ${darkMode ? 'bg-[#0d0c1c] border-[#D4AF37]/15' : 'bg-white border-amber-900/10'}`}>
                  <span className="text-2xl md:text-3xl font-black font-mono text-[#D4AF37] block">
                    {appointments.filter(a => a.status === 'Confirmed').length}
                  </span>
                  <span className="text-[10px] font-mono opacity-60 uppercase block font-bold">Active Slots</span>
                </div>
                <div className={`p-4 rounded-xl border artistic-card ${darkMode ? 'bg-[#0d0c1c] border-[#D4AF37]/15' : 'bg-white border-amber-900/10'}`}>
                  <span className="text-2xl md:text-3xl font-black font-mono text-[#D4AF37] block">
                    {contacts.filter(c => c.status === 'Unread').length}
                  </span>
                  <span className="text-[10px] font-mono opacity-60 uppercase block font-bold">Unread Mails</span>
                </div>
                <div className={`p-4 rounded-xl border artistic-card ${darkMode ? 'bg-[#0d0c1c] border-[#D4AF37]/15' : 'bg-white border-amber-900/10'}`}>
                  <span className="text-2xl md:text-3xl font-black font-mono text-[#D4AF37] block">
                    {testimonials.filter(t => !t.approved).length}
                  </span>
                  <span className="text-[10px] font-mono opacity-60 uppercase block font-bold">Pending Reviews</span>
                </div>
              </div>

              {/* Custom SVG Graphical Chart detailing consulting trends */}
              <div className={`p-6 rounded-2xl border artistic-card ${
                darkMode ? 'bg-[#0d0c1c]/90 border-[#D4AF37]/15' : 'bg-white border-amber-900/10 shadow-md'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] flex items-center gap-1 font-bold">
                    <TrendingUp className="w-4 h-4" /> Stratigraphy Demands Analytics (Delhi NCR)
                  </h4>
                  <span className="text-[10px] font-mono opacity-60">Piezometer draw trends</span>
                </div>

                {/* SVG Visual Chart */}
                <div className="h-44 w-full flex items-end gap-3 justify-between">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-indigo-900/80 rounded-t" style={{ height: '35px' }} />
                    <span className="text-[9px] font-mono mt-1">Noida</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-indigo-600/80 rounded-t" style={{ height: '85px' }} />
                    <span className="text-[9px] font-mono mt-1">Punjab Farms</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-rose-500/80 rounded-t" style={{ height: '110px' }} />
                    <span className="text-[9px] font-mono mt-1">Gurgaon Ind</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-[#D4AF37]/80 rounded-t" style={{ height: '60px' }} />
                    <span className="text-[9px] font-mono mt-1">Safdarjung Hub</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-amber-600/85 rounded-t" style={{ height: '95px' }} />
                    <span className="text-[9px] font-mono mt-1">Rajasthan Bas</span>
                  </div>
                </div>
              </div>

              {/* Quick action shortcuts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setActiveSection('bookings')}
                  className={`p-4 rounded-xl border text-left transition-all hover:translate-x-1 flex justify-between items-center artistic-card cursor-pointer ${
                    darkMode ? 'bg-[#0d0c1c]/90 border-[#D4AF37]/15 hover:bg-white/10' : 'bg-slate-100 border-amber-900/10 hover:bg-slate-200 text-[#2C2520]'
                  }`}
                >
                  <div>
                    <span className="block font-bold text-xs md:text-sm">Manage Active Bookings</span>
                    <span className="text-[10px] opacity-75">Update status or rescheduling logs.</span>
                  </div>
                  <Eye className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <button 
                  onClick={() => setActiveSection('contacts')}
                  className={`p-4 rounded-xl border text-left transition-all hover:translate-x-1 flex justify-between items-center artistic-card cursor-pointer ${
                    darkMode ? 'bg-[#0d0c1c]/90 border-[#D4AF37]/15 hover:bg-white/10' : 'bg-slate-100 border-amber-900/10 hover:bg-slate-200 text-[#2C2520]'
                  }`}
                >
                  <div>
                    <span className="block font-bold text-xs md:text-sm">Inquiry Mail Room</span>
                    <span className="text-[10px] opacity-75">Draft professional SMTP email responses.</span>
                  </div>
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>

            </div>
          )}

          {/* Section: BOOKINGS appointment scheduler table */}
          {activeSection === 'bookings' && (
            <div className="space-y-4" id="bookings-content">
              <h3 className="text-lg font-bold">Client Consultation Appointments</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead>
                    <tr className={`border-b ${darkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                      <th className="p-3">Client details</th>
                      <th className="p-3">Schedule Slot</th>
                      <th className="p-3">Service Focus</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Administrative Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr 
                        key={apt.id} 
                        className={`border-b transition-colors ${
                          darkMode ? 'border-white/5 hover:bg-white/5' : 'border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-3">
                          <strong className="block text-sm">{apt.name}</strong>
                          <span className="text-[10px] block opacity-75 font-mono">{apt.email} | {apt.phone}</span>
                          {apt.notes && (
                            <span className="block italic text-[10px] opacity-85 mt-1 bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded max-w-xs truncate font-bold">
                              "{apt.notes}"
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          <strong className="block">{apt.date}</strong>
                          <span className="text-[10px] block opacity-75 font-mono">{apt.time}</span>
                        </td>
                        <td className="p-3">{apt.service}</td>
                        <td className="p-3">
                          <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                            apt.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-500' :
                            apt.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-500' :
                            apt.status === 'Completed' ? 'bg-blue-500/20 text-blue-500' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1 whitespace-nowrap">
                          {apt.status !== 'Confirmed' && apt.status !== 'Completed' && (
                            <button
                              id={`confirm-apt-${apt.id}`}
                              onClick={() => handleUpdateAptStatus(apt.id, 'Confirmed')}
                              className="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white transition-colors"
                              title="Confirm Appointment"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {apt.status === 'Confirmed' && (
                            <button
                              id={`complete-apt-${apt.id}`}
                              onClick={() => handleUpdateAptStatus(apt.id, 'Completed')}
                              className="p-1 rounded bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white transition-colors"
                              title="Mark Completed"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {apt.status !== 'Cancelled' && (
                            <button
                              id={`cancel-apt-${apt.id}`}
                              onClick={() => handleUpdateAptStatus(apt.id, 'Cancelled')}
                              className="p-1 rounded bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-colors"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            id={`delete-apt-${apt.id}`}
                            onClick={() => handleDeleteApt(apt.id)}
                            className="p-1 rounded bg-slate-500/10 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {appointments.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-6 opacity-60 font-mono">No appointments scheduled.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section: CONTACTS Inquiries & compose replies */}
          {activeSection === 'contacts' && (
            <div className="space-y-4" id="contacts-content">
              <h3 className="text-lg font-bold">Inbound Inquiries & Mailbox</h3>

              {replyTarget && (
                <div className={`p-4 rounded-xl border mb-4 space-y-3 artistic-card ${
                  darkMode ? 'bg-slate-950 border-[#D4AF37]/30' : 'bg-slate-50 border-amber-900/15 shadow-inner'
                }`}>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-[#D4AF37] font-bold">Compose SMTP reply to: {replyTarget.email}</span>
                    <button onClick={() => setReplyTarget(null)} className="opacity-75 hover:opacity-100 cursor-pointer">
                      <X className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                  </div>
                  <div className="text-xs opacity-80 italic p-3 rounded bg-white/5 border border-white/5">
                    <strong>Original Subject: {replyTarget.subject}</strong> <br />
                    "{replyTarget.message}"
                  </div>
                  <form onSubmit={handleSendReply} className="space-y-3">
                    <textarea
                      required
                      rows={4}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Draft professional geoelectrical consultation response..."
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-900 border-[#D4AF37]/15 text-white' : 'bg-white border-amber-900/10 text-slate-900'
                      }`}
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        type="button" 
                        onClick={() => setReplyTarget(null)} 
                        className="px-4 py-2 rounded-lg text-xs font-mono hover:bg-slate-500/10 cursor-pointer"
                      >
                        Discard draft
                      </button>
                      <button
                        id="submit-reply-btn"
                        type="submit"
                        disabled={sendingReply}
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-[#D4AF37] text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        {sendingReply ? 'Transmitting reply...' : 'Transmit Mail Reply'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-4">
                {contacts.map((cnt) => (
                  <div 
                    key={cnt.id} 
                    className={`p-5 rounded-2xl border ${
                      darkMode ? 'bg-slate-900/40 border-white/5 hover:border-white/10' : 'bg-white border-slate-200/80 shadow'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-sm md:text-base">{cnt.name}</h4>
                        <span className="text-xs opacity-75 font-mono">{cnt.email} | {cnt.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          cnt.status === 'Replied' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {cnt.status}
                        </span>
                        <button
                          id={`delete-cnt-${cnt.id}`}
                          onClick={() => handleDeleteContact(cnt.id)}
                          className="text-rose-500 p-1.5 rounded hover:bg-rose-500/10"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <strong className="block text-xs text-[#D4AF37] font-bold">Subject: {cnt.subject}</strong>
                      <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        "{cnt.message}"
                      </p>
                      {cnt.reply && (
                        <div className={`p-3 rounded-lg text-xs font-mono border mt-3 ${
                          darkMode ? 'bg-slate-950 border-white/5' : 'bg-emerald-50/50 border-emerald-100'
                        }`}>
                          <strong className="block text-[#D4AF37]">Outgoing SMTP Transmitted Response:</strong>
                          "{cnt.reply}"
                        </div>
                      )}
                    </div>

                    {cnt.status !== 'Replied' && !replyTarget && (
                      <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                        <button
                          id={`reply-cnt-${cnt.id}`}
                          onClick={() => { setReplyTarget(cnt); setReplyText(`Dear ${cnt.name},\n\nThank you for reaching out to Mr. Srikanth & Mr. Ravikanth regarding your query ("${cnt.subject}").\n\nBased on your local terrain parameters, we recommend executing a 2D resistivity profile study. Our senior engineers can schedule a site investigation next week.\n\nBest regards,\nSrikanth & Ravikanth\nHydroVision AI, Safdarjung Enclave, New Delhi`); }}
                          className="px-4 py-2 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37] hover:text-slate-950 text-[#D4AF37] text-xs font-semibold shadow-sm cursor-pointer transition-all"
                        >
                          Draft SMTP response
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {contacts.length === 0 && (
                  <div className="text-center py-8 opacity-60 font-mono">No client inquiries found.</div>
                )}
              </div>

            </div>
          )}

          {/* Section: TESTIMONIALS verification slider list */}
          {activeSection === 'testimonials' && (
            <div className="space-y-4" id="testimonials-content">
              <h3 className="text-lg font-bold">Approve Testimonials & Reviews</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div 
                    key={t.id} 
                    className={`p-4 rounded-xl border flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900/60 border-white/15' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <h4 className="font-bold text-xs md:text-sm">{t.name}</h4>
                            <span className="text-[10px] opacity-75">{t.role}, {t.company}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                          t.approved ? 'bg-emerald-500/20 text-emerald-500' : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {t.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs italic leading-relaxed opacity-85 mt-2">"{t.feedback}"</p>
                    </div>

                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-white/5">
                      {!t.approved ? (
                        <button
                          id={`approve-t-${t.id}`}
                          onClick={() => handleApproveTestimonial(t.id, true)}
                          className="px-3 py-1.5 rounded bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white text-[10px] font-mono cursor-pointer"
                        >
                          Approve Review
                        </button>
                      ) : (
                        <button
                          id={`disapprove-t-${t.id}`}
                          onClick={() => handleApproveTestimonial(t.id, false)}
                          className="px-3 py-1.5 rounded bg-yellow-500/10 hover:bg-yellow-500 text-yellow-500 hover:text-white text-[10px] font-mono cursor-pointer"
                        >
                          Suspend Review
                        </button>
                      )}
                      <button
                        id={`delete-t-${t.id}`}
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="p-1.5 rounded bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white"
                        title="Deletepermanently"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: SERVICES bespoke listing editor */}
          {activeSection === 'services' && (
            <div className="space-y-4" id="services-content">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-display-serif">Solutions Catalog Editor</h3>
                <button
                  id="add-service-trigger"
                  onClick={() => setShowAddService(!showAddService)}
                  className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-xs cursor-pointer shadow"
                >
                  <Plus className="w-3.5 h-3.5" /> {showAddService ? 'Collapse' : 'Add Solution'}
                </button>
              </div>

              {showAddService && (
                <form onSubmit={handleAddService} className={`p-5 rounded-2xl border space-y-4 artistic-card ${
                  darkMode ? 'bg-slate-900 border-[#D4AF37]/15' : 'bg-slate-50 border-amber-900/10'
                }`}>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-[#D4AF37]">Bespeak Solution Details</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Solution Title (e.g., Deep Bedrock scanning)"
                      value={newService.title}
                      onChange={(e) => setNewService(p => ({ ...p, title: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                    <select
                      value={newService.iconName}
                      onChange={(e) => setNewService(p => ({ ...p, iconName: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    >
                      <option value="Droplet">Droplet Icon</option>
                      <option value="Map">Map Icon</option>
                      <option value="Wrench">Wrench Icon</option>
                      <option value="Compass">Compass Icon</option>
                      <option value="Leaf">Agricultural Leaf</option>
                      <option value="ShieldAlert">Industrial Badge</option>
                    </select>
                  </div>

                  <textarea
                    required
                    placeholder="Short Description of the Solution..."
                    value={newService.description}
                    onChange={(e) => setNewService(p => ({ ...p, description: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                      darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <textarea
                      placeholder="Technical Scope steps (one per line)..."
                      rows={3}
                      value={newService.details}
                      onChange={(e) => setNewService(p => ({ ...p, details: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                    <textarea
                      placeholder="Client Benefits (one per line)..."
                      rows={3}
                      value={newService.benefits}
                      onChange={(e) => setNewService(p => ({ ...p, benefits: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddService(false)} className="text-xs px-4 py-2">Cancel</button>
                    <button id="save-service-btn" type="submit" className="px-6 py-2 rounded bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer">
                      Save Bespoke Solution
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div 
                    key={s.id} 
                    className={`p-4 rounded-xl border flex items-start justify-between ${
                      darkMode ? 'bg-slate-900/40 border-white/5' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <strong className="block text-sm">{s.title}</strong>
                      <span className="text-xs block opacity-75 line-clamp-2 mt-1">{s.description}</span>
                    </div>
                    <button
                      id={`delete-s-${s.id}`}
                      onClick={() => handleDeleteService(s.id)}
                      className="p-1.5 rounded hover:bg-rose-500/10 text-rose-500 shrink-0"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: GALLERY manager */}
          {activeSection === 'gallery' && (
            <div className="space-y-4" id="gallery-content">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-display-serif">Projects Portfolio Manager</h3>
                <button
                  id="add-gallery-trigger"
                  onClick={() => setShowAddGallery(!showAddGallery)}
                  className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-xs cursor-pointer shadow"
                >
                  <Plus className="w-3.5 h-3.5" /> {showAddGallery ? 'Collapse' : 'Add Project'}
                </button>
              </div>

              {showAddGallery && (
                <form onSubmit={handleAddGallery} className={`p-5 rounded-2xl border space-y-4 artistic-card ${
                  darkMode ? 'bg-slate-900 border-[#D4AF37]/15' : 'bg-slate-50 border-amber-900/10'
                }`}>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-[#D4AF37]">Project parameters</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Project Title"
                      value={newGallery.title}
                      onChange={(e) => setNewGallery(p => ({ ...p, title: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                    <select
                      value={newGallery.category}
                      onChange={(e) => setNewGallery(p => ({ ...p, category: e.target.value as GalleryItem['category'] }))}
                      className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    >
                      <option value="Investigation">Ground Water Investigation</option>
                      <option value="Survey">Hydrogeological Survey</option>
                      <option value="Borewell">Borewell site Selection</option>
                      <option value="Industrial">Industrial CGWA NOC</option>
                      <option value="Agricultural">Agricultural irrigation</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Photo Unsplash URL"
                    value={newGallery.imageUrl}
                    onChange={(e) => setNewGallery(p => ({ ...p, imageUrl: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                      darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />

                  <textarea
                    required
                    placeholder="Case Study geological parameters description..."
                    rows={3}
                    value={newGallery.description}
                    onChange={(e) => setNewGallery(p => ({ ...p, description: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg text-xs border focus:outline-none focus:border-[#D4AF37] ${
                      darkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />

                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddGallery(false)} className="text-xs px-4 py-2">Cancel</button>
                    <button id="save-gallery-btn" type="submit" className="px-6 py-2 rounded bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer">
                      Save Case Study
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {gallery.map((g) => (
                  <div 
                    key={g.id} 
                    className={`rounded-xl overflow-hidden border p-2 flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900/30 border-white/5' : 'bg-white border-slate-200'
                    }`}
                  >
                    <img src={g.imageUrl} alt={g.title} className="w-full h-24 object-cover rounded mb-2" />
                    <div>
                      <strong className="block text-xs truncate">{g.title}</strong>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] block mt-1 font-bold">{g.category}</span>
                    </div>
                    <div className="flex justify-end mt-2 pt-2 border-t border-white/5">
                      <button
                        id={`delete-g-${g.id}`}
                        onClick={() => handleDeleteGallery(g.id)}
                        className="p-1 text-rose-500 hover:bg-rose-500/10 rounded"
                        title="Remove from portfolio"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
