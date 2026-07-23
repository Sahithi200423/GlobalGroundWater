import React from 'react';
import { 
  Droplet, 
  Map, 
  Activity, 
  Compass, 
  LayoutGrid, 
  Wrench, 
  Building2, 
  Leaf, 
  Check, 
  ArrowRight,
  X
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  darkMode: boolean;
  services: ServiceItem[];
  onBookClick: (serviceTitle?: string) => void;
}

const iconMap: { [key: string]: React.ReactNode } = {
  Droplet: <Droplet className="w-6 h-6 text-[#D4AF37]" />,
  Map: <Map className="w-6 h-6 text-[#D4AF37]" />,
  Wrench: <Wrench className="w-6 h-6 text-[#D4AF37]" />,
  LayoutGrid: <LayoutGrid className="w-6 h-6 text-[#D4AF37]" />,
  Compass: <Compass className="w-6 h-6 text-[#D4AF37]" />,
  ShieldAlert: <Building2 className="w-6 h-6 text-[#D4AF37]" />,
  Leaf: <Leaf className="w-6 h-6 text-[#D4AF37]" />,
  Activity: <Activity className="w-6 h-6 text-[#D4AF37]" />
};

export default function Services({ darkMode, services, onBookClick }: ServicesProps) {
  const [selectedService, setSelectedService] = React.useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 relative overflow-hidden transition-colors duration-300">
      
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2 font-semibold">Technical Solutions</span>
          <h2 className={`text-3xl md:text-5xl font-bold font-display-serif ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
            Hydrogeological Solutions We Offer
          </h2>
          <p className={`text-sm md:text-base max-w-2xl mx-auto mt-4 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Harnessing state-of-the-art geophysical sensors, mathematical modeling, and 30+ years of local terrain knowledge to deliver flawless water consultancy.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-rose-400 to-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Glass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group relative p-6 artistic-card border transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                darkMode 
                  ? 'glass-panel border-[#D4AF37]/10 hover:border-[#D4AF37]/50 hover:bg-[#0d0c1c]' 
                  : 'bg-[#FAF6F0] border-amber-900/10 shadow-md shadow-[#D4AF37]/5 hover:bg-white hover:border-[#D4AF37]/40'
              }`}
            >
              <div>
                {/* Floating Glow Indicator */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-transparent to-[#D4AF37]/5 rounded-tr-2xl group-hover:to-[#D4AF37]/15 transition-all duration-500" />
                
                {/* Service Icon */}
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center transition-all ${
                  darkMode ? 'bg-white/5 group-hover:bg-[#D4AF37]/10' : 'bg-[#D4AF37]/5 group-hover:bg-[#D4AF37]/15'
                }`}>
                  {iconMap[service.iconName] || <Droplet className="w-6 h-6 text-[#D4AF37]" />}
                </div>

                {/* Title */}
                <h3 className={`text-lg md:text-xl font-bold font-display-sans mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 ${
                  darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'
                }`}>
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className={`text-xs md:text-sm leading-relaxed mb-6 line-clamp-3 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {service.description}
                </p>
              </div>

              {/* Card Footer CTA */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <button
                  id={`view-details-${service.id}`}
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-mono text-[#D4AF37] flex items-center gap-1 hover:underline cursor-pointer"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  id={`book-service-${service.id}`}
                  onClick={() => onBookClick(service.title)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105 cursor-pointer ${
                    darkMode 
                      ? 'bg-white/5 hover:bg-[#D4AF37] hover:text-slate-950 text-slate-300' 
                      : 'bg-amber-900/5 hover:bg-amber-800 hover:text-white text-[#9A7B1C] font-medium'
                  }`}
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Detail Lightbox Modal */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
            <div 
              className={`w-full max-w-2xl artistic-card overflow-hidden border p-6 md:p-8 relative transition-all duration-300 shadow-2xl ${
                darkMode ? 'bg-[#0d0c1c] border-[#D4AF37]/20 text-[#FAF8F5]' : 'bg-[#FAF6F0] border-[#D4AF37]/30 text-[#2C2520]'
              }`}
              id="service-modal-panel"
            >
              {/* Close Button */}
              <button
                id="close-service-modal"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-400 hover:text-slate-200" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                  {iconMap[selectedService.iconName] || <Droplet className="w-8 h-8 text-[#D4AF37]" />}
                </div>
                <div>
                  <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">Solution Focus</span>
                  <h3 className="text-xl md:text-2xl font-bold font-display-serif">{selectedService.title}</h3>
                </div>
              </div>

              {/* Detailed Description */}
              <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {selectedService.description}
              </p>

              {/* Technical Scope & Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-3 font-semibold">Technical Scope</h4>
                  <ul className="space-y-2">
                    {selectedService.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm">
                        <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-3 font-semibold">Strategic Benefits</h4>
                  <ul className="space-y-2">
                    {selectedService.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Booking Action */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  id="modal-cancel-btn"
                  onClick={() => setSelectedService(null)}
                  className={`px-5 py-2.5 rounded-full text-xs font-mono cursor-pointer ${
                    darkMode ? 'hover:bg-white/5 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Close
                </button>
                <button
                  id="modal-book-btn"
                  onClick={() => {
                    onBookClick(selectedService.title);
                    setSelectedService(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-[#D4AF37] hover:opacity-90 text-white text-xs font-semibold shadow-lg cursor-pointer"
                >
                  Schedule Site Survey
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
