import React from 'react';
import { Star, MessageSquare, ChevronLeft, ChevronRight, PenTool, CheckCircle } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  darkMode: boolean;
  testimonials: Testimonial[];
  onSubmitSuccess: () => void;
}

export default function Testimonials({ darkMode, testimonials, onSubmitSuccess }: TestimonialsProps) {
  // Only display approved testimonials
  const approvedList = testimonials.filter(t => t.approved);
  const [activeIdx, setActiveIdx] = React.useState(0);
  
  // Submit Form state
  const [showForm, setShowForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    company: '',
    role: '',
    feedback: '',
    rating: 5
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % approvedList.length);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + approvedList.length) % approvedList.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.feedback) return;
    setSubmitting(true);
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', company: '', role: '', feedback: '', rating: 5 });
        onSubmitSuccess();
        setTimeout(() => {
          setShowForm(false);
          setSubmitted(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const currentT = approvedList[activeIdx] || approvedList[0];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 filter blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2 font-semibold">Testimonials</span>
          <h2 className={`text-3xl md:text-5xl font-bold font-display-serif ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
            What Our Clients Say
          </h2>
          <p className={`text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Trusted by national water enterprises, heavy industrial infrastructure planners, and farm cooperatives across Delhi NCR, Haryana, and Punjab.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-rose-400 to-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {approvedList.length > 0 ? (
          /* Slider Container */
          <div className="max-w-4xl mx-auto relative mb-12">
            
            {/* Interactive Review Display */}
            <div 
              className={`p-8 md:p-12 rounded-3xl border relative transition-all duration-300 artistic-card ${
                darkMode ? 'glass-panel border-[#D4AF37]/20 bg-[#0d0c1c]/90' : 'bg-white border-amber-900/10 shadow-xl shadow-[#D4AF37]/5'
              }`}
              id="testimonial-active-card"
            >
              {/* Floating Quote graphic */}
              <span className="absolute top-6 right-8 text-7xl md:text-8xl font-serif text-[#D4AF37]/15 select-none">
                “
              </span>

              {/* Stars Row */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: currentT.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>

              {/* Message text */}
              <p className={`text-base md:text-lg leading-relaxed italic mb-8 font-display-serif ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                "{currentT.feedback}"
              </p>

              {/* Reviewer Details Row */}
              <div className="flex items-center gap-4">
                <img
                  src={currentT.avatar}
                  alt={currentT.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37] shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className={`font-bold font-display-sans text-sm md:text-base ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
                    {currentT.name}
                  </h4>
                  <span className={`text-xs block ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {currentT.role}, <strong className="text-[#D4AF37] font-bold">{currentT.company}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Slide Navigation Triggers */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                id="testimonial-prev-btn"
                onClick={prevSlide}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  darkMode 
                    ? 'bg-[#D4AF37]/5 border-[#D4AF37]/25 hover:bg-[#D4AF37]/15 text-white' 
                    : 'bg-white border-amber-900/15 hover:bg-[#FAF6F0] text-slate-800 shadow-sm'
                }`}
              >
                <ChevronLeft className="w-5 h-5 text-[#D4AF37]" />
              </button>
              <span className="text-xs font-mono font-bold text-[#D4AF37]">
                {activeIdx + 1} / {approvedList.length}
              </span>
              <button
                id="testimonial-next-btn"
                onClick={nextSlide}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  darkMode 
                    ? 'bg-[#D4AF37]/5 border-[#D4AF37]/25 hover:bg-[#D4AF37]/15 text-white' 
                    : 'bg-white border-amber-900/15 hover:bg-[#FAF6F0] text-slate-800 shadow-sm'
                }`}
              >
                <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
              </button>
            </div>

          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 font-mono text-sm">
            No testimonials loaded.
          </div>
        )}

        {/* Call-to-Action for User Feedback */}
        <div className="text-center">
          <button
            id="write-testimonial-trigger"
            onClick={() => setShowForm(!showForm)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-xs md:text-sm font-mono font-bold transition-all cursor-pointer ${
              darkMode
                ? 'bg-[#D4AF37]/5 border-[#D4AF37]/20 hover:bg-[#D4AF37]/15 text-[#D4AF37]'
                : 'bg-[#FAF6F0] border-amber-900/15 hover:bg-white text-[#9A7B1C] shadow-sm'
            }`}
          >
            <PenTool className="w-4 h-4" />
            {showForm ? 'Cancel Submission' : 'Leave Us Feedback'}
          </button>
        </div>

        {/* User Submission Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mt-12 animate-slide-down">
            <div className={`p-6 md:p-8 rounded-2xl border artistic-card ${
              darkMode ? 'bg-[#0d0c1c]/90 border-[#D4AF37]/20' : 'bg-white border-amber-900/15 shadow-xl'
            }`}
            id="testimonial-submit-form"
            >
              {submitted ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-lg font-bold font-display-serif">Feedback Submitted Successfully!</h4>
                  <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Thank you! Srikanth or Ravikanth ji will approve and post your review to the timeline shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="font-bold text-base md:text-lg mb-4 font-display-serif">Submit Your Project Review</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Your Name*</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Srikanth Verma"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                          darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Company/Farm Name</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g., Neer Farms"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                          darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Designation/Role</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="e.g., Managing Director"
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                          darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Rating (1 to 5 Stars)</label>
                      <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                          darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                        }`}
                      >
                        <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                        <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                        <option value="3">⭐⭐⭐ 3 Stars</option>
                        <option value="2">⭐⭐ 2 Stars</option>
                        <option value="1">⭐ 1 Star</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-wider mb-1.5 font-bold">Project Experience / Feedback*</label>
                    <textarea
                      name="feedback"
                      required
                      rows={4}
                      value={formData.feedback}
                      onChange={handleInputChange}
                      placeholder="Describe the electrical resistivity accuracy, hydrogeological reports, casing selections, or water yield improvements..."
                      className={`w-full px-4 py-2.5 rounded-lg text-sm border focus:outline-none focus:border-[#D4AF37] ${
                        darkMode ? 'bg-slate-950 border-[#D4AF37]/15 text-white' : 'bg-slate-50 border-amber-900/10 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      id="submit-testimonial-btn"
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-[#D4AF37] text-white font-semibold text-xs md:text-sm hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      {submitting ? 'Submitting...' : 'Post for Review'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
