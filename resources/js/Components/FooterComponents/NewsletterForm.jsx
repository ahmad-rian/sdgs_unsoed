import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/Contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const NewsletterForm = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <motion.form 
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative flex gap-2">
        <input 
          type="email" 
          placeholder={t('footer.connect.newsletter.placeholder')}
          className={`w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-[#0A2647]/30 text-[#FFEFD6] placeholder-[#FFEFD6]/50'
              : 'bg-[#0A2647]/5 text-[#0A2647] placeholder-[#0A2647]/50'
          } focus:outline-none focus:ring-2 focus:ring-[#971C1C]/30`}
          required
        />
        <motion.button
          type="submit"
          className={`relative px-4 py-2 rounded-xl overflow-hidden ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#0A2647] to-[#971C1C]'
              : 'bg-gradient-to-r from-[#0A2647] to-[#971C1C]'
          } hover:shadow-lg hover:shadow-[#971C1C]/20 transition-shadow duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowRight className={`w-5 h-5 ${
            theme === 'dark' 
              ? 'text-[#FFEFD6]' 
              : 'text-[#FFEFD6]'
          }`} />
        </motion.button>
      </div>
    </motion.form>
  );
};

export default NewsletterForm;