import React from 'react';
import { useTheme } from '@/Contexts/ThemeContext';

const GradientBorder = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className="relative group">
      <div className={`absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-[#0A2647]/40 via-[#971C1C]/30 to-[#144272]/40'
          : 'bg-gradient-to-br from-[#0A2647]/30 via-[#971C1C]/20 to-[#144272]/30'
      }`} />
      
      <div className={`relative rounded-xl backdrop-blur-sm ${
        theme === 'dark'
          ? 'bg-[#0A2647]/90 border-[#FFEFD6]/20'
          : 'bg-white/90 border-[#0A2647]/10'
      } p-6 border transition-all duration-500 hover:border-[#971C1C]/30`}>
        {children}
      </div>
    </div>
  );
};

export default GradientBorder;