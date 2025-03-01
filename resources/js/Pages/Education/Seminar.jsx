import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';

const Seminar = () => {
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
      <Head title={t("Seminar - SDG's Center Unsoed")} />

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
                    {t('seminar.title')}
                  </h1>
                  <div className="relative">
                    <p className="text-base sm:text-lg text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed text-justify hyphens-auto
                      after:content-[''] after:block after:h-px after:w-full after:bg-gradient-to-r 
                      after:from-transparent after:via-[#B94D4D]/20 after:to-transparent after:mt-8"
                    >
                      {t('seminar.description')}
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
                    src="/assets/seminar.svg"
                    alt="Seminar Illustration"
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        {/* <section className="py-24 bg-white/80 dark:bg-[#132A43]/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6">
                  {t('seminar.highlights.title')}
                </h2>
                <div className="space-y-4">
                  {['experts', 'interactive', 'insights', 'networking'].map((highlight) => (
                    <motion.div
                      key={highlight}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeInUp}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#B94D4D]/10 flex items-center justify-center">
                        <div className="w-6 h-6 text-[#B94D4D]">•</div>
                      </div>
                      <div>
                        <p className="text-lg text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80">
                          {t(`seminar.highlights.${highlight}`)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              
              <motion.div 
                className="relative lg:-translate-x-12"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative"
                  initial={{ rotate: 5 }}
                  whileHover={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/assets/seminar-highlights.svg"
                    alt="Seminar Highlights"
                    className="w-full h-full object-contain relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3]/10 to-[#B94D4D]/10 rounded-3xl transform -rotate-3 scale-95 -z-10" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section> */}

        {/* Topics Section */}
        <section className="py-24 bg-gray-50/80 dark:bg-[#1B3A5B]/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6">
                {t('seminar.topics.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['sustainability', 'implementation', 'innovation'].map((topic, index) => (
                <motion.div
                  key={topic}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white dark:bg-[#132A43] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-4">
                    {t(`seminar.topics.${topic}.title`)}
                  </h3>
                  <p className="text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80">
                    {t(`seminar.topics.${topic}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </AppLayout>
  );
};

export default Seminar;