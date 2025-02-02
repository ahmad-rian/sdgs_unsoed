// resources/js/Pages/Expert/Index.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';

const ExpertCard = ({ expert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#132A43] 
        shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={expert.image}
            alt={expert.name}
            className="w-full h-full object-cover object-center
              group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-1">
            {expert.name}
          </h3>
          <p className="text-[#F5E6D3] text-sm mb-3">
            {expert.position}
          </p>
          <p className="text-[#F5E6D3]/80 text-sm mb-4">
            {expert.expertise}
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {Object.entries(expert.social).map(([platform, link]) => (
              <a
                key={platform} // Menambahkan key agar unik di setiap elemen
                href={link}
                className="text-white/70 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {platform === 'linkedin' && <Linkedin className="w-5 h-5" />}
                {platform === 'twitter' && <Twitter className="w-5 h-5" />}
                {platform === 'email' && <Mail className="w-5 h-5" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Expert = ({ experts }) => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <Head title={t("Our Experts - SDG's Center Unsoed")} />

      <main className="min-h-screen bg-gray-50 dark:bg-[#1B3A5B]">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6">
                {t('expert.title')}
              </h1>
              <p className="text-xl text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed">
                {t('expert.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Experts Grid */}
        <section className="py-24 bg-white/80 dark:bg-[#132A43]/80 backdrop-blur-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {experts.map((expert, index) => (
                <ExpertCard key={expert.id} expert={expert} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AppLayout>
  );
};

export default Expert;
