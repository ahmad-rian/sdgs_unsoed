import React from 'react';
import { motion } from 'framer-motion';

const SDGsSection = ({ sdgs }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 transition-colors duration-200">
              UN SDGs
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-green-400"
          >
            Sustainable Development Goals
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-200"
          >
            Explore the 17 interconnected goals designed to achieve a better and more sustainable future for all
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {sdgs.map((sdg) => (
            <motion.div
              key={sdg.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="aspect-square"
            >
              <a
                href={sdg.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                          transition-all duration-300 relative group bg-white dark:bg-gray-800"
                style={{ borderColor: sdg.color }}
              >
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center p-4 dark:bg-opacity-90"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  <img
                    src={`https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${String(sdg.id).padStart(2, '0')}.jpg`}
                    alt={`SDG ${sdg.id}`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 100 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex flex-col items-center justify-end p-3 text-center"
                  style={{ 
                    background: `linear-gradient(to top, ${sdg.color}ff 0%, ${sdg.color}f0 50%, transparent 100%)`
                  }}
                >
                  <span className="text-white text-xs font-semibold tracking-wider mb-1">
                    Goal {sdg.id}
                  </span>
                  <h3 className="text-white text-sm font-bold mb-1 line-clamp-2 leading-tight">
                    {sdg.title}
                  </h3>
                  <p className="text-white text-xs leading-snug opacity-90 line-clamp-2">
                    {sdg.description}
                  </p>
                </motion.div>

                <div 
                  className="absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: sdg.color }}
                >
                  {sdg.id}
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SDGsSection;