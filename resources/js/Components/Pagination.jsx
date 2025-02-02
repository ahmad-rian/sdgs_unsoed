import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const NavLink = ({ href, className = '', children, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg 
      hover:bg-blue-50 dark:hover:bg-blue-900/20 ${className}`}
  >
    {children}
    <motion.span 
      className="absolute bottom-0 left-0 h-0.5 bg-blue-500 dark:bg-blue-400"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </Link>
);

export default NavLink;