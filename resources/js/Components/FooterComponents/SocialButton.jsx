import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/Contexts/ThemeContext';

const SocialButton = ({ href, label, imgSrc }) => {
  const { theme } = useTheme();
  
  return (
    <motion.a
      href={href}
      className={`group relative p-3.5 rounded-xl backdrop-blur-sm ${
        theme === 'dark' 
          ? 'bg-[#0A2647]/30 hover:bg-[#0A2647]/40' 
          : 'bg-[#0A2647]/5 hover:bg-[#0A2647]/10'
      } border ${
        theme === 'dark'
          ? 'border-[#FFEFD6]/10 hover:border-[#971C1C]/30'
          : 'border-[#0A2647]/10 hover:border-[#971C1C]/30'
      } transition-all duration-300`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative z-10 flex flex-col items-center gap-2">
        <motion.img 
          src={imgSrc} 
          alt={label}
          className={`w-5 h-5 ${
            theme === 'dark' 
              ? 'opacity-80 group-hover:opacity-100' 
              : 'opacity-70 group-hover:opacity-100'
          } transition-opacity duration-300`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        />
        <span className={`text-xs font-medium ${
          theme === 'dark' 
            ? 'text-[#FFEFD6]/80 group-hover:text-[#FFEFD6]' 
            : 'text-[#0A2647]/80 group-hover:text-[#0A2647]'
        } transition-colors duration-300`}>
          {label}
        </span>
      </div>

      {/* Subtle hover effect overlay */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#FFEFD6] to-[#971C1C]'
          : 'bg-gradient-to-br from-[#0A2647] to-[#971C1C]'
      }`} />
    </motion.a>
  );
};

export default SocialButton;