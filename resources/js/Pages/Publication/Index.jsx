import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Book, FileText, Target, Share2 } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';

const Publication = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState('100vh');

  // Update window height on resize for proper full-screen display
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(`${window.innerHeight}px`);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Parallax effect for background elements
  const bgParallax = useTransform(scrollY, [0, 1000], [0, -150]);

  // Smooth fade in animations
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
      <Head title={t("Publications - SDG's Center Unsoed")} />

      <main className="bg-gradient-to-b from-gray-50 to-white dark:from-[#1B3A5B] dark:to-[#132A43] overflow-x-hidden">
        {/* Hero Section - Full Screen */}
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
              {/* Text Content - Responsive with improved alignment */}
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
>
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: "100px" }}
    className="h-1 bg-gradient-to-r from-[#B94D4D] to-[#F5E6D3] mb-8 mx-auto lg:mx-0"
    transition={{ duration: 0.8, delay: 0.2 }}
  />
  <motion.div className="space-y-6">
    <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] leading-tight tracking-tight">
      <span className="inline-block">{t('publication.title')}</span>
    </h1>
    <div className="relative">
      <p className="text-lg sm:text-xl text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed 
        max-w-xl mx-auto lg:mx-0 text-justify hyphens-auto
        after:content-[''] after:block after:h-px after:w-full after:bg-gradient-to-r 
        after:from-transparent after:via-[#B94D4D]/20 after:to-transparent after:mt-8"
      >
        {t('publication.description')}
      </p>
    </div>
  </motion.div>
</motion.div>

              {/* SVG Illustration - Responsive */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative max-w-2xl mx-auto w-full"
              >
                {/* Floating Background Elements */}
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

                {/* Main SVG with floating animation */}
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
                    src="/assets/publication.svg"
                    alt="Publication Illustration"
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Activities Section - Full Width */}
        <section className="relative py-24 sm:py-32 bg-white/50 dark:bg-[#132A43]/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16 sm:mb-24"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6">
                {t('publication.mapping.title')}
              </h2>
              <p className="text-lg sm:text-xl text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 leading-relaxed">
                {t('publication.mapping.description')}
              </p>
            </motion.div>

            {/* Activity Cards - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {['course', 'ownership', 'priorities', 'internalization'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-white/70 dark:bg-[#1B3A5B]/70 rounded-2xl p-6 sm:p-8
                    backdrop-blur-sm border border-gray-100 dark:border-[#F5E6D3]/10
                    hover:shadow-lg transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#B94D4D]/10 to-[#F5E6D3]/10 
                      flex items-center justify-center mb-6 group-hover:from-[#B94D4D]/20 group-hover:to-[#F5E6D3]/20"
                  >
                    <div className="text-[#B94D4D] dark:text-[#F5E6D3]">
                      {item === 'course' && <Book className="w-6 h-6 sm:w-7 sm:h-7" />}
                      {item === 'ownership' && <FileText className="w-6 h-6 sm:w-7 sm:h-7" />}
                      {item === 'priorities' && <Target className="w-6 h-6 sm:w-7 sm:h-7" />}
                      {item === 'internalization' && <Share2 className="w-6 h-6 sm:w-7 sm:h-7" />}
                    </div>
                  </motion.div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1B3A5B] dark:text-[#F5E6D3] mb-4">
                    {t(`publication.activities.${item}.title`)}
                  </h3>
                  <p className="text-base sm:text-lg text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70">
                    {t(`publication.activities.${item}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer/>
      </main>
    </AppLayout>
  );
};

export default Publication;