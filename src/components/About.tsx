import { Users, Eye, Target, Compass, ShieldAlert } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  const values = [
    {
      icon: <Compass className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Geophysical Rigor',
      description: 'Never guess water location. We rely exclusively on Schlumberger depth soundings, electrical resistivity tomography, and comprehensive hydrogeological analysis.'
    },
    {
      icon: <Target className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Aquifer Integrity',
      description: 'Prioritizing sustainable yields that protect local ecosystems from drawdown, saline encroachment, and borewell collapses.'
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Regulatory Mastery',
      description: 'Specialists in securing CGWA (Central Ground Water Authority) clearances. Ensure 100% legal alignment for industrial and corporate units.'
    }
  ];

  return (
    <section id="about" className={`py-24 relative overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-[#0A0915]/60' : 'bg-[#FAF8F5]'}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2 font-semibold">Our Legacy</span>
          <h2 className={`text-3xl md:text-5xl font-bold font-display-serif ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
            30+ Years of Hydrogeological Leadership
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-rose-400 to-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {/* Master Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Column 1: Story Text (7cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className={`text-2xl md:text-3xl font-bold font-display-sans ${darkMode ? 'text-[#D4AF37]' : 'text-[#9A7B1C]'}`}>
              The Srikanth & Ravikanth Partnership
            </h3>
            
            <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              With over three decades of field excellence, Mr. Srikanth and Mr. Ravikanth stand as pioneers in Northern India's groundwater consulting sector. Operating out of Safdarjung Enclave, New Delhi, they have successfully supervised complex ground water investigations, hydrogeological surveys, and deep-borewell projects for a diverse set of agricultural, industrial, and institutional bodies.
            </p>

            <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Having worked closely with prestigious entities like **Neer Company** and top tier engineering institutes, our firm utilizes premium-grade geological instruments to perform depth-resistivity assays. This scientific oversight ensures client assets receive highest water yield forecasts while eliminating the financial risk of drilling unproductive dry wells.
            </p>

            {/* Quick Milestones Mini-Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className={`p-5 artistic-card border ${darkMode ? 'bg-[#0d0c1c]/80 border-[#D4AF37]/15' : 'bg-white border-amber-900/10 shadow-sm'}`}>
                <span className="block text-2xl font-extrabold text-[#D4AF37] font-display-sans">30+ Yrs</span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Field Expertise</span>
              </div>
              <div className={`p-5 artistic-card border ${darkMode ? 'bg-[#0d0c1c]/80 border-[#D4AF37]/15' : 'bg-white border-amber-900/10 shadow-sm'}`}>
                <span className="block text-2xl font-extrabold text-[#D4AF37] font-display-sans">100%</span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Scientific Modeling</span>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive Card / Image (5cols) */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Outer Decorative Gradient Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-600 via-rose-400 to-[#D4AF37] rounded-3xl opacity-30 blur-lg group-hover:opacity-50 transition duration-1000"></div>
              
              <div className={`relative artistic-card overflow-hidden border p-2 ${darkMode ? 'bg-[#0d0c1c] border-[#D4AF37]/20' : 'bg-white border-amber-900/15 shadow-xl'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1473876988266-ca0860a443b8?auto=format&fit=crop&w=600&q=80" 
                  alt="Groundwater Investigation site inspection" 
                  className="w-full h-80 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md border border-[#D4AF37]/20 p-4 rounded-xl">
                  <span className="text-xs font-bold font-mono text-[#D4AF37]">ACTIVE SITE SURVEY</span>
                  <p className="text-white text-xs mt-1">Safdarjung Enclave, New Delhi - Georesistivity field testing equipment layout.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <div className={`p-8 artistic-card border ${darkMode ? 'glass-panel border-[#D4AF37]/15' : 'bg-white border-amber-900/10 shadow-md'}`}>
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className={`text-xl font-bold font-display-serif mb-3 ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>Our Mission</h4>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              To equip Northern India's agricultural, municipal, and industrial frameworks with cutting-edge geoscientific surveys. We prevent wasted excavation capital and secure clean water sustainability through highly accurate resistivity tomographies.
            </p>
          </div>

          {/* Vision Card */}
          <div className={`p-8 artistic-card border ${darkMode ? 'glass-panel border-[#D4AF37]/15' : 'bg-white border-amber-900/10 shadow-md'}`}>
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h4 className={`text-xl font-bold font-display-serif mb-3 ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>Our Vision</h4>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Setting the standard for zero-failure water exploration by merging 30+ years of classical field-geology mastery with advanced hydrogeological simulations and state-of-the-art telemetry monitors.
            </p>
          </div>
        </div>

        {/* Core Values Rows */}
        <div className="text-center mb-10">
          <h4 className="text-xs uppercase tracking-widest font-mono font-semibold text-[#D4AF37] mb-8">Our Engineering Values</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div 
                key={i} 
                className={`p-6 artistic-card border text-left transition-all hover:-translate-y-1 duration-300 ${
                  darkMode ? 'bg-[#0d0c1c]/80 border-[#D4AF37]/10 hover:border-[#D4AF37]/30' : 'bg-[#FAF6F0] border-amber-900/10 shadow-sm hover:bg-white hover:border-[#D4AF37]/20'
                }`}
              >
                <div className="mb-4">{v.icon}</div>
                <h5 className={`font-bold mb-2 text-base font-display-sans ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>{v.title}</h5>
                <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
