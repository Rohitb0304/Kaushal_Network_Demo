import { Card, CardContent } from '../ui/card'; // Assuming this is from shadcn/ui
import { Building2, MapPin, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

// --- REFINED DATA & PALETTE ---
// Switched to a more sophisticated palette: Deep Teal, Rich Gold, and a primary Sky Blue.
// Added a 'glow' property for a more subtle, luxurious hover effect on dark backgrounds.
const stats = [
  {
    title: '40,000+ MSMEs',
    description: 'Explore business connections by sector and location.',
    icon: <Building2 className="w-8 h-8 text-white" />,
    gradient: 'from-sky-500 to-indigo-600',
    glowColor: 'hover:shadow-sky-500/20',
  },
  {
    title: '12+ Sectors',
    description: 'Find verified businesses in Manufacturing, IT, Retail & more.',
    icon: <Layers className="w-8 h-8 text-white" />,
    gradient: 'from-teal-400 to-cyan-500',
    glowColor: 'hover:shadow-teal-500/20',
  },
  {
    title: '150+ Locations',
    description: 'Search and connect with MSMEs across India.',
    icon: <MapPin className="w-8 h-8 text-white" />,
    gradient: 'from-amber-400 to-orange-500',
    glowColor: 'hover:shadow-amber-500/20',
  },
];

const ForMSMEs = () => (
  // --- MAIN CONTAINER: DARK THEME & SUBTLE BACKGROUND ELEMENTS ---
  <div className="py-24 px-4 relative overflow-hidden bg-slate-900 text-slate-50">
    {/* Background decorative elements with softer, blended colors */}
    <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-900/40 rounded-full opacity-60 blur-3xl"></div>
    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-900/40 rounded-full opacity-60 blur-3xl"></div>

    {/* --- SECTION HEADING: REFINED TYPOGRAPHY & GRADIENT --- */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <span className="px-4 py-1.5 bg-slate-800 text-sky-400 rounded-full text-sm font-semibold inline-block mb-4 border border-slate-700">
        FOR MSMEs
      </span>
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-slate-50 to-slate-400 bg-clip-text text-transparent mb-4">
        Build Your Network, Elevate Your Growth
      </h2>
      <p className="text-slate-400 max-w-2xl mx-auto text-lg">
        Join thousands of MSMEs using Kaushal Network to discover partners, unlock opportunities,
        and scale their enterprise.
      </p>
    </motion.div>

    {/* --- STATS CARDS: GLASSMORPHISM & ELEGANT HOVER EFFECTS --- */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
      {stats.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: index * 0.2 }}
          className="h-full"
        >
          {/* Card with semi-transparent background, subtle border, and glow-on-hover */}
          <Card
            className={`group h-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm 
                        shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${item.glowColor}`}
          >
            <CardContent className="p-6 h-full flex flex-col">
              {/* Top section with icon */}
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{item.title}</h3>
                <div className={`p-4 rounded-lg bg-gradient-to-br ${item.gradient} shadow-lg`}>
                  {item.icon}
                </div>
              </div>

              {/* Description and Features */}
              <div className="flex-grow">
                <p className="text-slate-800 mb-6">{item.description}</p>

                {/* The feature list now seems more integrated */}
                <ul className="space-y-2.5">
                  {[1, 2, 3].map(i => (
                    <li key={i} className="flex items-center text-sm text-slate-800">
                      <svg
                        className="w-4 h-4 mr-3 flex-shrink-0 text-teal-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {index === 0 && `Feature ${i} for business connections`}
                      {index === 1 && `Feature ${i} for sector exploration`}
                      {index === 2 && `Feature ${i} for location networking`}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Animated Link at the bottom */}
              <div className="mt-8">
                <a
                  href="#"
                  className="inline-flex items-center font-semibold text-sky-400 hover:text-sky-300 transition-colors group/link"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-1 transition-transform duration-300 group-hover/link:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* --- FINAL CALL TO ACTION: PREMIUM BUTTON STYLE --- */}
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.5 }}
    >
      <button
        className="px-10 py-4 text-lg font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 text-white 
                rounded-lg shadow-lg hover:shadow-xl hover:shadow-sky-500/30
                transition-all transform hover:-translate-y-1 duration-300"
      >
        Explore All MSME Features
      </button>
    </motion.div>
  </div>
);

export default ForMSMEs;