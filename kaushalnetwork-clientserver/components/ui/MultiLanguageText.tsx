import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MultiLanguageTextProps {
  className?: string;
  duration?: number; // duration in milliseconds
}

const MultiLanguageText: React.FC<MultiLanguageTextProps> = ({
  className = '',
  duration = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of Kaushal in 13 different languages
  const languages = [
    { text: 'Kaushal', language: 'English' },
    { text: 'కౌశలం', language: 'Telugu' },
    { text: 'கௌசலம்', language: 'Tamil' },
    { text: 'কৌশল', language: 'Bengali' },
    { text: 'کاؤشل', language: 'Urdu' },
    { text: 'કૌશલ', language: 'Gujarati' },
    { text: 'ᱠᱟᱣᱥᱟᱞ', language: 'Santali' },
    { text: 'ڪوشل', language: 'Sindhi' },
    { text: 'ਕੌਸ਼ਲ', language: 'Punjabi' },
    { text: 'ಕೌಶಲ್ಯ', language: 'Kannada' },
    { text: 'ಕೌಶಲ್', language: 'Kannada' },
    { text: 'కౌశల్', language: 'Telugu' },
    { text: 'कौशल', language: 'Hindi' },
  ];

  useEffect(() => {
    // Setup interval to rotate through languages
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % languages.length);
    }, duration);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [duration, languages.length]);

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center"
        >
          <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {languages[currentIndex].text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MultiLanguageText;
