import React from 'react';
import { Award, Compass, Layers, Milestone, CheckCircle2 } from 'lucide-react';

interface TimelineProps {
  darkMode: boolean;
}

interface MilestoneItem {
  year: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  achievement: string;
  tag: string;
}

const milestones: MilestoneItem[] = [
  {
    year: '1995',
    title: 'Partnership & Groundwork',
    shortDesc: 'Mr. Srikanth & Mr. Ravikanth begin geological site inspections in Northern India.',
    longDesc: 'Armed with classic geological maps and manual resistivity tools, the duo completed their first deep exploratory well design in Ludhiana, Punjab, securing a massive yield of 1,200 Litres Per Minute (LPM) for local farming collectives.',
    achievement: '100% drilling success rate across 15 agricultural pilot hubs',
    tag: 'Agricultural Inception'
  },
  {
    year: '2002',
    title: 'Digital Resistivity Revolution',
    shortDesc: 'Transitioned to high-accuracy digital electrical resistivity logging.',
    longDesc: 'To eliminate the uncertainty of layered soils in the Indo-Gangetic Alluvium, the firm integrated advanced 1D/2D digital sounding meters, mastering Schlumberger/Wenner array configurations to map fractures down to 250 meters depth.',
    achievement: 'Adopted digital sounding tomographies saving 40% drilling waste',
    tag: 'Technology Upgrade'
  },
  {
    year: '2010',
    title: 'Corporate & Municipal Scaling',
    shortDesc: 'Retained as primary hydrogeological consultants by leading water enterprises.',
    longDesc: 'Collaborated as chief planners with Neer Company and national water bodies. Supervised large municipal tube-well layouts in New Delhi and organized watershed conservation blueprints for mega residential hubs in Safdarjung, Humayun Pur, and Noida.',
    achievement: 'Designed 50+ municipal aquifer layouts across NCR',
    tag: 'Strategic Partnership'
  },
  {
    year: '2018',
    title: 'CGWA Compliance Era',
    shortDesc: 'Formed a specialized regulatory wing for industrial environmental clearances.',
    longDesc: 'With the introduction of strict Central Ground Water Authority (CGWA) guidelines, the firm engineered a compliance workflow to deliver precise Hydrogeological Impact Assessment Reports and recharge capacity models for massive industrial plants.',
    achievement: 'Secured 250+ CGWA NOC certifications with zero legal audits',
    tag: 'Industrial compliance'
  },
  {
    year: '2024',
    title: 'Telemetry & Piezometer Integration',
    shortDesc: 'Pioneered digital water-level transmitters and solar telemetry.',
    longDesc: 'Successfully installed over 150 automated water-level recorders (AWLRs) and telemetry piezometers. Enabled agricultural estates and factories in Western UP & Rajasthan to track real-time drawdowns and groundwater temperatures.',
    achievement: 'Telemetry arrays tracking 5,000,000 litres daily draw',
    tag: 'Telemetry IoT'
  },
  {
    year: '2026',
    title: 'Introducing HydroVision AI',
    shortDesc: 'Merging 30+ years of classical geology with modern AI predictive modeling.',
    longDesc: 'We are launching the HydroVision AI platform, putting our vast local geological databases into advanced spatial models. Under the direct expert gaze of Srikanth & Ravikanth, we continue to consult from Delhi to Chandigarh, securing India’s precious water future.',
    achievement: 'Unveiled HydroJarvis AI geological chatbot & planning system',
    tag: 'AI Era'
  }
];

export default function Timeline({ darkMode }: TimelineProps) {
  const [activeIdx, setActiveIdx] = React.useState<number>(5); // Default to latest 2026 milestone

  return (
    <section id="experience" className="py-24 relative overflow-hidden transition-colors duration-300">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2 font-semibold">Our Journey</span>
          <h2 className={`text-3xl md:text-5xl font-bold font-display-serif ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
            30 Years of Geoscientific Milestones
          </h2>
          <p className={`text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Explore the historical timeline of Srikanth & Ravikanth, from manual resistivity surveys to advanced AI groundwater modeling.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-rose-400 to-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Interaction Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Timeline Stepper Column (4cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4 pr-0 lg:pr-8 border-r border-white/5">
            {milestones.map((item, idx) => (
              <button
                key={item.year}
                id={`milestone-year-${item.year}`}
                onClick={() => setActiveIdx(idx)}
                className={`w-full text-left p-4 artistic-card border flex items-center gap-4 transition-all duration-300 cursor-pointer ${
                  activeIdx === idx
                    ? 'bg-gradient-to-r from-indigo-950/40 to-rose-950/20 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                    : darkMode 
                      ? 'bg-slate-900/40 border-white/5 hover:border-white/10 hover:bg-slate-900/60'
                      : 'bg-[#FAF6F0] border-amber-900/10 hover:border-amber-900/30 hover:bg-white shadow-sm'
                }`}
              >
                {/* Year Badge */}
                <div className={`w-14 h-12 rounded-lg flex items-center justify-center font-bold font-display-sans text-sm md:text-base shrink-0 transition-colors ${
                  activeIdx === idx
                    ? 'bg-[#D4AF37] text-slate-950 shadow-md'
                    : darkMode ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-amber-900/5 text-[#9A7B1C]'
                }`}>
                  {item.year}
                </div>

                {/* Milestones Intro text */}
                <div className="overflow-hidden">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block font-semibold">{item.tag}</span>
                  <h3 className={`font-bold text-sm md:text-base truncate font-display-sans ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.shortDesc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Milestone Detailed Screen (7cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className={`h-full artistic-card border p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${
              darkMode ? 'glass-panel border-[#D4AF37]/15' : 'bg-[#FAF8F5] border-amber-900/15 shadow-xl shadow-[#D4AF37]/5'
            }`}
            id="milestone-details-panel"
            >
              <div>
                {/* Highlight Year Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <Milestone className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block font-semibold">Featured Milestone</span>
                      <h4 className="text-xl md:text-2xl font-bold font-display-serif">
                        {milestones[activeIdx].title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-3xl md:text-4xl font-black font-mono text-[#D4AF37]/20">
                    {milestones[activeIdx].year}
                  </span>
                </div>

                {/* Milestone Detail Story */}
                <div className="space-y-4">
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-mono font-bold">
                    {milestones[activeIdx].tag}
                  </span>
                  
                  <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {milestones[activeIdx].longDesc}
                  </p>
                </div>
              </div>

              {/* Core Achievement / Footnote */}
              <div className={`mt-8 p-4 rounded-xl border flex items-center gap-3 ${
                darkMode ? 'bg-[#D4AF37]/5 border-[#D4AF37]/15' : 'bg-white border-amber-900/15 shadow-sm'
              }`}>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] font-bold">KEY ACHIEVED OUTCOME</span>
                  <p className={`text-xs md:text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {milestones[activeIdx].achievement}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
