import { 
  Check, 
  X, 
  Activity, 
  FileSpreadsheet, 
  Gauge, 
  HardHat, 
  Users2, 
  Sparkles 
} from 'lucide-react';

interface WhyChooseUsProps {
  darkMode: boolean;
}

export default function WhyChooseUs({ darkMode }: WhyChooseUsProps) {
  const cards = [
    {
      icon: <Activity className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Geoelectrical Imaging',
      desc: 'Instead of drilling blind, we execute multi-electrode resistivity tomography to map specific rock fractures and water-bearing sand reservoirs before excavation begins.'
    },
    {
      icon: <Users2 className="w-5 h-5 text-[#D4AF37]" />,
      title: '30+ Years Field Caliber',
      desc: 'Srikanth and Ravikanth ji bring legendary wisdom of Punjab aquifers, Gurgaon crystalline basement soils, UP sand formations, and Rajasthan hard igneous basements.'
    },
    {
      icon: <Gauge className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Automated Pumping Test',
      desc: 'We perform Step-Drawdown and constant-rate aquifer discharge tests with digital flow monitors to compute exact sustainable yields (LPM) and safe drawdown levels.'
    },
    {
      icon: <FileSpreadsheet className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Comprehensive Logs',
      desc: 'Our hydrogeological reports conform 100% to CGWA guidelines. They include exact lithological drill logs, resistivity curves, and catchment water balance sheets.'
    },
    {
      icon: <HardHat className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Active Site Oversight',
      desc: 'Our geologists supervise drilling rigs directly, matching physical soil cuttings (lithology) against resistivity profiles to position screens with millimetric precision.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#D4AF37]" />,
      title: 'HydroJarvis AI Assistant',
      desc: 'Integrating spatial predictive algorithms to compile immediate, localized groundwater profiles and legal depth rules based on historical basin records.'
    }
  ];

  return (
    <section id="why-choose-us" className={`py-24 relative overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-[#0A0915]/40' : 'bg-[#FAF8F5]'}`}>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2 font-semibold">Scientific Edge</span>
          <h2 className={`text-3xl md:text-5xl font-bold font-display-serif ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
            Why Senior Engineers Rely on Us
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-rose-400 to-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg artistic-card ${
                darkMode
                  ? 'glass-panel border-[#D4AF37]/10 hover:border-[#D4AF37]/40 hover:bg-[#0d0c1c]'
                  : 'bg-white border-amber-900/10 shadow-md shadow-[#D4AF37]/5 hover:border-[#D4AF37]/30 hover:bg-[#FAF6F0]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className={`text-lg font-bold font-display-sans mb-3 ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
                {card.title}
              </h3>
              <p className={`text-xs md:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Contrast Comparison Grid */}
        <div className="max-w-4xl mx-auto">
          <h3 className={`text-xl md:text-2xl font-bold text-center font-display-serif mb-8 ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
            Methodology Comparison: Guesswork vs. Geophysics
          </h3>

          <div className={`rounded-2xl border overflow-hidden artistic-card ${
            darkMode ? 'glass-panel border-[#D4AF37]/20' : 'bg-white border-amber-900/15 shadow-xl'
          }`}
          id="methodology-comparison-table"
          >
            {/* Table Header */}
            <div className={`grid grid-cols-12 gap-4 p-4 font-mono text-xs uppercase tracking-wider border-b border-white/5 ${
              darkMode ? 'bg-slate-900/80' : 'bg-slate-100 text-slate-700'
            }`}>
              <div className="col-span-4 font-bold">Survey Parameter</div>
              <div className="col-span-4 text-rose-500 font-bold">Standard Contractor</div>
              <div className="col-span-4 text-[#D4AF37] font-bold">HydroVision AI Method</div>
            </div>

            {/* Table Row 1 */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 items-center text-xs md:text-sm">
              <div className={`col-span-4 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Site Selection</div>
              <div className="col-span-4 text-slate-400 flex items-center gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Water divining / guesswork</span>
              </div>
              <div className="col-span-4 flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Resistivity profiling soundings</span>
              </div>
            </div>

            {/* Table Row 2 */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 items-center text-xs md:text-sm">
              <div className={`col-span-4 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Drilling Depth</div>
              <div className="col-span-4 text-slate-400 flex items-center gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Arbitrary drilling limits</span>
              </div>
              <div className="col-span-4 flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Stratigraphically designed limits</span>
              </div>
            </div>

            {/* Table Row 3 */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 items-center text-xs md:text-sm">
              <div className={`col-span-4 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>CGWA Permits</div>
              <div className="col-span-4 text-slate-400 flex items-center gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Usually ignored (leads to fines)</span>
              </div>
              <div className="col-span-4 flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Full impact report & NOC permit</span>
              </div>
            </div>

            {/* Table Row 4 */}
            <div className="grid grid-cols-12 gap-4 p-4 items-center text-xs md:text-sm">
              <div className={`col-span-4 font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>Discharge Calc</div>
              <div className="col-span-4 text-slate-400 flex items-center gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Eye-balling yield estimate</span>
              </div>
              <div className="col-span-4 flex items-center gap-2 font-medium">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Rigorous V-notch pumping test</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
