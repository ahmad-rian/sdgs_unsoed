import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';

const AboutUs = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState('100vh');

  // Dynamic height adjustment for true full screen
  useEffect(() => {
    const updateHeight = () => {
      // Adjust height calculation to account for mobile navigation
      const navHeight = window.innerWidth < 640 ? 64 : 0; // 64px for mobile nav
      setWindowHeight(`calc(${window.innerHeight}px - ${navHeight}px)`);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Parallax effect for background
  const bgParallax = useTransform(scrollY, [0, 1000], [0, -150]);

  // Enhanced animations
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <AppLayout>
      <Head title="About Us - SDG's Center Unsoed" />

      <main className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#1B3A5B] dark:to-[#152A43] overflow-hidden">
        {/* Full Screen Hero Section with Mobile Navigation Adjustment */}
        <section 
          className="relative flex items-center justify-center overflow-hidden pt-16 sm:pt-0"
          style={{ minHeight: windowHeight }}
        >
          {/* Dynamic Background with Parallax */}
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

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
            {/* Hero Title with enhanced animation */}
            <motion.div
              {...fadeInUp}
              className="text-center mb-12 lg:mb-20"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] tracking-tight leading-tight">
                {t('about.us.title')}
              </h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "96px" }}
                className="h-1 bg-gradient-to-r from-[#B94D4D] to-[#F5E6D3] mx-auto mt-6"
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Visual Content with enhanced styling */}
              <motion.div 
                {...fadeInLeft}
                className="relative max-w-2xl mx-auto lg:mx-0 w-full"
              >
                <div className="relative group rounded-2xl overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#B94D4D] to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500 animate-pulse"/>
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src="/assets/activity.jpeg"
                        alt="SDGs Center Activities"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-white text-lg sm:text-xl font-medium">
                        ratification of SDG's Center Unsoed
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Text Content with improved typography */}
              <motion.div
                {...fadeInRight}
                className="space-y-8 max-w-2xl mx-auto lg:mx-0"
              >
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg sm:text-xl text-[#1B3A5B] dark:text-[#F5E6D3] leading-relaxed text-justify hyphens-auto">
                    {t('about.us.description.first')}
                  </p>
                  
                  {/* Enhanced Quote Box */}
                  <div className="my-8 p-6 sm:p-8 bg-[#FDF5F5] dark:bg-[#2A4A6B] rounded-xl border-l-4 border-[#B94D4D] shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B94D4D]/5 to-transparent"/>
                    <p className="text-[#B94D4D] font-semibold text-lg sm:text-xl text-justify relative z-10">
                      {t('about.us.description.inauguration')}
                    </p>
                  </div>
                  
                  <p className="text-lg sm:text-xl text-[#1B3A5B] dark:text-[#F5E6D3] leading-relaxed text-justify hyphens-auto">
                    {t('about.us.description.second')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </AppLayout>
  );
};

export default AboutUs;