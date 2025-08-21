import React, { useState, useRef, MouseEvent } from 'react';
import Marquee from 'react-fast-marquee';
import { Workflow, Globe, Network, BarChart4 } from 'lucide-react';

// --- Card Type Definitions ---
interface Benefit {
  design: 'grid' | 'aurora' | 'spotlight' | 'crystal';
  icon: JSX.Element;
  title: string;
  description: string;
}

// --- Individual Card Component ---
const BenefitCard: React.FC<{ item: Benefit }> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || item.design !== 'spotlight') return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStyle({
      '--spotlight-x': `${x}px`,
      '--spotlight-y': `${y}px`,
    });
  };

  // --- MODIFIED: Common classes updated for light theme and consistent rounded corners ---
  const commonClasses =
    'relative w-96 h-64 flex flex-col justify-between p-6 bg-white border border-slate-200/90 rounded-2xl transition-all duration-300 group will-change-transform';

  // A wrapper for card content to ensure it's on top of pseudo-element backgrounds
  const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative z-10">{children}</div>
  );

  switch (item.design) {
    case 'grid':
      return (
        // --- MODIFIED: Added bg-grid-light, updated hover border and text colors ---
        <div
          className={`${commonClasses} bg-grid-light hover:border-indigo-400 hover:-translate-y-2`}
        >
          <div className="absolute inset-0 z-0 bg-grid-pattern opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity rounded-2xl"></div>
          <ContentWrapper>
            <div className="flex items-center gap-5">
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-indigo-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
            </div>
            <p className="mt-14 text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
              {item.description}
            </p>
          </ContentWrapper>
        </div>
      );

    case 'aurora':
      return (
        // --- MODIFIED: Added bg-aurora-light, updated hover border, icon, and text colors ---
        <div
          className={`${commonClasses} items-center text-center bg-aurora-light hover:border-purple-400 hover:-translate-y-2 overflow-hidden`}
        >
          <ContentWrapper>
            <div
              className={`w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg group-hover:scale-110 transition-transform`}
            >
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
              {item.description}
            </p>
          </ContentWrapper>
        </div>
      );

    case 'spotlight':
      return (
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          style={style}
          // --- MODIFIED: Removed clip-path for rounded corners, added bg-spotlight-light, updated hover border ---
          className={`${commonClasses} overflow-hidden bg-spotlight-light hover:border-amber-400 hover:-translate-y-2`}
        >
          <div className="spotlight-content pointer-events-none relative z-10">
            <div className="flex items-center gap-5 mb-14">
              <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-amber-100/70 border border-amber-200 text-amber-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
            </div>
            <p className="text-sm text-slate-500">{item.description}</p>
          </div>
        </div>
      );

    case 'crystal':
      return (
        // --- MODIFIED: Removed clip-path for rounded corners, added bg-crystal-light, updated hover styles and colors ---
        <div className={`${commonClasses} bg-crystal-light justify-start hover:-translate-y-2`}>
          <ContentWrapper>
            <div className="flex justify-between items-start">
              <div className="w-2/3">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                  {item.description}
                </p>
              </div>
              <div
                className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-300`}
              >
                {item.icon}
              </div>
            </div>
          </ContentWrapper>
        </div>
      );
    default:
      return null;
  }
};

// --- Main Banner Component ---
const MarqueeBanner: React.FC = () => {
  // --- MODIFIED: All custom styles updated for a light theme ---
  const customStyles = `
    /* -- CSS Properties for Animation -- */
    @property --spotlight-x { syntax: '<length>'; initial-value: 0px; inherits: false; }
    @property --spotlight-y { syntax: '<length>'; initial-value: 0px; inherits: false; }
    @property --glow-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
    
    /* -- Keyframe Animations -- */
    @keyframes moveDots { to { background-position: -1000px 0; } }
    @keyframes spinGlow { to { --glow-angle: 360deg; } }
    
    /* -- Grid Card Styles (Light Theme) -- */
    .bg-grid-light { background-color: #ffffff; }
    .bg-grid-pattern {
      background-image: radial-gradient(rgba(148, 163, 184, 0.4) 1px, transparent 1px);
      background-size: 20px 20px;
      animation: moveDots 40s linear infinite;
      mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 70%, transparent 100%);
    }

    /* -- Aurora Card Styles (Light Theme) -- */
    .bg-aurora-light {
      background-color: #f8fafc; /* slate-50 */
      background-image: radial-gradient(ellipse 80% 80% at 50% -20%,rgba(192, 132, 252, 0.25), transparent), 
                        radial-gradient(ellipse 80% 80% at 50% 120%,rgba(59, 130, 246, 0.15), transparent);
      background-size: 100% 100%;
      transition: background-size 0.5s ease-out;
    }
    .group:hover .bg-aurora-light {
      background-size: 150% 150%;
    }

    /* -- Spotlight Card Styles (Light Theme) -- */
    .bg-spotlight-light { background-color: #ffffff; }
    .bg-spotlight-light::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit; /* This makes the effect follow the rounded corners */
      background: radial-gradient(450px circle at var(--spotlight-x) var(--spotlight-y), rgba(251, 191, 36, 0.2), transparent 80%);
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      will-change: opacity;
    }
    .bg-spotlight-light:hover::before { opacity: 1; }
    .spotlight-content { 
      transform: perspective(800px);
      transition: transform 0.3s, opacity 0.3s; 
      will-change: transform, opacity; 
    }
    .group:hover .spotlight-content { 
      opacity: 1; 
      transform: scale(1.02) perspective(800px) rotateY(-2deg) rotateX(4deg);
    }
    
    /* -- Crystal Card Styles (Light Theme) -- */
    .bg-crystal-light { 
        background: #f0fdfa; /* emerald-50 */
    }
    .bg-crystal-light::before, .bg-crystal-light::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit; /* This makes the effect follow the rounded corners */
    }
    .bg-crystal-light::before {
        inset: -1px; /* border thickness */
        background: conic-gradient(from var(--glow-angle), transparent 25%, #10b981 50%, transparent 75%); /* emerald-500 */
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        animation: spinGlow 4s linear infinite paused;
        will-change: opacity;
    }
    .group:hover .bg-crystal-light::before {
        opacity: 1;
        animation-play-state: running;
    }
    .bg-crystal-light::after {
        background: 
            linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 25%), 
            linear-gradient(225deg, rgba(16, 185, 129, 0.1) 0%, transparent 25%),
            linear-gradient(45deg, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            linear-gradient(315deg, rgba(16, 185, 129, 0.15) 0%, transparent 50%);
        background-color: #f0fdfa; /* emerald-50 */
    }
  `;

  const benefits: Benefit[] = [
    {
      design: 'grid',
      icon: <Workflow className="w-7 h-7" />,
      title: 'Streamlined Architecture',
      description: 'Manage your entire business cycle on one intuitive, robust platform.',
    },
    {
      design: 'aurora',
      icon: <Globe className="w-7 h-7" />,
      title: 'Cosmic Reach',
      description: 'Transcend geography. Reach new customers and partners anywhere on the globe.',
    },
    {
      design: 'spotlight',
      icon: <BarChart4 className="w-7 h-7" />,
      title: 'Precision Analytics',
      description: 'Utilize secure management tools and get laser-focused performance insights.',
    },
    {
      design: 'crystal',
      icon: <Network className="w-7 h-7" />,
      title: 'Faceted Networking',
      description:
        'Build clear, multi-dimensional B2B relationships in a dedicated social ecosystem.',
    },
  ];

  return (
    // --- MODIFIED: Main background changed to light theme ---
    <div className="w-full py-20 lg:py-28 relative overflow-hidden bg-slate-50">
      <style>{customStyles}</style>
      {/* --- MODIFIED: Gradient updated for light theme --- */}
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_50%_50%_at_50%_-20%,rgba(99,102,241,0.1),transparent)]"></div>

      {/* --- MODIFIED: Text colors updated for light theme --- */}
      <div className="relative z-10 max-w-7xl mx-auto mb-20 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          A Platform for Every Ambition
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          Discover a suite of tools as unique as your business, designed to empower every stage of
          your growth.
        </p>
      </div>

      <Marquee gradient={false} speed={40} pauseOnHover={true}>
        {[...benefits, ...benefits].map((item, index) => (
          <div className="px-4" key={index}>
            <BenefitCard item={item} />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeBanner;
