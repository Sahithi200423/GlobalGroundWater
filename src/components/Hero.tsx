import React from 'react';
import { Calendar, Compass, ArrowRight, Award, Layers, Users } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
  onBookClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ darkMode, onBookClick, onExploreClick }: HeroProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  // High performance particle fluid lattice animation
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Initialize flowing particles representing underground hydrology
    const particleCount = Math.min(60, Math.floor(width / 20));
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.6 + 0.1, // Flow downwards like water
        radius: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradient background matching the mode
      ctx.fillStyle = darkMode ? '#0A0915' : '#FAF8F5';
      ctx.fillRect(0, 0, width, height);

      // Render underground aquiferous flow lines
      ctx.strokeStyle = darkMode ? 'rgba(212, 175, 55, 0.08)' : 'rgba(139, 92, 26, 0.05)';
      ctx.lineWidth = 1.5;
      
      // Draw simulated horizontal geological layers
      const layersCount = 5;
      for (let j = 1; j <= layersCount; j++) {
        const offset = Math.sin(Date.now() * 0.001 + j) * 15;
        const yCoord = (height / (layersCount + 1)) * j + offset;
        ctx.beginPath();
        ctx.moveTo(0, yCoord);
        ctx.bezierCurveTo(width / 3, yCoord - 30, (2 * width) / 3, yCoord + 30, width, yCoord);
        ctx.stroke();
      }

      // Render connected hydrology nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy;
        p.x += p.vx;

        // Reset particles that flow off the bottom
        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.vx *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? 'rgba(212, 175, 55, 0.6)' : 'rgba(139, 92, 26, 0.5)';
        ctx.fill();

        // Connect near neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = darkMode 
              ? `rgba(212, 175, 55, ${0.15 - dist / 1100})` 
              : `rgba(139, 92, 26, ${0.12 - dist / 1100})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Decorative concentric water ripple effects on the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 opacity-40">
        <div className="water-ripple w-[300px] h-[300px]" style={{ animationDelay: '0s' }}></div>
        <div className="water-ripple w-[300px] h-[300px]" style={{ animationDelay: '2.5s' }}></div>
        <div className="water-ripple w-[300px] h-[300px]" style={{ animationDelay: '5s' }}></div>
      </div>

      {/* Dynamic flowing background blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full filter blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full filter blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto px-6 py-12 text-center z-10 flex flex-col justify-center items-center">
        {/* Subtle Tech Badge */}
        <div 
          className={`mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold font-display-sans border transition-colors ${
            darkMode 
              ? 'bg-[#D4AF37]/5 border-[#D4AF37]/20 text-[#D4AF37]' 
              : 'bg-[#FAF6F0] border-[#D4AF37]/35 text-[#9A7B1C]'
          }`}
          id="hero-badge"
        >
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>30+ YEARS OF HYDROGEOLOGICAL EXCELLENCE</span>
        </div>

        {/* Headline */}
        <h1 
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl leading-tight font-display-serif ${
            darkMode ? 'text-[#FAF8F5]' : 'text-[#2C2520]'
          }`}
          id="hero-headline"
        >
          Ground Water Consultants <br />
          <span className="bg-gradient-to-r from-indigo-400 via-rose-400 to-[#D4AF37] bg-clip-text text-transparent italic font-normal">
            Powered by Advanced Science & AI
          </span>
        </h1>

        {/* Subheadline */}
        <p 
          className={`text-base sm:text-lg md:text-xl max-w-3xl mb-10 leading-relaxed opacity-90 ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}
          id="hero-subheadline"
        >
          Highly specialized Ground Water Investigations, precise Resistivity Profiling surveys, compliant Hydrogeological impact mapping, and secure CGWA NOC consultancy in Northern India.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center w-full sm:w-auto" id="hero-actions">
          <button
            id="hero-book-btn"
            onClick={onBookClick}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-[#D4AF37] hover:opacity-90 text-white font-bold text-sm md:text-base shadow-lg shadow-indigo-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Book Consultation
          </button>
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm md:text-base border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
              darkMode 
                ? 'bg-white/5 border-[#D4AF37]/35 text-white hover:bg-white/10' 
                : 'bg-white border-[#D4AF37]/40 text-[#9A7B1C] hover:bg-[#FAF6F0] shadow-sm'
            }`}
          >
            <Compass className="w-4 h-4" />
            Explore Services
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>

        {/* Luxury Stats Grid */}
        <div 
          className={`w-full max-w-5xl artistic-card p-6 md:p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 border transition-all ${
            darkMode 
              ? 'glass-panel border-[#D4AF37]/15' 
              : 'glass-panel-light border-[#D4AF37]/20 shadow-xl shadow-[#D4AF37]/5'
          }`}
          id="hero-stats-grid"
        >
          {/* Stat 1 */}
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3">
              <Award className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-b from-[#D4AF37] to-[#9A7B1C] bg-clip-text text-transparent font-display-sans">
              30+
            </span>
            <span className={`text-xs uppercase tracking-widest font-mono mt-1 font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Years of Excellence
            </span>
            <span className={`text-xs mt-1 text-center ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              Delhi NCR & Northern India
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center p-4 border-y sm:border-y-0 sm:border-x border-[#D4AF37]/15">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3">
              <Layers className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-b from-[#D4AF37] to-[#9A7B1C] bg-clip-text text-transparent font-display-sans">
              1000+
            </span>
            <span className={`text-xs uppercase tracking-widest font-mono mt-1 font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Projects Completed
            </span>
            <span className={`text-xs mt-1 text-center ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              Agricultural & Industrial Sites
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-b from-[#D4AF37] to-[#9A7B1C] bg-clip-text text-transparent font-display-sans">
              500+
            </span>
            <span className={`text-xs uppercase tracking-widest font-mono mt-1 font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Elite Clients
            </span>
            <span className={`text-xs mt-1 text-center ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              Collab with Neer Co. & Corp.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
