import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowLeft, Clock, ChevronLeft, Share2 } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import { useTranslation } from 'react-i18next';
import Footer from '@/Components/Footer';
import { format } from 'date-fns';

// Enhanced related article card
const RelatedArticleCard = ({ article }) => {
  return (
    <div className="group overflow-hidden rounded-lg bg-white dark:bg-[#132A43] shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="sm:w-1/3 relative aspect-video sm:aspect-square overflow-hidden">
          <img
            src={article?.compressed_image ? `/storage/${article.compressed_image}` : (article?.image ? `/storage/${article.image}` : '/images/placeholder-article.jpg')}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x400?text=Article';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="sm:w-2/3 p-3 flex flex-col">
          <div className="flex items-center gap-2 text-xs text-[#1B3A5B]/60 dark:text-[#F5E6D3]/60 mb-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(article.created_at), 'MMM d, yyyy')}</span>
            </div>
          </div>
          
          <h3 className="text-sm font-medium text-[#1B3A5B] dark:text-[#F5E6D3] mb-1 line-clamp-2 group-hover:text-[#B94D4D] transition-colors">
            {article.title}
          </h3>
          
          <Link
            href={route('media.article.show', article.id)}
            className="inline-flex items-center text-xs font-medium text-[#B94D4D] hover:text-[#943D3D] transition-colors mt-auto"
          >
            Baca artikel
            <ArrowLeft className="w-3 h-3 ml-1 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main article show component
const ArticleShow = ({ article, related_articles = [] }) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Pastikan konten tidak undefined/null
  const safeContent = article.content || '';
  
  // Calculate reading time (approx. 200 words per minute)
  const wordCount = safeContent.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Share functionality - Copy URL to clipboard
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('URL artikel telah disalin ke clipboard!');
      })
      .catch((error) => {
        console.error('Gagal menyalin URL: ', error);
      });
  };
  
  return (
    <AppLayout>
      <Head title={`${article.title} - SDG's Center Unsoed`}>
        <meta name="description" content={safeContent.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={safeContent.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
        <meta property="og:image" content={article?.compressed_image ? `/storage/${article.compressed_image}` : (article?.image ? `/storage/${article.image}` : '/images/placeholder-featured.jpg')} />
      </Head>

      <div className="pt-14 bg-gray-50 dark:bg-[#1B3A5B]">
        {/* Back Link - Fixed so it won't be covered by navbar */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              href={route('media.article.index')} 
              className="inline-flex items-center text-sm font-medium text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 hover:text-[#B94D4D] dark:hover:text-[#B94D4D] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Artikel
            </Link>
          </div>
        </div>
      </div>

      {/* Fixed Navigation Bar - Appears when scrolling */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            initial={{ y: -100 }} 
            animate={{ y: 0 }} 
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#1B3A5B]/90 backdrop-blur-md shadow-sm py-3"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <Link 
                href={route('media.article.index')} 
                className="flex items-center text-sm font-medium text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 hover:text-[#B94D4D] dark:hover:text-[#B94D4D] transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Kembali
              </Link>
              
              <h2 className="text-sm sm:text-base font-semibold text-[#1B3A5B] dark:text-[#F5E6D3] line-clamp-1 max-w-md mx-4">
                {article.title}
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

      <main className="min-h-screen bg-gray-50 dark:bg-[#1B3A5B]">
        {/* Article Header */}
        <section className="relative py-6 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-4 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(article.created_at), 'MMMM d, yyyy')}</span>
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
        
        {/* Featured Image - Responsive height */}
        <section className="relative mb-8">
          <div className="w-full aspect-video md:aspect-[21/9] lg:aspect-[21/8] relative overflow-hidden rounded-lg shadow-md mx-auto max-w-5xl">
            <img
              src={article?.compressed_image ? `/storage/${article.compressed_image}` : (article?.image ? `/storage/${article.image}` : '/images/placeholder-featured.jpg')}
              alt={article.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.src = 'https://placehold.co/1200x600?text=Article+Image';
              }}
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
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
                  prose-img:rounded-lg
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
              
              {/* Share Bar */}
              <div className="flex items-center justify-between mt-8 p-4 bg-gray-100 dark:bg-[#132A43] rounded-lg">
                <div className="text-sm text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70">
                  Bagikan artikel ini
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleShare}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-[#1B3A5B] text-[#1B3A5B] dark:text-[#F5E6D3] hover:bg-[#B94D4D] hover:text-white transition-colors"
                    title="Salin URL artikel"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <span id="share-tooltip" className="hidden opacity-0 absolute px-2 py-1 bg-gray-900 text-white text-xs rounded -mt-8 transition-opacity">
                    URL disalin!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action - Simplified and more elegant */}
        <section className="py-10 bg-[#B94D4D]/5 dark:bg-[#B94D4D]/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-3">
                Temukan lebih banyak artikel
              </h3>
              <p className="text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 mb-4 text-sm">
                Jelajahi artikel ilmiah dan jurnal terbaru kami tentang SDGs.
              </p>
              <Link
                href={route('media.article.index')}
                className="inline-flex items-center px-4 py-2 bg-[#B94D4D] hover:bg-[#943D3D] text-white text-sm font-medium rounded-lg transition-colors"
              >
                Lihat Semua Artikel
              </Link>
            </div>
          </div>
        </section>
        
        {/* Related Articles */}
        {related_articles && related_articles.length > 0 && (
          <section className="py-10 bg-white/80 dark:bg-[#132A43]/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6 flex items-center">
                  <span className="w-4 h-1 bg-[#B94D4D] rounded-full mr-3"></span>
                  {t('media.articles.related', 'Artikel Terkait')}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {related_articles.map((relatedArticle) => (
                    <RelatedArticleCard key={relatedArticle.id} article={relatedArticle} />
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

export default ArticleShow;