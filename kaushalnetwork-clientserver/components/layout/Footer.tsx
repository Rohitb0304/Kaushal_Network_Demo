import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Type Definitions for a cleaner, type-safe approach ---
interface SvgIconProps {
  className?: string;
}

interface LinkGroup {
  title: string;
  color: string;
  links: string[];
}

interface SocialLink {
  name: string;
  href: string;
  Icon: React.ComponentType<SvgIconProps>;
}

// --- SVG Icon Components for better readability and reuse ---
const TwitterIcon = (props: SvgIconProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = (props: SvgIconProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.4-1.2-2.5-2.5-2.5S11 12.85 11 14.25V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.56 0 3.4 1.25 3.4 3.8z" />
  </svg>
);

// --- Data for Links ---
const linkGroups: LinkGroup[] = [
  {
    title: 'Quick Links',
    color: 'blue-500',
    links: ['About Us', 'FAQs', 'Contact Us'],
  },
  {
    title: 'Help',
    color: 'indigo-500',
    links: ['Complain', 'Contact Us'],
  },
  {
    title: 'Legal pages',
    color: 'purple-500',
    links: ['Privacy Policy', 'Contact Us', 'Terms of Services', 'Shipping', 'Refund Policy'],
  },
];

const socialLinks: SocialLink[] = [
  { name: 'Twitter', href: '#', Icon: TwitterIcon },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/kaushal-network/',
    Icon: LinkedInIcon,
  },
];

const routeMap: Record<string, string> = {
  'About Us': '/about',
  'FAQs': '/faqs', // Corrected link for FAQ
  'Blog': '/blog',
  'Guides': '/guides',
  'Documentation': '/docs',
  'Support': '/support',
};

const externalLinkMap: Record<string, string> = {
  'Complain': 'https://kaushalnetwork.in/complaint',
  'Contact Us': 'https://kaushalnetwork.in/contact-us',
  'Privacy Policy': 'https://kaushalnetwork.in/privacy',
  'Terms of Services': 'https://kaushalnetwork.in/terms',
  'Shipping': 'https://kaushalnetwork.in/shipping',
  'Refund Policy': 'https://kaushalnetwork.in/refund',
};

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white overflow-hidden">
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#555 1px, transparent 1px)',
          backgroundSize: '2rem 2rem',
          maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)',
        }}
      ></div>

      {/* Top gradient border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      {/* Decorative Blurs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Top section: Logo & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 border-b border-slate-800 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mr-4 shadow-lg">
                <img src="/src/logo/image.png" alt="Kaushal Network Logo" className='object-fit rounded-lg p-0.5'/>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Kaushal Network
              </h2>
            </div>
            <p className="text-slate-400 mb-8 max-w-md">
              Connecting businesses for mutual growth through our innovative networking platform.
              Build relationships, find opportunities, and scale your business.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ name, href, Icon }) => (
                <a key={name} href={href} className="group" aria-label={name}>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-indigo-600 transform hover:-translate-y-1 transition-all duration-300">
                    <Icon className="h-5 w-5 text-slate-400 group-hover:text-white" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:ml-auto max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-slate-400 mb-6">
              Subscribe to our newsletter for the latest updates and opportunities.
            </p>
            <form className="relative flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-5 pr-36 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-md transform hover:scale-105 transition-transform duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Links section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {linkGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.1 * (groupIndex + 1) }}
            >
              <h3 className="font-bold text-lg mb-5 flex items-center">
                <div className={`w-1 h-5 bg-${group.color} mr-3 rounded-full`}></div>
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {externalLinkMap[link] ? (
                      <a
                        href={externalLinkMap[link]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-indigo-400 transition-colors group flex items-center"
                      >
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out">
                          {link}
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={routeMap[link] || '#'}
                        className="text-slate-400 hover:text-indigo-400 transition-colors group flex items-center"
                      >
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out">
                          {link}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          {/* Contact Us Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link to="/contact-us">
              <h3 className="font-bold text-lg mb-5 flex items-center cursor-pointer hover:text-blue-600 transition">
                <div className="w-1 h-5 bg-blue-500 mr-3 rounded-full"></div>
                Contact Us
              </h3>
            </Link>

            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 mr-3 text-slate-500 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-slate-400">58B, GC Ghosh Road, Kolkata-700048</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-5 w-5 mr-3 text-slate-500 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:support@kaushalnetwork.com"
                  className="text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  support@kaushalnetwork.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom section with copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} Kaushal Network. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            {/* The privacy and terms links are now handled by the externalLinkMap */}
            <a
              href={externalLinkMap['Privacy Policy']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href={externalLinkMap['Terms of Services']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
