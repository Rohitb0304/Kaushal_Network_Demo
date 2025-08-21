import React from 'react';
import { Card, CardContent } from '../ui/card'; // Assuming this is from shadcn/ui or similar
import { motion } from 'framer-motion';

const testimonialsData = [
  {
    name: 'Rahul Sharma',
    role: 'MSME Owner',
    text: 'Kaushal Network helped us expand our business reach significantly. We connected with partners we never would have found otherwise.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Service Provider',
    text: 'Found numerous clients and partnerships through this platform. The network effect is incredible, and our business has grown 40% since joining.',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    role: 'Corporate Partner',
    text: "The perfect platform to discover and connect with MSMEs. We've streamlined our supply chain and found innovative partners to collaborate with.",
    rating: 5,
  },
];

const Testimonials = () => {
  // --- Effect for the dynamic cursor spotlight on a light background ---
  const handleMouseMove = e => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 100 },
    },
  };

  return (
    <>
      {/* We add a style tag here for the complex animations which are difficult in Tailwind alone */}
      <style jsx>{`
        /* The animated border for the card */
        .animated-border::before {
          content: '';
          position: absolute;
          inset: -2px; /* Border thickness */
          z-index: -1;
          border-radius: 1.25rem; /* Matches card's rounded-2xl */
          background: conic-gradient(
            from var(--angle),
            #6366f1,
            #3b82f6,
            #8b5cf6,
            #10b981,
            #6366f1
          );
          filter: blur(10px);
          opacity: 0;
          transition:
            opacity 0.4s,
            --angle 0.4s;
          animation: 6s linear infinite spin;
        }
        .group:hover .animated-border::before {
          opacity: 1;
        }

        @property --angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes spin {
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }

        /* The new shine/glint effect on hover */
        .shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -150%;
          width: 100%;
          height: 100%;
          transform: skewX(-30deg);
          background-image: linear-gradient(
            100deg,
            rgba(255, 255, 255, 0) 20%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 80%
          );
          transition: left 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .group:hover .shine-effect::after {
          left: 150%;
        }

        /* The cursor spotlight effect for a LIGHT background */
        #spotlight-section::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            350px circle at var(--mouse-x) var(--mouse-y),
            rgba(0, 0, 0, 0.04),
            /* A very soft dark color */ transparent 80%
          );
          opacity: 0;
          transition: opacity 0.3s;
        }
        #spotlight-section:hover::before {
          opacity: 1;
        }
      `}</style>

      <section
        id="spotlight-section"
        onMouseMove={handleMouseMove}
        className="py-24 bg-slate-50 relative overflow-hidden"
      >
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold tracking-wider inline-block mb-4">
              TRUSTED VOICES
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
              Why Leaders Choose Us
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed">
              Discover the impact Kaushal Network has made through the eyes of our members.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonialsData.map(testimonial => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                className="group relative" // 'group' for hover effects
              >
                <div className="animated-border transition-all duration-300 group-hover:scale-[1.03]">
                  <Card className="shine-effect relative h-full rounded-2xl bg-white border border-slate-200 shadow-lg group-hover:shadow-xl flex flex-col overflow-hidden transition-shadow duration-300">
                    <CardContent className="p-8 flex flex-col flex-grow">
                      {/* Star Rating */}
                      <div className="flex mb-5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-slate-600 mb-8 text-lg leading-relaxed flex-grow">
                        “{testimonial.text}”
                      </blockquote>

                      {/* User Info with Monogram */}
                      <div className="flex items-center mt-auto">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 shadow-inner flex-shrink-0">
                          <span className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <p className="font-bold text-slate-800">{testimonial.name}</p>
                          <p className="text-sm font-medium text-blue-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
