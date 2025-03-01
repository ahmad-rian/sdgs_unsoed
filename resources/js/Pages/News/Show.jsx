// resources/js/Pages/News/Show.jsx
import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';
import { format } from 'date-fns';

// Improved related news card with better hover effects
const RelatedNewsCard = ({ news }) => {
  return (
    <div className="group overflow-hidden rounded-xl bg-white dark:bg-[#132A43] shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="sm:w-1/3 relative aspect-video sm:aspect-square overflow-hidden">
          <img
            src={news?.thumbnail ? `/storage/${news.thumbnail}` : '/images/placeholder-news.jpg'}
            alt={news.title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x400?text=News';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="sm:w-2/3 p-4 flex flex-col">
          <div className="flex items-center gap-3 text-xs text-[#1B3A5B]/60 dark:text-[#F5E6D3]/60 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {news.published_at ? format(new Date(news.published_at), 'MMM d, yyyy') : format(new Date(news.created_at), 'MMM d, yyyy')}
            </span>
          </div>
          
          <h3 className="text-base font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-2 line-clamp-2 group-hover:text-[#B94D4D] transition-colors">
            {news.title}
          </h3>
          
          
        </div>
      </div>
    </div>
  );
};

// Enhanced NewsShow component with improved UI and responsiveness
const NewsShow = ({ news, related_news = [] }) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Pastikan konten tidak undefined/null
  const safeContent = news.content || '';
  
  // Calculate reading time (approx. 200 words per minute)
  const wordCount = safeContent.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Format tanggal yang konsisten
  const publishDate = news.published_at 
    ? new Date(news.published_at) 
    : new Date(news.created_at);

  // Share functionality - Copy URL to clipboard
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        // You can optionally add a toast notification here
        alert('URL artikel telah disalin ke clipboard!');
      })
      .catch((error) => {
        console.error('Gagal menyalin URL: ', error);
      });
  };

  return (
    <AppLayout>
      <Head title={`${news.title} - SDG's Center Unsoed`}>
        <meta name="description" content={news.meta_description || safeContent.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
        <meta name="keywords" content={news.keywords || ''} />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.meta_description || safeContent.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
        <meta property="og:image" content={news?.compressed_image ? `/storage/${news.compressed_image}` : (news?.image ? `/storage/${news.image}` : '/images/placeholder-featured.jpg')} />
        <meta property="og:url" content={window.location.href} />
      </Head>

      {/* Fixed Navigation Bar - Appears when scrolling */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            initial={{ y: -100 }} 
            animate={{ y: 0 }} 
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#1B3A5B]/90 backdrop-blur-md shadow-md py-3"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <Link 
                href={route('news.index')} 
                className="flex items-center text-sm font-medium text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 hover:text-[#B94D4D] dark:hover:text-[#B94D4D] transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Kembali
              </Link>
              
              <h2 className="text-sm sm:text-base font-semibold text-[#1B3A5B] dark:text-[#F5E6D3] line-clamp-1 max-w-md mx-4">
                {news.title}
              </h2>
              
              <button 
                onClick={handleShare}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-[#132A43] text-[#1B3A5B] dark:text-[#F5E6D3] hover:bg-[#B94D4D]/10 hover:text-[#B94D4D] transition-colors"
                title="Salin URL artikel"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-gray-50 dark:bg-[#1B3A5B] pt-8 md:pt-12">
        {/* Article Header */}
        <section className="relative py-8 md:py-12 mb-6 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Back Button - Now with more spacing from top for navbar */}
              <Link 
                href={route('news.index')} 
                className="inline-flex items-center mb-8 text-sm font-medium text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 hover:text-[#B94D4D] dark:hover:text-[#B94D4D] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Berita
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6 leading-tight">
                  {news.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 mb-8">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{format(publishDate, 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{news.author || 'Admin'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} menit baca</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Image */}
        <section className="py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-10 shadow-lg"
              >
                <img
                  src={news?.compressed_image ? `/storage/${news.compressed_image}` : (news?.image ? `/storage/${news.image}` : '/images/placeholder-featured.jpg')}
                  alt={news.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/1200x600?text=News+Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="inline-flex items-center rounded-full bg-[#B94D4D] px-3 py-1 text-xs text-white">
                    SDG's News
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Article Content */}
        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.article
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="prose prose-lg max-w-none dark:prose-invert 
                  prose-headings:text-[#1B3A5B] dark:prose-headings:text-[#F5E6D3]
                  prose-p:text-[#1B3A5B]/80 dark:prose-p:text-[#F5E6D3]/80
                  prose-a:text-[#B94D4D] prose-a:no-underline hover:prose-a:text-[#943D3D]
                  prose-strong:text-[#1B3A5B] dark:prose-strong:text-[#F5E6D3]
                  prose-img:rounded-xl
                  prose-blockquote:border-l-[#B94D4D] prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-[#132A43]/50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
              >
                {/* Jika konten dalam bentuk HTML */}
                {safeContent.includes('<') && safeContent.includes('>') ? (
                  <div dangerouslySetInnerHTML={{ __html: safeContent }} />
                ) : (
                  // Jika konten dalam bentuk plain text
                  safeContent.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                )}
              </motion.article>
              
              
              
              {/* Tags */}
              {news.keywords && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {news.keywords.split(',').map((keyword, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 dark:bg-[#132A43] text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 text-sm rounded-full hover:bg-[#B94D4D]/10 hover:text-[#B94D4D] transition-colors cursor-pointer"
                    >
                      #{keyword.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Related News */}
        {related_news && related_news.length > 0 && (
          <section className="py-12 bg-white/80 dark:bg-[#132A43]/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6 flex items-center">
                  <span className="w-6 h-1 bg-[#B94D4D] rounded-full mr-3"></span>
                  {t('news.related', 'Artikel Terkait')}
                </h2>
                
                <div className="grid gap-6">
                  {related_news.map((relatedNews) => (
                    <RelatedNewsCard key={relatedNews.id} news={relatedNews} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </AppLayout>
  );
};

export default NewsShow;