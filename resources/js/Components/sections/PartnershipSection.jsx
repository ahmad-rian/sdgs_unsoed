
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PartnershipSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white dark:bg-[#132A43] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3]/5 to-[#B94D4D]/5 
          dark:from-[#1B3A5B]/50 dark:to-[#132A43]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#B94D4D/5,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6">
            {t('partnerships.title')}
          </h2>
          <p className="text-lg md:text-xl text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed">
            {t('partnerships.description')}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {/* Partner Logo Placeholders - Will be replaced with actual logos */}
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-[#1B3A5B] rounded-xl p-6 shadow-lg
                hover:shadow-xl transition-all duration-300
                group hover:-translate-y-1"
            >
              <div className="aspect-square rounded-lg overflow-hidden
                bg-white/50 dark:bg-[#F5E6D3]/5 
                flex items-center justify-center
                border border-gray-200 dark:border-[#F5E6D3]/10
                group-hover:border-[#B94D4D]/20 transition-colors duration-300"
              >
                {/* Partner Logo will go here */}
                <div className="text-[#B94D4D] text-sm">Partner Logo</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {t('partnerships.categories', { returnObjects: true }).map((category, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-sm
                  bg-[#1B3A5B]/5 dark:bg-[#F5E6D3]/5
                  text-[#1B3A5B] dark:text-[#F5E6D3]
                  border border-[#1B3A5B]/10 dark:border-[#F5E6D3]/10"
              >
                {category}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnershipSection;