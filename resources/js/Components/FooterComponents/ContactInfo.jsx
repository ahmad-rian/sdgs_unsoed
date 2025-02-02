import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/Contexts/ThemeContext';

const ContactInfo = ({ icon: Icon, text, link }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div 
      className="group flex items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
    >
      <motion.div 
        className={`p-3 rounded-xl transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#0A2647]/30 to-[#971C1C]/30'
            : 'bg-gradient-to-br from-[#0A2647]/20 to-[#971C1C]/20'
        }`}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className={`w-5 h-5 ${
          theme === 'dark' 
            ? 'text-[#FFEFD6] group-hover:text-[#971C1C]'
            : 'text-[#0A2647] group-hover:text-[#971C1C]'
        } transition-colors`} />
      </motion.div>
      
      {link ? (
        <a 
          href={link}
          className={`text-sm ${
            theme === 'dark' 
              ? 'text-[#FFEFD6]/80 hover:text-[#971C1C]' 
              : 'text-[#0A2647]/80 hover:text-[#971C1C]'
          } transition-colors`}
        >
          {text}
        </a>
      ) : (
        <span className={`text-sm ${
          theme === 'dark' 
            ? 'text-[#FFEFD6]/80' 
            : 'text-[#0A2647]/80'
        }`}>
          {text}
        </span>
      )}
    </motion.div>
  );
};

export default ContactInfo;