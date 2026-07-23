import React from 'react';
import { Layers, X, ZoomIn, Eye } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryProps {
  darkMode: boolean;
  items: GalleryItem[];
}

export default function Gallery({ darkMode, items }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [activeItem, setActiveItem] = React.useState<GalleryItem | null>(null);

  const categories = ['All', 'Investigation', 'Survey', 'Borewell', 'Agricultural', 'Industrial'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="gallery" className="py-24 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-2 font-semibold">Project Portfolio</span>
          <h2 className={`text-3xl md:text-5xl font-bold font-display-serif ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
            Exemplary Geological Projects
          </h2>
          <p className={`text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            A retrospective on key on-site investigations, CGWA regulatory NOC surveys, and borewell select sites conducted in Northern India.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 via-rose-400 to-[#D4AF37] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" id="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-btn-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold font-display-sans transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-[#D4AF37] text-white shadow-md shadow-indigo-500/10'
                  : darkMode
                    ? 'bg-[#D4AF37]/5 text-slate-300 hover:text-white border border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
                    : 'bg-white text-slate-600 hover:text-[#9A7B1C] border border-amber-900/15 hover:border-[#D4AF37]/35 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="gallery-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-500 hover:-translate-y-1.5 artistic-card ${
                darkMode ? 'bg-[#0d0c1c]/80 border-[#D4AF37]/15 hover:border-[#D4AF37]/40' : 'bg-white border-amber-900/10 shadow-lg shadow-[#D4AF37]/5 hover:border-[#D4AF37]/30'
              }`}
              onClick={() => setActiveItem(item)}
              id={`gallery-item-${item.id}`}
            >
              {/* Image Canvas wrapper */}
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay details on Hover */}
                <div className="absolute inset-0 bg-[#0d0c1c]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-3">
                      <ZoomIn className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-semibold">
                      {item.category}
                    </span>
                    <h4 className="text-[#FAF8F5] text-sm font-bold font-display-sans mt-1 max-w-xs mx-auto line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Constant Floating Tag */}
                <span className="absolute top-4 left-4 text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-slate-950/95 text-[#D4AF37] border border-[#D4AF37]/25 backdrop-blur-sm shadow-md">
                  {item.category}
                </span>
              </div>

              {/* Sub-Card Details block */}
              <div className="p-5">
                <h3 className={`font-bold text-sm md:text-base leading-tight font-display-sans line-clamp-1 mb-2 ${
                  darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-xs md:text-sm line-clamp-2 leading-relaxed ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500 font-mono text-sm">
              No completed works in the "{selectedCategory}" category. Check back soon.
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
            <div 
              className={`w-full max-w-4xl artistic-card overflow-hidden border relative transition-all duration-300 shadow-2xl ${
                darkMode ? 'bg-[#0d0c1c] border-[#D4AF37]/25' : 'bg-[#FAF6F0] border-amber-900/15'
              }`}
              id="gallery-lightbox-panel"
            >
              {/* Close Button */}
              <button
                id="close-lightbox"
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-[#D4AF37]/20 hover:bg-slate-800 transition-colors z-25 cursor-pointer"
              >
                <X className="w-5 h-5 text-[#FAF8F5]" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left col: Image */}
                <div className="h-96 md:h-full bg-slate-950 flex items-center justify-center">
                  <img
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    className="w-full h-full object-cover max-h-[500px]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Right col: Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest block mb-1 font-semibold">
                      Project Case Study
                    </span>
                    <span className={`text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 inline-block mb-4 font-bold`}>
                      {activeItem.category}
                    </span>
                    
                    <h3 className={`text-xl md:text-2xl font-bold mb-4 font-display-serif leading-tight ${
                      darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'
                    }`}>
                      {activeItem.title}
                    </h3>

                    <p className={`text-xs md:text-sm leading-relaxed ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {activeItem.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-xs text-[#D4AF37] font-bold">
                      SR
                    </div>
                    <div>
                      <span className={`block text-[10px] font-mono uppercase ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Consultant Team
                      </span>
                      <span className={`text-xs font-bold ${darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'}`}>
                        Mr. Srikanth & Mr. Ravikanth (30+ Yrs)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
