import { motion, Variants } from 'framer-motion';
import { Calendar, ChevronRight, ArrowRight } from 'lucide-react';

// Data and Interfaces (unchanged)
interface Update {
  id: number;
  title: string;
  description: string;
  date: string;
  category: 'MSME' | 'Service Provider' | 'Corporate';
  image: string;
}

const updates: Update[] = [
  {
    id: 1,
    title: 'MSME Growth Program',
    description: 'Access to capital and business development resources for small enterprises.',
    date: '2024-01-15',
    category: 'MSME',
    image:
      'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Service Excellence Workshop',
    description:
      'A professional development program designed to elevate the quality and impact of service providers in the modern market.',
    date: '2024-01-20',
    category: 'Service Provider',
    image:
      'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Corporate Innovation Summit',
    description:
      'Network with industry leaders, discover emerging trends, and explore disruptive partnership opportunities.',
    date: '2024-01-25',
    category: 'Corporate',
    image:
      'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Tailwind Purge-safe style map (unchanged, still critical)
const categoryStyles = {
  MSME: {
    text: 'text-emerald-800',
    bgLight: 'bg-emerald-100',
    border: 'border-emerald-300',
    gradientFrom: 'from-emerald-300',
  },
  'Service Provider': {
    text: 'text-blue-800',
    bgLight: 'bg-blue-100',
    border: 'border-blue-300',
    gradientFrom: 'from-blue-300',
  },
  Corporate: {
    text: 'text-purple-800',
    bgLight: 'bg-purple-100',
    border: 'border-purple-300',
    gradientFrom: 'from-purple-300',
  },
};

// Animation variants (unchanged)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const KaushalUpdates = () => (
  <section className="py-24 relative overflow-hidden bg-slate-50">
    {/* Animated background elements with new custom animation */}
    <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-slow"></div>
    <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-slow animation-delay-2000"></div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        className="text-center max-w-3xl mx-auto mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <motion.span
          variants={itemVariants}
          className="px-4 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold inline-block mb-4"
        >
          LATEST UPDATES
        </motion.span>
        {/* User's requested heading text is restored here */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent"
        >
          Updates for MSMEs, Service Providers and Corporates
        </motion.h2>
        <motion.p variants={itemVariants} className="text-gray-600 text-lg">
          Stay informed about latest opportunities and industry developments to grow your business.
        </motion.p>
      </motion.div>

      {/* Featured update */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16 md:mb-24 group"
      >
        <div className="grid md:grid-cols-2 gap-0 bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 hover:shadow-indigo-500/20 transition-all duration-500">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <img
              src={updates[0].image}
              alt={updates[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col">
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${categoryStyles[updates[0].category].bgLight} ${categoryStyles[updates[0].category].text}`}
                >
                  {updates[0].category}
                </span>
                <div className="flex items-center text-gray-500 text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {formatDate(updates[0].date)}
                </div>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                {updates[0].title}
              </h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{updates[0].description}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="self-start px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
            >
              Read Full Update
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* --- The BEST UI Cards --- */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {updates.slice(1).map(update => (
          <motion.div
            key={update.id}
            variants={itemVariants}
            whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative"
          >
            {/* Animated Gradient Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

            <div className="relative h-full bg-white/70 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg shadow-black/5 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={update.image}
                  alt={update.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${categoryStyles[update.category].bgLight} ${categoryStyles[update.category].text}`}
                  >
                    {update.category}
                  </span>
                  <span className="text-sm text-gray-500">{formatDate(update.date)}</span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {update.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{update.description}</p>

                {/* Reveal-on-hover link */}
                <div className="mt-auto h-8 flex items-end">
                  <div className="flex items-center text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Learn more
                    <ChevronRight className="w-5 h-5 ml-1 transform-gpu transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View all updates button */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -4, boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white border-2 border-indigo-200 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50/50 transition-all duration-300 inline-flex items-center gap-2"
        >
          View All Updates
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  </section>
);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default KaushalUpdates;
