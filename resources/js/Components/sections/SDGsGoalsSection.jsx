// resources/js/Components/sections/SDGsGoalsSection.jsx 
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Info, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

const SDGsGoalsSection = ({ isPreview = true }) => {
  const { t } = useTranslation();

  // Determine how many goals to show based on isPreview
  const goalsToShow = isPreview ? 6 : 17;

  return (
    <section className="relative py-24 overflow-hidden bg-gray-50 dark:bg-[#1B3A5B]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3]/5 to-[#B94D4D]/5 
          dark:from-[#1B3A5B] dark:to-[#132A43] transition-colors duration-300" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#B94D4D/5,transparent_50%)]" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full 
            bg-[#B94D4D]/10 text-[#B94D4D] dark:text-[#F5E6D3] mb-6
            border border-[#B94D4D]/20 backdrop-blur-sm">
            <Info className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">UN SDGs</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6">
            {t('sdgs.title')}
          </h2>
          
          <p className="text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 text-lg leading-relaxed">
            {t('sdgs.description')}
          </p>
        </motion.div>

        {/* Goals Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Array.from({ length: goalsToShow }, (_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative p-6 bg-white dark:bg-[#132A43]/50 rounded-xl
                border border-gray-100 dark:border-white/10 hover:border-[#B94D4D]/20 
                dark:hover:border-white/20 transition-all duration-300
                shadow-sm hover:shadow-md backdrop-blur-sm">
                {/* Goal Number */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#1B3A5B]/5 dark:bg-[#F5E6D3]/5
                    flex items-center justify-center text-lg font-bold
                    text-[#1B3A5B] dark:text-[#F5E6D3]">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1B3A5B] dark:text-[#F5E6D3]">
                    {t(`sdgs.goals.${i + 1}.title`)}
                  </h3>
                </div>

                <p className="text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 text-sm leading-relaxed">
                  {t(`sdgs.goals.${i + 1}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA - Only show in preview mode */}
        {isPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <Link
              href={route('about.sdgs')}
              className="inline-flex items-center px-6 py-3 rounded-lg
                bg-[#B94D4D] hover:bg-[#B94D4D]/90 text-white
                transition-colors duration-300"
            >
              {t('sdgs.view_all')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SDGsGoalsSection;