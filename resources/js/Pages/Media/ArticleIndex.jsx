import React, { useState, useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';
import { format } from 'date-fns';

// Enhanced ArticleCard with better hover effects
const ArticleCard = ({ article, index }) => {
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
            src={article?.compressed_image ? `/storage/${article.compressed_image}` : (article?.image ? `/storage/${article.image}` : '/images/placeholder-article.jpg')}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x400?text=Article';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Reading time badge */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {Math.max(1, Math.ceil(article.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length / 200))} min
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-3 text-xs text-[#1B3A5B]/60 dark:text-[#F5E6D3]/60 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(article.created_at), 'MMM d, yyyy')}</span>
            </div>
          </div>
          
          <h3 className="text-base font-semibold text-[#1B3A5B] dark:text-[#F5E6D3] mb-2 line-clamp-2 group-hover:text-[#B94D4D] transition-colors">
            {article.title}
          </h3>
          
          <p className="text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 text-sm mb-3 line-clamp-2 flex-1">
            {article.content.replace(/<[^>]*>?/gm, '')}
          </p>

          <Link
            href={route('media.article.show', article.id)}
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

// Modern Auto-sliding featured articles carousel
const ArticleCarousel = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const totalSlides = articles.length;
  const carouselRef = useRef(null);

  // Auto-slide effect
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      }, 6000); // Change slide every 6 seconds
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalSlides, isAutoPlaying]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  };

  // Progress bar for each slide
  const ProgressBar = ({ index }) => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      let animationFrame;
      let startTime = null;
      const duration = 6000; // Match with the interval time
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const newProgress = Math.min(elapsed / duration * 100, 100);
        
        setProgress(currentIndex === index ? newProgress : 0);
        
        if (elapsed < duration && currentIndex === index) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      if (currentIndex === index && isAutoPlaying) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setProgress(index === currentIndex ? 100 : 0);
      }
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [currentIndex, index, isAutoPlaying]);
    
    return (
      <div 
        className={`h-1 rounded-full overflow-hidden flex-1 cursor-pointer ${
          index === currentIndex ? 'bg-white/30' : 'bg-white/10'
        }`}
        onClick={() => goToSlide(index)}
      >
        <div 
          className="h-full bg-white rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-[#132A43] shadow-md" ref={carouselRef}>
      {/* Main Carousel with preferred height dimensions */}
      <div className="relative aspect-[21/10] sm:aspect-[21/9] md:aspect-[21/8] overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={articles[currentIndex]?.compressed_image 
                ? `/storage/${articles[currentIndex].compressed_image}` 
                : (articles[currentIndex]?.image 
                  ? `/storage/${articles[currentIndex].image}` 
                  : '/images/placeholder-article.jpg')}
              alt={articles[currentIndex].title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/1200x600?text=Article';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-6 z-10"
          >
            <div className="flex items-center gap-3 text-xs text-white/80 mb-1 sm:mb-2">
              <span className="bg-[#B94D4D] px-2 py-0.5 rounded-sm text-white text-xs">
                Artikel Ilmiah
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(articles[currentIndex].created_at), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{Math.max(1, Math.ceil(articles[currentIndex].content.replace(/<[^>]*>?/gm, '').split(/\s+/).length / 200))} min</span>
              </div>
            </div>
            
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 line-clamp-2 max-w-2xl">
              {articles[currentIndex].title}
            </h2>
            
            <p className="text-white/80 text-xs mb-2 max-w-lg line-clamp-1 hidden sm:block">
              {articles[currentIndex].content.replace(/<[^>]*>?/gm, '').substring(0, 120)}
              {articles[currentIndex].content.replace(/<[^>]*>?/gm, '').length > 120 ? '...' : ''}
            </p>
            
            <Link
              href={route('media.article.show', articles[currentIndex].id)}
              className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-medium rounded-md transition-colors"
            >
              Baca selengkapnya
              <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1 duration-300" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white focus:outline-none opacity-0 md:opacity-70 hover:opacity-100 transition-opacity duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white focus:outline-none opacity-0 md:opacity-70 hover:opacity-100 transition-opacity duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Progress indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2 px-4 sm:px-6 md:px-8">
        {articles.map((_, index) => (
          <ProgressBar key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

// Improved ArticleIndex component
const ArticleIndex = ({ articles, featured_article = null }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Get top articles for carousel (including featured if available)
  const carouselArticles = [];
  if (featured_article) {
    carouselArticles.push(featured_article);
  }
  // Add more articles to carousel if needed
  const additionalArticles = articles.data.filter(a => 
    featured_article ? a.id !== featured_article.id : true
  ).slice(0, featured_article ? 4 : 5);
  
  carouselArticles.push(...additionalArticles);
  
  // Filter articles based on search term
  const filteredArticles = articles.data.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <Head title={t("Artikel - SDG's Center Unsoed")} />

      <main className="min-h-screen bg-gray-50 dark:bg-[#1B3A5B] pt-16">
        {/* Hero Section with Title */}
        <section className="relative py-8 overflow-hidden mt-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto mb-8"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-5">
                {t('media.articles.title', 'Artikel dan Jurnal')}
              </h1>
              <p className="text-lg text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed">
                {t('media.articles.description', 'Temukan artikel ilmiah dan jurnal terkait SDGs dari para peneliti dan akademisi kami.')}
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Articles Carousel */}
        <section className="pt-2 sm:pt-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleCarousel articles={carouselArticles} />
            
            {/* Enhanced Search Bar */}
            <div className="relative mt-6 max-w-xl mx-auto">
              <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-opacity ${isSearchFocused ? 'opacity-100' : 'opacity-70'}`}>
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full py-3 pl-10 pr-4 bg-white dark:bg-[#132A43] text-[#1B3A5B] dark:text-[#F5E6D3] rounded-lg shadow-sm border border-transparent focus:border-[#B94D4D]/30 focus:outline-none focus:ring-1 focus:ring-[#B94D4D] transition-all text-sm"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#B94D4D] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-[#1B3A5B] dark:text-[#F5E6D3]">
                Semua Artikel
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
            
            {filteredArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {filteredArticles.map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>
                
                {/* Enhanced Pagination */}
                {articles.links && articles.links.length > 3 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {articles.links.map((link, key) => {
                        let label = link.label;
                        if (label === '&laquo; Previous') label = '«';
                        if (label === 'Next &raquo;') label = '»';
                        
                        return link.url === null ? (
                          <span
                            key={key}
                            className="w-9 h-9 flex items-center justify-center text-xs text-gray-400 bg-gray-100 dark:bg-[#132A43]/50 dark:text-gray-500 rounded-md cursor-not-allowed"
                            dangerouslySetInnerHTML={{
                              __html: label,
                            }}
                          />
                        ) : (
                          <Link
                            key={key}
                            href={link.url}
                            className={`w-9 h-9 flex items-center justify-center text-xs rounded-md transition-all duration-200 ${
                              link.active
                                ? 'bg-[#B94D4D] text-white shadow-sm shadow-[#B94D4D]/20'
                                : 'text-[#1B3A5B] dark:text-[#F5E6D3]/70 bg-white dark:bg-[#132A43] hover:bg-gray-100 dark:hover:bg-[#1B3A5B]/70 hover:scale-105'
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
                <h3 className="text-lg font-medium text-[#1B3A5B] dark:text-[#F5E6D3]">Tidak ada artikel ditemukan</h3>
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
        
        {/* Citation Guidelines Section */}
        <section className="py-12 bg-[#1B3A5B]/5 dark:bg-[#132A43]/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-3 text-center">
                Pedoman Sitasi
              </h2>
              <p className="text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 mb-6 text-center">
                Gunakan format berikut untuk mengutip artikel dari SDG's Center.
              </p>
              
              <div className="bg-white dark:bg-[#132A43] p-4 rounded-lg shadow-sm border border-gray-100 dark:border-[#1B3A5B]/50">
                <h3 className="font-medium text-[#1B3A5B] dark:text-[#F5E6D3] mb-2">Format APA</h3>
                <p className="text-sm text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 mb-4 font-mono p-3 bg-gray-50 dark:bg-[#1B3A5B]/30 rounded border border-gray-100 dark:border-[#1B3A5B]">
                  Penulis, A. A. (Tahun). Judul artikel. <em>SDG's Center Universitas Jenderal Soedirman</em>. URL
                </p>
                
                <h3 className="font-medium text-[#1B3A5B] dark:text-[#F5E6D3] mb-2">Format MLA</h3>
                <p className="text-sm text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 font-mono p-3 bg-gray-50 dark:bg-[#1B3A5B]/30 rounded border border-gray-100 dark:border-[#1B3A5B]">
                  Penulis. "Judul Artikel." <em>SDG's Center Universitas Jenderal Soedirman</em>, Tahun, URL.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </AppLayout>
  );
};

export default ArticleIndex;