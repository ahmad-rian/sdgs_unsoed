import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '@/Contexts/ThemeContext';

const FooterLink = ({ href, children }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 8 }}
    >
      <Link 
        href={href} 
        className={`group relative flex items-center py-2 pl-4 ${
          theme === 'dark' 
            ? 'text-[#FFEFD6]/80 hover:text-[#971C1C]' 
            : 'text-[#0A2647]/80 hover:text-[#971C1C]'
        } transition-colors`}
      >
        <motion.div
          className={`absolute left-0 h-full w-0.5 rounded-full ${
            theme === 'dark'
              ? 'bg-[#FFEFD6]/20'
              : 'bg-[#0A2647]/20'
          } group-hover:bg-[#971C1C] transition-colors`}
        />
        <span className="relative">
          {children}
          <motion.span 
            className={`absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ${
              theme === 'dark'
                ? 'text-[#971C1C]'
                : 'text-[#971C1C]'
            }`}
          >
            <ExternalLink className="w-3 h-3" />
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
};

export default FooterLink;