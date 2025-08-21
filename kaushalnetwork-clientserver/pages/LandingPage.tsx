/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';

import KaushalUpdates from '../components/Landing_Page_component/KaushalUpdates';
import ForMSMEs from '../components/Landing_Page_component/ForMSMEs';
import WhyJoinKaushalNetwork from '../components/Landing_Page_component/WhyJoinKaushalNetwork';
import { useDebounce } from '../hooks/useDebounce';

// Import new modularized components
import HeroSection from '../components/Landing_Page_component/HeroSection';
import StatsCards from '../components/Landing_Page_component/StatsCards';
import Testimonials from '../components/Landing_Page_component/Testimonials';
import Footer from '../components/layout/Footer';
import MarqueeBanner from '../components/Landing_Page_component/MarqueeBanner';
import TopSearchBanner from '../components/Landing_Page_component/TopSearchBanner';
import EcommerceSection from '../components/Landing_Page_component/ECommerceSection';

const LandingPage = () => {
  // Remove search-related state since it's now in HeroSection
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleGetStarted = () => {
    try {
      if (isAuthenticated) {
        navigate('/network');
      } else {
        toast.error('Please login to continue');
        navigate('/login');
      }
    } catch (error) {
      // Fallback if navigate is not available
      window.location.href = isAuthenticated ? '/network' : '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section with Lottie Animation */}
      <main className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-70"></div>

        <div className="relative">
          {/* Enhanced Hero with Lottie Animation */}
          <div className="px-8 py-12">
            <div className="container mx-auto">
              <div className="text-center space-y-4">
                {/* Hero Content First */}
                <div className="max-w-4xl mx-auto">
                  <HeroSection onGetStarted={handleGetStarted} />
                </div>

                {/* Lottie Animation Below Hero Content - Reduced Gap */}
                <div className="flex justify-center mt-1">
                  <div className="w-full max-w-xs md:max-w-md lg:max-w-lg">
                    <DotLottieReact
                      src="https://lottie.host/10e734f9-4c8b-47cf-a40d-e834ba5d427c/e3RqV1HXBh.lottie"
                      loop
                      autoplay
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Original Marquee */}
          <MarqueeBanner />

          <EcommerceSection />

          {/* Top Search Goods & Services Banner + other marquee banners */}
          <div className="">
            <TopSearchBanner />
          </div>

          {/* Resume padding for other sections - Remove SearchSection */}
          <div className="px-8 py-20">
            <StatsCards />
            {/* SearchSection removed - now integrated in HeroSection */}
            <KaushalUpdates />
            <Testimonials />

            <section className="bg-white">
              <ForMSMEs />
            </section>

            <WhyJoinKaushalNetwork />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
