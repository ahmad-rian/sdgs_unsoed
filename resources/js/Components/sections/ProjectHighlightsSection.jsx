
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

const ProjectHighlightsSection = ({ projects = [] }) => {
  const { t } = useTranslation();

  // Example project structure for reference
  const sampleProject = {
    id: 1,
    title: "Project Title",
    description: "Project description...",
    date: "2024-02-01",
    category: "Research",
    image: "/path/to/image.jpg",
    tags: ["SDG 1", "SDG 2"],
    link: "/projects/1"
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#1B3A5B] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6D3]/5 to-[#B94D4D]/5 
          dark:from-[#1B3A5B]/50 dark:to-[#132A43]/50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B3A5B] dark:text-[#F5E6D3] mb-6">
            {t('projects.highlights.title')}
          </h2>
          <p className="text-lg text-[#1B3A5B]/80 dark:text-[#F5E6D3]/80 leading-relaxed">
            {t('projects.highlights.description')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              {/* Project Card */}
              <div className="bg-white dark:bg-[#132A43] rounded-2xl overflow-hidden shadow-lg
                hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Project Image */}
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <img
                    src={`/placeholder-${index + 1}.jpg`}
                    alt="Project"
                    className="w-full h-full object-cover transition-transform duration-500
                      group-hover:scale-105"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2
                    bg-white/90 dark:bg-[#1B3A5B]/90 rounded-full px-3 py-1
                    text-sm text-[#1B3A5B] dark:text-[#F5E6D3]">
                    <Calendar className="w-4 h-4" />
                    <span>Feb 1, 2024</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-[#1B3A5B] dark:text-[#F5E6D3] mb-3
                    group-hover:text-[#B94D4D] dark:group-hover:text-[#B94D4D] transition-colors">
                    Example Project Title {index + 1}
                  </h3>
                  <p className="text-[#1B3A5B]/70 dark:text-[#F5E6D3]/70 mb-4 line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['SDG 1', 'SDG 2'].map((tag, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs
                          bg-[#B94D4D]/10 text-[#B94D4D]"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <div className="mt-auto">
                    <a href="#" className="inline-flex items-center gap-2 text-[#B94D4D] 
                      font-medium hover:gap-3 transition-all">
                      {t('projects.highlights.readMore')}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a href="/projects" className="inline-flex items-center gap-2 px-8 py-3 rounded-lg
            bg-[#B94D4D] text-white hover:bg-[#B94D4D]/90 transition-colors">
            {t('projects.highlights.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectHighlightsSection;