import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/Contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const springTransition = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };

    const iconVariants = {
        initial: { scale: 0, rotate: -180 },
        animate: { scale: 1, rotate: 0 },
        exit: { scale: 0, rotate: 180 }
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className={`relative p-3 rounded-full transition-all duration-300
                backdrop-blur-md overflow-hidden
                ${theme === 'dark' 
                    ? 'bg-gray-800/30 hover:bg-gray-700/40' 
                    : 'bg-white/30 hover:bg-white/40'
                } 
                border border-white/10
                shadow-lg hover:shadow-xl`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                    <motion.svg
                        key="moon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-200"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={springTransition}
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        <circle cx="12" cy="8" r="1"></circle>
                        <circle cx="9" cy="14" r="1"></circle>
                        <circle cx="15" cy="12" r="1"></circle>
                    </motion.svg>
                ) : (
                    <motion.svg
                        key="sun"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-500"
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={springTransition}
                    >
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </motion.svg>
                )}
            </AnimatePresence>

            {/* Animated background effect */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={false}
                animate={{
                    background: theme === 'dark'
                        ? 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3), transparent 70%)'
                        : 'radial-gradient(circle at center, rgba(250, 204, 21, 0.3), transparent 70%)'
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full ${
                            theme === 'dark' ? 'bg-blue-400/30' : 'bg-yellow-400/30'
                        }`}
                        initial={{ x: '50%', y: '50%' }}
                        animate={{
                            x: `${50 + (Math.random() - 0.5) * 40}%`,
                            y: `${50 + (Math.random() - 0.5) * 40}%`,
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />
                ))}
            </div>
        </motion.button>
    );
};

export default ThemeToggle;