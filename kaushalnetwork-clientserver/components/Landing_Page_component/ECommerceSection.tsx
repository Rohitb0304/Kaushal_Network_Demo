import React from 'react';

const EcommerceSection = () => {
  return (
    <div className="relative overflow-hidden bg-slate-50 text-gray-800 py-32 px-4 rounded-[40px] shadow-2xl text-center max-w-7xl mx-auto mt-20 mb-20 border border-slate-200/90">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 transform -skew-y-3"></div>
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Get started with E-commerce through <br /> Kaushal Network.
        </h2>
        <p className="mt-6 text-base md:text-lg max-w-3xl mx-auto text-slate-600">
          Transform your local business into a global enterprise with our comprehensive e-commerce ecosystem. From custom sub-domains to international expansion - we've got you covered.
        </p>
        <button 
          className="mt-12 px-12 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-xl rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:from-violet-700 hover:to-fuchsia-700 focus:outline-none focus:ring-4 focus:ring-fuchsia-300"
          onClick={() => window.location.href = '/register'}
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default EcommerceSection;