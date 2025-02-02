import React from 'react';
import { Head } from '@inertiajs/react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';

const CommunityService = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();

  // Smooth scroll animations
  const headerY = useSpring(
    useTransform(scrollY, [0, 300], [0, -50]),
    { stiffness: 100, damping: 30 }
  );

  // Modern fade and slide animations
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Subtle hover effect
  const hoverScale = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Modern background decoration
  const floatingShapes = {
    animate: {
      y: [-10, 10],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <AppLayout>
      <Head title={t("Community Service - SDG's Center Unsoed")} />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#1B3A5B] dark:to-[#132A43] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-200/10 to-pink-200/10 rounded-full blur-3xl"
            variants={floatingShapes}
            animate="animate"
          />
          <motion.div 
            className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-tr from-blue-200/10 to-teal-200/10 rounded-full blur-3xl"
            variants={floatingShapes}
            animate="animate"
            transition={{ delay: 1 }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <motion.div 
                className="text-center lg:text-left"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-8 leading-tight"
                  style={{ y: headerY }}
                >
                  {t('community.title')}
                </motion.h1>
                <motion.p 
                  className="text-xl text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed mb-8"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  {t('community.description')}
                </motion.p>
                
                {/* Modern decorative line */}
                <motion.div 
                  className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 hidden lg:block"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 96, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </motion.div>

              {/* Hero Illustration */}
              <motion.div
                variants={hoverScale}
                whileHover="hover"
                className="relative"
              >
                {/* Decorative background for illustration */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <img
                  src="/assets/community.svg"
                  alt="Community Service"
                  className="w-full h-full object-contain relative z-10"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="relative py-24">
          <motion.div
            className="container mx-auto px-4 sm:px-6 lg:px-8"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-8">
                {t('community.programs.title')}
              </h2>
              <p className="text-lg md:text-xl text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 leading-relaxed">
                {t('community.programs.description')}
              </p>
              
              {/* Modern decorative element */}
              <motion.div 
                className="h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mx-auto mt-8"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 96, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>

            {/* KKN Program */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={contentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-4">
                  {t('community.kkn.title')}
                </h3>
                <p className="text-lg text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 leading-relaxed">
                  {t('community.kkn.description')}
                </p>
              </motion.div>
              
              <motion.div
                variants={hoverScale}
                whileHover="hover"
                className="relative"
              >
                {/* Decorative background for KKN illustration */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-teal-100/20 dark:from-blue-900/20 dark:to-teal-900/20 rounded-3xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <img
                  src="/assets/kkn.jpeg"
                  alt="KKN Program"
                  className="w-full h-auto relative z-10"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer with fade-in animation */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Footer />
        </motion.div>
      </main>
    </AppLayout>
  );
};

export default CommunityService;