import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const Copyright = ({ theme, t }) => (
  <motion.div 
    className={`mt-16 pt-8 border-t ${
      theme === 'dark' 
        ? 'border-[#FFEFD6]/20 text-[#FFEFD6]/70' 
        : 'border-[#0A2647]/10 text-[#0A2647]/70'
    }`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.7 }}
  >
    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
      <p className="text-sm text-center">
        © {new Date().getFullYear()} Ahmad Rian S.R . {t('footer.copyright.rights')}
      </p>
    </div>
  </motion.div>
);

export default Copyright;