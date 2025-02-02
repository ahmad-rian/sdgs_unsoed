import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/Contexts/ThemeContext';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Enhanced animations
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    tap: { scale: 0.95 }
  };

  // Multiple ripple effects
  const createRippleVariants = (delay) => ({
    initial: {
      scale: 0.8,
      opacity: 0
    },
    hover: {
      scale: 1.5,
      opacity: 0.12,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2,
        delay,
        ease: "easeInOut"
      }
    }
  });

  const arrowVariants = {
    initial: { y: 0 },
    hover: { 
      y: -3,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
        >
          <motion.div className="relative">
            {/* Multiple Ripple Effects */}
            {[0, 0.5, 1].map((delay, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#F5E6D3]/20 to-[#B94D4D]/20'
                    : 'bg-gradient-to-br from-[#1B3A5B]/20 to-[#B94D4D]/20'
                }`}
                initial="initial"
                whileHover="hover"
                variants={createRippleVariants(delay)}
              />
            ))}
            
            {/* Enhanced Main Button */}
            <motion.button
              onClick={scrollToTop}
              className={`
                relative group flex items-center justify-center
                w-14 h-14 rounded-2xl backdrop-blur-md
                ${theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1B3A5B] to-[#B94D4D] border border-[#F5E6D3]/10'
                  : 'bg-gradient-to-br from-[#1B3A5B] to-[#B94D4D] border border-white/20'
                }
                shadow-lg ${theme === 'dark' 
                  ? 'shadow-[#B94D4D]/20' 
                  : 'shadow-[#1B3A5B]/20'
                }
                hover:shadow-xl 
                transition-all duration-500 ease-out
                focus:outline-none focus:ring-2 focus:ring-[#B94D4D]/50
              `}
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              <motion.div 
                variants={arrowVariants}
                className="relative"
                initial="initial"
                whileHover="hover"
              >
                <ChevronUp className={`w-6 h-6 ${
                  theme === 'dark' 
                    ? 'text-[#F5E6D3]' 
                    : 'text-white'
                }`} />
                {/* Subtle glow behind arrow */}
                <div className={`
                  absolute inset-0 blur-md -z-10
                  ${theme === 'dark'
                    ? 'bg-[#F5E6D3]/30'
                    : 'bg-white/30'
                  }
                `} />
              </motion.div>
            </motion.button>

            {/* Enhanced background glow */}
            <div className={`
              absolute -inset-1 -z-10 blur-xl rounded-full opacity-75
              ${theme === 'dark'
                ? 'bg-gradient-to-r from-[#B94D4D]/30 via-[#1B3A5B]/30 to-[#B94D4D]/30'
                : 'bg-gradient-to-r from-[#1B3A5B]/30 via-[#B94D4D]/30 to-[#1B3A5B]/30'
              }
            `} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;