import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';

const Others = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState('100vh');

  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(`${window.innerHeight}px`);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const bgParallax = useTransform(scrollY, [0, 1000], [0, -150]);

  const fadeInUp = {
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

  return (
    <AppLayout>
      <Head title={t("Other Activities - SDG's Center Unsoed")} />

      <main className="bg-gradient-to-b from-gray-50 to-white dark:from-[#1B3A5B] dark:to-[#132A43] overflow-x-hidden">
        {/* Hero Section */}
        <section 
          className="relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: windowHeight }}
        >
          {/* Dynamic Background */}
          <motion.div
            className="absolute inset-0 opacity-50"
            style={{ y: bgParallax }}
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(185,77,77,0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(185,77,77,0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 20%, rgba(185,77,77,0.05) 0%, transparent 50%)',
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl mx-auto lg:mx-0"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100px" }}
                  className="h-1 bg-gradient-to-r from-[#B94D4D] to-[#F5E6D3] mb-8 mx-auto lg:mx-0"
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.div className="space-y-6">
                  <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] leading-tight tracking-tight">
                    {t('others.title')}
                  </h1>
                  <div className="relative">
                    <p className="text-base sm:text-lg text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed text-justify hyphens-auto
                      after:content-[''] after:block after:h-px after:w-full after:bg-gradient-to-r 
                      after:from-transparent after:via-[#B94D4D]/20 after:to-transparent after:mt-8"
                    >
                      {t('others.description')}
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Hero Illustration */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative max-w-2xl mx-auto w-full"
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#B94D4D]/10 rounded-full blur-2xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#F5E6D3]/10 rounded-full blur-2xl" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10 w-full h-full px-4 sm:px-0"
                >
                  <img
                    src="/assets/others.svg"
                    alt="Other Activities Illustration"
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        

        <Footer />
      </main>
    </AppLayout>
  );
};

export default Others