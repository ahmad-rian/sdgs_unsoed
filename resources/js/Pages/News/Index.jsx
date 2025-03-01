import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Clock } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';
import { format } from 'date-fns';

// Enhanced NewsCard with elegant hover effects
const NewsCard = ({ news, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group h-full"
    >
      <div className="overflow-hidden rounded-xl bg-white dark:bg-[#132A43] shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={news?.thumbnail ? `/storage/${news.thumbnail}` : '/images/placeholder-news.jpg'}
            alt={news.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x400?text=News';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-3 text-xs text-[#1B3A5B]/60 dark:text-[#F5E6D3]/60 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{news.published_at ? format(new Date(news.published_at), 'MMM d, yyyy') : format(new Date(news.created_at), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{Math.max(1, Math.ceil(news.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length / 200))} min</span>
            </div>
          </div>
          
          <h3 className="text-base font-semibold text-[#1B3A5B] dark:text-[#F5E6D3] mb-2 line-clamp-2 group-hover:text-[#B94D4D] transition-colors">
            {news.title}
          </h3>
          
          <p className="text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 text-sm mb-3 line-clamp-2 flex-1">
            {news.content.replace(/<[^>]*>?/gm, '')}
          </p>

          <Link
            href={route('news.show', news.slug)}
            className="inline-flex items-center text-xs font-medium text-[#B94D4D] hover:text-[#943D3D] transition-colors mt-auto"
          >
            Baca selengkapnya
            <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1 duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Auto-sliding hero carousel
const HeroCarousel = ({ heroSlides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const totalSlides = heroSlides.length;

  // Auto-slide effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalSlides]);

  // Progress bar for each slide
  const ProgressBar = ({ index }) => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      let animationFrame;
      let startTime = null;
      const duration = 5000; // Match with the interval time
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const newProgress = Math.min(elapsed / duration * 100, 100);
        
        setProgress(currentIndex === index ? newProgress : 0);
        
        if (elapsed < duration && currentIndex === index) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      if (currentIndex === index) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setProgress(0);
      }
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [currentIndex, index]);
    
    return (
      <div className="h-1 bg-white/20 rounded-full overflow-hidden flex-1">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-[#132A43] shadow-sm">
      {/* Slides container with reduced height */}
      <div 
        className="relative flex transition-transform duration-700 ease-out aspect-[21/10] sm:aspect-[21/9] md:aspect-[21/8]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {heroSlides.map((news, index) => (
          <div key={news.id} className="min-w-full h-full relative">
            <img
              src={news?.compressed_image ? `/storage/${news.compressed_image}` : (news?.image ? `/storage/${news.image}` : '/images/placeholder-news.jpg')}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/1200x600?text=News';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-6">
              <div className="flex items-center gap-3 text-xs text-white/80 mb-1 sm:mb-2">
                <span className="bg-[#B94D4D] px-2 py-0.5 rounded-sm text-white text-xs">
                  Terbaru
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{news.published_at ? format(new Date(news.published_at), 'MMM d, yyyy') : format(new Date(news.created_at), 'MMM d, yyyy')}</span>
                </div>
              </div>
              
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                {news.title}
              </h2>
              
              <p className="text-white/80 text-xs mb-2 max-w-2xl line-clamp-1 hidden sm:block">
                {news.content.replace(/<[^>]*>?/gm, '')}
              </p>
              
              <Link
                href={route('news.show', news.slug)}
                className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-medium rounded-md transition-colors"
              >
                Baca selengkapnya
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slide indicators with progress */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2 px-4 sm:px-6 md:px-8">
        {heroSlides.map((_, index) => (
          <ProgressBar key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

// Main News Component
const News = ({ all_news, featured_news = null }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get top news for hero carousel
  const heroSlides = all_news.data.slice(0, 5);
  
  // Filter news based on search term
  const filteredNews = all_news.data.filter(news => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (news.author && news.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

        return (
    <AppLayout>
      <Head title={t("Berita - SDG's Center Unsoed")} />

      <main className="min-h-screen bg-gray-50 dark:bg-[#1B3A5B] pt-16">
        {/* Hero Section with Title - KEPT FROM ORIGINAL with additional top margin */}
        <section className="relative py-8 overflow-hidden mt-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto mb-8"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-5">
                {t('news.title', 'Berita & Artikel Terbaru')}
              </h1>
              <p className="text-lg text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed">
                {t('news.description', 'Tetap terinformasi dengan berita terbaru, artikel, dan pembaruan tentang inisiatif dan proyek kami.')}
              </p>
            </motion.div>
          </div>
        </section>
            
        {/* Hero Carousel Section */}
        <section className="pt-2 sm:pt-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <HeroCarousel heroSlides={heroSlides} />
            
            {/* Search Bar */}
            <div className="relative mt-6 max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full py-3 pl-10 pr-4 bg-white dark:bg-[#132A43] text-[#1B3A5B] dark:text-[#F5E6D3] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#B94D4D] transition-all text-sm"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-[#1B3A5B] dark:text-[#F5E6D3]">
                Semua Berita
              </h2>
              
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs sm:text-sm text-[#B94D4D] hover:text-[#943D3D] transition-colors"
                >
                  Reset Pencarian
                </button>
              )}
            </div>
            
            {filteredNews.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {filteredNews.map((news, index) => (
                    <NewsCard key={news.id} news={news} index={index} />
                  ))}
                </div>
                
                {/* Simplified Pagination */}
                {all_news.links && all_news.links.length > 3 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {all_news.links.map((link, key) => {
                        let label = link.label;
                        if (label === '&laquo; Previous') label = '«';
                        if (label === 'Next &raquo;') label = '»';
                        
                        return link.url === null ? (
                          <span
                            key={key}
                            className="w-8 h-8 flex items-center justify-center text-xs text-gray-400 bg-gray-100 dark:bg-[#132A43]/50 dark:text-gray-500 rounded cursor-not-allowed"
                            dangerouslySetInnerHTML={{
                              __html: label,
                            }}
                          />
                        ) : (
                          <Link
                            key={key}
                            href={link.url}
                            className={`w-8 h-8 flex items-center justify-center text-xs rounded transition-colors ${
                              link.active
                                ? 'bg-[#B94D4D] text-white'
                                : 'text-[#1B3A5B] dark:text-[#F5E6D3]/70 bg-white dark:bg-[#132A43] hover:bg-gray-100 dark:hover:bg-[#1B3A5B]/70'
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: label,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-[#132A43] rounded-xl shadow-sm">
                <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-[#1B3A5B] dark:text-[#F5E6D3]">Tidak ada berita ditemukan</h3>
                <p className="text-[#1B3A5B]/60 dark:text-[#F5E6D3]/60 mt-1 text-sm max-w-md mx-auto">
                  Coba kata kunci pencarian lain
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-4 py-2 bg-[#B94D4D] hover:bg-[#943D3D] text-white text-xs font-medium rounded-md transition-colors"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </AppLayout>
  );
};

export default News;