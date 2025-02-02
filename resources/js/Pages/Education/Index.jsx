import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';

const Education = () => {
  const { t } = useTranslation();

  // Animation variants for improved transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <AppLayout>
      <Head title={t("Education - SDG's Center Unsoed")} />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#1B3A5B] dark:to-[#132A43]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/20" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Text Content */}
              <motion.div variants={itemVariants} className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-8 leading-tight">
                  Education for{' '}
                  <span className="whitespace-nowrap">Sustainable Development</span>
                </h1>
                <p className="text-xl md:text-2xl text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed text-justify">
                  {t('education.description')}
                </p>
              </motion.div>

              {/* Hero Illustration */}
              <motion.div
                variants={itemVariants}
                className="relative mx-auto lg:mx-0 w-full max-w-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative"
                  initial={{ rotate: -5 }}
                  whileHover={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/assets/education.svg"
                    alt="Education Illustration"
                    className="w-full h-full object-contain relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B94D4D]/10 to-[#F5E6D3]/10 rounded-3xl transform rotate-3 scale-95 -z-10" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Seminar Section */}
        <section className="py-24 bg-white/80 dark:bg-[#132A43]/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >

                {/* Seminar Illustration */}
              <motion.div 
                className="relative lg:translate-x-12"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative"
                  initial={{ rotate: -5 }}
                  whileHover={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/assets/seminar.svg"
                    alt="Seminar Activities"
                    className="w-full h-full object-contain relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B94D4D]/10 to-[#F5E6D3]/10 rounded-3xl transform rotate-3 scale-95 -z-10" />
                </motion.div>
              </motion.div>

              {/* Seminar Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6">
                  {t('education.seminar.title')}
                </h2>
                <p className="text-lg text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed mb-8">
                  {t('education.seminar.description')}
                </p>
              </div>

              
            </motion.div>
          </div>
        </section>

        {/* Workshop Section */}
        <section className="py-24 bg-gray-50/80 dark:bg-[#1B3A5B]/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Workshop Illustration - Moved to the right */}
              <motion.div 
                className="relative order-2"
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
                    src="/assets/workshop.svg"
                    alt="Workshop Activities"
                    className="w-full h-full object-contain relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3]/10 to-[#B94D4D]/10 rounded-3xl transform -rotate-3 scale-95 -z-10" />
                </motion.div>
              </motion.div>

              {/* Workshop Content - Moved to the left */}
              <div className="order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6">
                  {t('education.workshop.title')}
                </h2>
                <p className="text-lg text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed mb-8">
                  {t('education.workshop.description')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Course Section */}
        <section className="py-24 bg-white/80 dark:bg-[#132A43]/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >

                {/* Course Illustration */}
              <motion.div 
                className="relative lg:translate-x-12"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative"
                  initial={{ rotate: -5 }}
                  whileHover={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/assets/course.svg"
                    alt="Course Activities"
                    className="w-full h-full object-contain relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B94D4D]/10 to-[#F5E6D3]/10 rounded-3xl transform rotate-3 scale-95 -z-10" />
                </motion.div>
              </motion.div>
              
              {/* Course Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6">
                  {t('education.course.title')}
                </h2>
                <p className="text-lg text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed mb-8">
                  {t('education.course.description')}
                </p>
              </div>

              
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </AppLayout>
  );
};

export default Education;