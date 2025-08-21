import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import { Users, BarChart2, Building } from 'lucide-react';

/* 
  --- 1. THEME DEFINITION ---
  We use CSS variables to create a centralized theme. This is a best practice 
  for creating consistent and easily maintainable UIs. HSL format is used for
  easy color manipulation (e.g., changing opacity).
*/
const ThemedStyles = () => (
  <style>{`
    :root {
      --bg-primary: 240 5% 96%; /* bg-slate-50 */
      --bg-card: 0 0% 100%;     /* bg-white */
      --text-primary: 224 71% 4%; /* text-slate-900 */
      --text-secondary: 220 9% 46%; /* text-slate-600 */
      --border-primary: 240 5% 84%;   /* border-slate-300 */

      /* ACCENT COLOR - used for hovers, icons, buttons */
      --accent: 250 67% 55%; /* A rich indigo/violet */
    }
  `}</style>
);

const statsData = [
  {
    title: '40,000+',
    label: 'MSMEs',
    desc: 'Explore a vast network of potential business connections.',
    icon: <Users size={28} />,
  },
  {
    title: '20,000+',
    label: 'Service Providers',
    desc: 'Find top-tier professionals and services to help you scale.',
    icon: <BarChart2 size={28} />,
  },
  {
    title: '1,000+',
    label: 'Corporates',
    desc: 'Forge strategic partnerships that drive innovation and growth.',
    icon: <Building size={28} />,
  },
];

// --- 2. REFACTORED CARD ITEM COMPONENT ---
// Encapsulates all logic for a single card for cleanliness.
const StatCardItem = ({ stat, index }) => {
  const ref = useRef(null);
  // Track mouse position within the card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse position values for a softer animation
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = e => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // Create the CSS template for the spotlight gradient
  const spotlightGradient = useMotionTemplate`
        radial-gradient(
            350px at ${smoothMouseX}px ${smoothMouseY}px,
            hsl(var(--accent) / 0.15),
            transparent 80%
        )
    `;

  return (
    <motion.div
      key={index}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: index * 0.15, type: 'spring', bounce: 0.3 }}
      className="group relative h-full rounded-2xl border bg-card p-8 
                       shadow-md transition-all duration-300
                       hover:shadow-xl hover:shadow-[hsl(var(--accent)/0.1)]"
      style={
        {
          borderColor: 'hsl(var(--border-primary))',
          '--accent-border': `hsl(var(--accent) / 0.5)`,
        } as React.CSSProperties
      }
    >
      {/* --- 3. DYNAMIC GLOWING SPOTLIGHT ---
                This div applies the radial gradient that follows the cursor,
                creating a beautiful and interactive hover effect.
            */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 
                           transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightGradient }}
      />
      {/* Unified animated border */}
      <div
        className="absolute -inset-px rounded-2xl border-2 border-transparent 
                           opacity-0 transition-all duration-300 
                           group-hover:border-[var(--accent-border)] group-hover:opacity-100"
      />

      <div className="relative z-10 h-full flex flex-col">
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`inline-flex p-3 rounded-xl text-white shadow-lg`}
          style={{ background: 'hsl(var(--accent))' }}
        >
          {stat.icon}
        </motion.div>

        <h3
          className="text-4xl md:text-5xl font-bold mt-6 mb-1"
          style={{ color: 'hsl(var(--text-primary))' }}
        >
          {stat.title}
        </h3>
        <h4 className="text-xl font-semibold mb-3" style={{ color: 'hsl(var(--accent))' }}>
          {stat.label}
        </h4>

        {/* Growable div to push content to bottom */}
        <div className="flex-grow" />

        <p className="mt-2 text-base" style={{ color: 'hsl(var(--text-secondary))' }}>
          {stat.desc}
        </p>

        <div className="mt-6">
          <a
            href="#"
            className={`group/button relative inline-flex items-center justify-center px-5 py-2 rounded-full 
                                    overflow-hidden font-medium text-sm transition-all duration-300 border-2`}
            style={{ color: `hsl(var(--accent))`, borderColor: `hsl(var(--accent))` }}
          >
            <span
              className="absolute h-full w-full -translate-x-full group-hover/button:translate-x-0 
                                     transition-transform duration-500 ease-in-out"
              style={{ background: `hsl(var(--accent))` }}
            ></span>
            <span className="relative z-10 group-hover/button:text-white transition-colors duration-300">
              Learn more
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 h-4 w-4 ml-2 transition-all duration-300 
                                       group-hover/button:translate-x-1.5 group-hover/button:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const StatsCards = () => {
  return (
    <>
      <ThemedStyles />
      <div
        className="relative py-20 sm:py-24"
        style={{ backgroundColor: 'hsl(var(--bg-primary))' }}
      >
        {/* Subtle background ambiance */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 opacity-20"
          style={{ background: 'linear-gradient(to bottom, hsl(var(--bg-card)), transparent)' }}
        />

        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 px-4"
          style={{ color: 'hsl(var(--text-primary))' }}
        >
          Powering Business Connections Across India
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {statsData.map((stat, index) => (
            <StatCardItem key={index} stat={stat} index={index} />
          ))}
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 font-semibold text-white rounded-full
                                     shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            style={{ background: 'hsl(var(--text-primary))' }}
          >
            View Detailed Statistics
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </>
  );
};

export default StatsCards;
