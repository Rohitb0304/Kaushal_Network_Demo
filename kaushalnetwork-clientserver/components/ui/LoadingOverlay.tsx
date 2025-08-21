import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  TrendingUp,
  Network,
  Handshake,
  Globe,
  Shield,
  Zap,
  Target,
  Award,
  MessageSquare,
  Search,
  BookOpen,
  BarChart3,
} from 'lucide-react';
import logoImage from '../../logo/image.png';

interface LoadingOverlayProps {
  message?: string;
  subMessage?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Welcome to Kaushal Network',
  subMessage = 'Your Gateway to Business Excellence',
}) => {
  const features = [
    { icon: Building2, label: 'Business Network', description: 'Connect with 50K+ companies' },
    { icon: Handshake, label: 'Partnerships', description: 'Find trusted business partners' },
    { icon: TrendingUp, label: 'Growth', description: 'Scale your business faster' },
    { icon: Search, label: 'Opportunities', description: 'Discover new business deals' },
    { icon: Shield, label: 'Verified', description: 'Secure & trusted platform' },
    { icon: Globe, label: 'Pan-India', description: 'Connect across all states' },
  ];

  const loadingSteps = [
    'Initializing secure connection...',
    'Loading business directory...',
    'Fetching latest opportunities...',
    'Preparing your dashboard...',
    'Almost ready...',
  ];

  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loadingSteps.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Building2, value: '50K+', label: 'Companies' },
    { icon: Users, value: '100K+', label: 'Professionals' },
    { icon: Handshake, value: '25K+', label: 'Partnerships' },
    { icon: TrendingUp, value: '500Cr+', label: 'Business Value' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
          }}
        ></div>
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Logo and Main Content */}
          <div className="text-center lg:text-left">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-1 shadow-2xl"
                >
                  <div className="w-full h-full bg-white rounded-full p-2.5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
                    <img
                      src={logoImage}
                      alt="Kaushal Network"
                      className="h-full w-full object-contain relative z-10"
                    />
                  </div>
                </motion.div>

                {/* Animated Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 w-20 h-20 border-2 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
                />
              </div>
            </motion.div>

            {/* Brand Name and Tagline */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3">
                {message}
              </h1>
              <p className="text-xl text-gray-600 font-semibold mb-2">{subMessage}</p>
              <p className="text-sm text-gray-500 font-medium">
                India's Fastest Growing B2B Network Platform
              </p>
            </motion.div>

            {/* Loading Animation with Dynamic Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex justify-center lg:justify-start items-center space-x-3 mb-4">
                {[0, 1, 2].map(index => (
                  <motion.div
                    key={index}
                    animate={{
                      y: [-6, 6, -6],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: index * 0.15,
                      ease: 'easeInOut',
                    }}
                    className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                ))}
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm text-gray-600 font-medium ml-4"
                >
                  {loadingSteps[currentStep]}
                </motion.p>
              </div>
            </motion.div>

            {/* Platform Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm"
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-lg font-black text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Platform Features</h3>
                <p className="text-gray-600 text-sm">Everything you need for business growth</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-4 bg-white/60 rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-200 group"
                  >
                    <feature.icon className="w-6 h-6 text-blue-600 mb-2 group-hover:text-purple-600 transition-colors" />
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{feature.label}</h4>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Powered by AI & Advanced Analytics
                    </p>
                    <p className="text-xs text-gray-600">
                      Smart matching for better business connections
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <p className="text-xs text-gray-500 font-medium">
              Secure • Trusted • Verified • Professional
            </p>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 6 }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
