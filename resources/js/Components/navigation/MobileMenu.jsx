import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';
import MobileNavItem from './MobileNavItem';
import ThemeToggle from '../ThemeToggle';
import LanguageSelector from '../LanguageSelector';

// Enhanced overlay animation
const overlayVariants = {
  hidden: { 
    opacity: 0,
    backdropFilter: 'blur(0px)'
  },
  visible: { 
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Enhanced menu animation
const menuVariants = {
  hidden: { 
    x: "-100%", 
    opacity: 0,
    scale: 0.98
  },
  visible: { 
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 27,
      stiffness: 280,
      mass: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    x: "-100%",
    opacity: 0,
    scale: 0.98,
    transition: {
      type: "spring",
      damping: 27,
      stiffness: 280,
      mass: 0.8,
      when: "afterChildren",
      staggerChildren: 0.05
    }
  }
};

const MobileMenu = ({ isOpen, setIsOpen, menuItems, activeItems, theme }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsOpen(false)}
            className={`fixed inset-0 z-50
              ${theme === 'dark' ? 'bg-black/75' : 'bg-black/50'}`}
          />
          
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 left-0 h-screen w-72 z-50 
              overflow-y-auto border-r shadow-lg
              ${theme === 'dark'
                ? 'bg-gray-900/95 border-gray-800'
                : 'bg-white/95 border-gray-200'}
              backdrop-blur-md`}
          >
            <div className={`sticky top-0 z-10 border-b
              ${theme === 'dark'
                ? 'bg-gray-900/95 border-gray-800'
                : 'bg-white/95 border-gray-200'}
              backdrop-blur-md`}>
              <div className="flex items-center justify-between p-4">
                <Link 
                  href="/" 
                  className="flex items-center gap-3" 
                  onClick={() => setIsOpen(false)}
                >
                  <motion.img 
                    src="/assets/sdg2.png" 
                    alt="Logo" 
                    className="w-8 h-8 rounded-lg shadow-md"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 360,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }
                    }}
                  />
                  <motion.span 
                    className={`font-semibold text-sm
                      ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    whileHover={{ 
                      x: 3,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17
                      }
                    }}
                  >
                    SDG's Center Unsoed
                  </motion.span>
                </Link>
                <motion.button
                  whileHover={{ 
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 17
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-xl transition-all duration-200
                    ${theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}
                    active:shadow-inner`}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <motion.nav 
              className="p-4 space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.2,
                  duration: 0.3
                }
              }}
            >
              {menuItems.map((item, index) => (
                <MobileNavItem
                  key={item.name}
                  item={item}
                  onClose={() => setIsOpen(false)}
                  index={index}
                  theme={theme}
                />
              ))}
            </motion.nav>

            <div className={`p-4 mt-4 border-t
              ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
              {/* <div className="flex items-center justify-between">
                <LanguageSelector />
                <ThemeToggle />
              </div> */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;