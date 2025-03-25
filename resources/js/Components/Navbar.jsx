import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/Contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import NavItem from './navigation/NavItem';
import MobileMenu from './navigation/MobileMenu';
import getMenuItems from '@/Config/menuItems';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const menuItems = getMenuItems(t);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b
        ${theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg
                ${theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
            
            <Link href="/" className="flex items-center gap-3">
              <motion.img 
                src="/assets/sdg2.png" 
                alt="SDGs Logo"
                className="w-8 h-8"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <span className={`font-sans text-lg font-medium tracking-tight
                ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                SDG's Center 
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavItem 
                  item={item} 
                  isActive={activeDropdown === item.name}
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  scrolled={scrolled}
                  theme={theme}
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <LanguageSelector />
            <ThemeToggle />
          </motion.div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            menuItems={menuItems} 
            theme={theme}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;