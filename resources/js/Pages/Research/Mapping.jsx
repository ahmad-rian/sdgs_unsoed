import React from 'react';
import { Head } from '@inertiajs/react';
import { Search, BookOpen, Microscope, LineChart, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';

const ResearchMapping = () => {
  const { t } = useTranslation();

  const researchAreas = [
    {
      icon: Search,
      title: t('research.areas.exploration.title'),
      description: t('research.areas.exploration.description'),
      color: '#4EA8DE'
    },
    {
      icon: Microscope,
      title: t('research.areas.innovation.title'),
      description: t('research.areas.innovation.description'),
      color: '#B94D4D'
    },
    {
      icon: LineChart,
      title: t('research.areas.analysis.title'),
      description: t('research.areas.analysis.description'),
      color: '#65B741'
    },
    {
      icon: Network,
      title: t('research.areas.collaboration.title'),
      description: t('research.areas.collaboration.description'),
      color: '#FFB534'
    }
  ];

  return (
    <AppLayout>
      <Head title={t('research.mapping.meta.title')} />

      <div className="flex flex-col min-h-screen w-full bg-white dark:bg-[#1B3A5B]">
        {/* Hero Section - Full Screen Height */}
        <section className="relative min-h-screen flex items-center">
          {/* Background Patterns - Made Responsive */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-1/4 w-1/2 aspect-square bg-blue-100/30 dark:bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 aspect-square bg-red-100/30 dark:bg-red-500/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Text Content - Made More Responsive */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-2xl mx-auto lg:mx-0 mt-16 lg:mt-0"
              >
                <motion.h1 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1B3A5B] dark:text-white 
                    leading-tight mb-6 lg:mb-8 text-center lg:text-left"
                >
                  {t('research.mapping.title')}
                </motion.h1>
                
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-base sm:text-lg xl:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                  style={{
                    textAlign: 'justify',
                    textJustify: 'inter-word',
                    hyphens: 'auto'
                  }}
                >
                  {t('research.mapping.description')}
                </motion.p>
              </motion.div>

              {/* Illustration - Made More Responsive */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative flex items-center justify-center lg:justify-end order-first lg:order-last"
              >
                <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                  <div className="relative aspect-square">
                    {/* Decorative Elements - Adjusted for Better Responsiveness */}
                    <motion.div
                      animate={{
                        scale: [1, 1.02, 1],
                        rotate: [0, -1, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 w-12 h-12 sm:w-16 sm:h-16 
                        bg-purple-100 dark:bg-purple-500/20 rounded-2xl"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                      className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-16 h-16 sm:w-20 sm:h-20 
                        bg-blue-100 dark:bg-blue-500/20 rounded-full"
                    />
                    
                    {/* Main Illustration - Improved Responsive Sizing */}
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative z-10 w-full h-full p-4"
                    >
                      <img
                        src="/assets/research.svg"
                        alt="Research Illustration"
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Research Areas Section - Made More Responsive */}
        <section className="w-full py-16 lg:py-24 bg-gray-50/80 dark:bg-[#132A43]/80">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group h-full"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="h-full p-6 lg:p-8 bg-white dark:bg-[#1B3A5B]/50 rounded-2xl
                      border border-gray-100 dark:border-gray-700/50
                      shadow-lg shadow-gray-100/20 dark:shadow-none
                      hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-none
                      transition-all duration-300"
                  >
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl mb-6 flex items-center justify-center"
                      style={{ backgroundColor: `${area.color}15` }}>
                      <area.icon className="w-6 h-6 lg:w-8 lg:h-8" style={{ color: area.color }} />
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold text-[#1B3A5B] dark:text-white mb-3">
                      {area.title}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
                      {area.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </AppLayout>
  );
};

export default ResearchMapping;