import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, Users, Globe, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';

// --- Interfaces and Data (Slightly updated for clarity) ---

interface Reason {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const reasons: Reason[] = [
  {
    id: 1,
    title: 'Exponential Growth',
    description:
      'Unlock new markets and accelerate your business reach across industries and regions.',
    icon: <TrendingUp size={24} />,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'Strategic Networking',
    description:
      'Connect with vetted industry leaders and potential partners for meaningful collaboration.',
    icon: <Users size={24} />,
    color: 'from-purple-500 to-fuchsia-600',
  },
  {
    id: 3,
    title: 'Global Presence',
    description:
      'Amplify your digital footprint and enhance online visibility for greater market recognition.',
    icon: <Globe size={24} />,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 4,
    title: 'Exclusive Resources',
    description:
      'Leverage curated tools, expert training, and resources for operational excellence.',
    icon: <Briefcase size={24} />,
    color: 'from-amber-500 to-orange-600',
  },
];

// --- New Dynamic Background Component ---

// A single floating node for the background
const FloatingNode = ({ size, x, y, duration, delay }) => {
  const shouldReduceMotion = useReducedMotion();

  const animation = shouldReduceMotion
    ? { opacity: 0.1 } // Simple fallback for reduced motion
    : {
        transform: [
          `translate(${x}vw, ${y}vh)`,
          `translate(${x + (Math.random() * 4 - 2)}vw, ${y + (Math.random() * 4 - 2)}vh)`,
        ],
        opacity: [0, 0.15, 0],
      };

  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        width: size,
        height: size,
        opacity: 0,
      }}
      animate={animation}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay: delay,
      }}
    />
  );
};

// Component to render the network of nodes
const NetworkBackground = () => {
  // useMemo ensures we generate nodes only once
  const nodes = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 30 + 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {nodes.map(node => (
        <FloatingNode key={node.id} {...node} />
      ))}
    </div>
  );
};

// --- Main Enhanced Component ---

const WhyJoinKaushalNetwork = () => {
  // --- Animation Variants for more control ---

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 100 },
    },
  };

  return (
    <section className="py-24 relative bg-gray-50 overflow-hidden">
      {/* Dynamic Network Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/95 to-gray-900"></div>
      <NetworkBackground />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-300 rounded-full text-sm font-semibold inline-block mb-4 border border-indigo-400/30">
            BUILD YOUR FUTURE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Why Join Kaushal Network?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Join a powerful ecosystem designed for ambitious businesses. Get discovered, forge
            connections, and grow with our comprehensive suite of tools.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reasons.map(reason => (
            <motion.div
              key={reason.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="h-full cursor-pointer"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-white/10 group relative overflow-hidden flex flex-col">
                <div
                  className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${reason.color} rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 -mr-6 -mt-6`}
                ></div>

                <div className="mb-6 relative z-10">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${reason.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <div className="text-white">{reason.icon}</div>
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent bg-clip-text bg-gradient-to-r ${reason.color} transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-400 mb-6 flex-grow">{reason.description}</p>

                <div className="mt-auto">
                  <div className="flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    Learn more
                    <motion.div
                      className="ml-1"
                      animate={{ x: [-2, 2, -2] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: 'easeInOut',
                      }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </div>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${reason.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        >
          <motion.button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-10 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 transform shadow-lg hover:shadow-indigo-500/40 inline-flex"
            whileHover={{ scale: 1.05, y: -4, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 0.95 }}
          >
            Join The Network Now
            <ArrowRight size={20} />
          </motion.button>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-gray-400">
            {['40,000+ Members', '100% Free to Join', 'Premium Support Available'].map(
              (text, i) => (
                <motion.div
                  key={i}
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
                >
                  <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
                  <span>{text}</span>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyJoinKaushalNetwork;
