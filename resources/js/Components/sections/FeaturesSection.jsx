import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Users, Sparkles, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FutureSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Globe2,
      title: t('future.features.global.title'),
      description: t('future.features.global.description')
    },
    {
      icon: Users,
      title: t('future.features.collaboration.title'),
      description: t('future.features.collaboration.description')
    },
    {
      icon: Sparkles,
      title: t('future.features.innovation.title'),
      description: t('future.features.innovation.description')
    },
    {
      icon: Target,
      title: t('future.features.action.title'),
      description: t('future.features.action.description')
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-gray-100 dark:bg-[#1B3A5B] transition-colors duration-300">
      {/* Background Patterns */}
      <div className="absolute inset-0">
        {/* Light mode patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3]/50 to-[#B94D4D]/5 
          opacity-60 dark:opacity-0 transition-opacity duration-300" />
        
        {/* Dark mode patterns */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1B3A5B_0%,#132A43_100%)] 
            opacity-0 dark:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#B94D4D/10,transparent_50%)] 
            opacity-0 dark:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-8 
            transition-colors duration-300">
            {t('future.title')}
          </h2>
          <p className="text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 text-lg leading-relaxed 
            transition-colors duration-300">
            {t('future.description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="group"
            >
              {/* Card */}
              <div className="relative h-full p-6 bg-white/80 dark:bg-[#132A43]/50 rounded-2xl 
                shadow-lg dark:shadow-none border border-[#F5E6D3]/20 
                hover:border-[#B94D4D]/20 dark:border-[#F5E6D3]/10 
                dark:hover:border-[#F5E6D3]/20 transition-all duration-300 backdrop-blur-sm">
                {/* Icon */}
                <div className="w-14 h-14 mb-6 rounded-xl flex items-center justify-center
                  bg-gradient-to-br from-[#F5E6D3]/20 to-[#B94D4D]/10
                  dark:from-[#1B3A5B]/80 dark:to-[#132A43]/80 
                  group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-[#B94D4D] dark:text-[#F5E6D3]
                    transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-[#1B3A5B] dark:text-[#F5E6D3] mb-4 
                  transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 text-sm leading-relaxed 
                  transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default FutureSection;