import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';

const MobileNavItem = ({ item, onClose, index, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { url } = usePage();
  const IconComponent = Icons[item.icon];
  const isCurrentPath = item.href === url;
  const hasActiveChild = item.children?.some(child => child.href === url);
  const isActive = isCurrentPath || hasActiveChild || isOpen;

  const getTextColor = () => {
    if (theme === 'dark') {
      return isActive ? 'text-[#F5E6D3]' : 'text-gray-300';
    }
    return isActive ? 'text-[#B94D4D]' : 'text-gray-800';
  };

  const getBackgroundColor = () => {
    if (theme === 'dark') {
      return isActive ? 'bg-[#1B3A5B]/50' : 'hover:bg-[#1B3A5B]/30';
    }
    return isActive ? 'bg-[#B94D4D]/10' : 'hover:bg-[#B94D4D]/5';
  };

  if (item.href) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative"
      >
        <Link
          href={item.href}
          onClick={onClose}
          className={`flex items-center w-full px-4 py-3 text-sm rounded-lg
            ${getTextColor()} ${getBackgroundColor()} transition-all duration-300`}
        >
          {IconComponent && <IconComponent className="w-5 h-5 mr-3" />}
          {item.name}
        </Link>
        {isActive && (
          <motion.div
            layoutId="mobileIndicator"
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full
              ${theme === 'dark' ? 'bg-[#F5E6D3]' : 'bg-[#B94D4D]'}`}
          />
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-3 text-sm rounded-lg
          ${getTextColor()} ${getBackgroundColor()} transition-all duration-300`}
      >
        <span className="flex items-center">
          {IconComponent && <IconComponent className="w-5 h-5 mr-3" />}
          {item.name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {isActive && (
        <motion.div
          layoutId="mobileIndicator"
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full
            ${theme === 'dark' ? 'bg-[#F5E6D3]' : 'bg-[#B94D4D]'}`}
        />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pl-4 space-y-1 mt-1 overflow-hidden"
          >
            {item.children.map((child) => {
              const ChildIcon = Icons[child.icon];
              const isChildActive = child.href === url;
              
              return (
                <div key={child.name} className="relative">
                  <Link
                    href={child.href}
                    onClick={onClose}
                    className={`flex items-center px-4 py-2 text-sm rounded-lg
                      ${theme === 'dark'
                        ? isChildActive ? 'text-[#F5E6D3] bg-[#1B3A5B]/30' : 'text-gray-300 hover:text-[#F5E6D3] hover:bg-[#1B3A5B]/30'
                        : isChildActive ? 'text-[#B94D4D] bg-[#B94D4D]/10' : 'text-gray-600 hover:text-[#B94D4D] hover:bg-[#B94D4D]/5'}
                      transition-all duration-300`}
                  >
                    {ChildIcon && <ChildIcon className="w-4 h-4 mr-3" />}
                    {child.name}
                  </Link>
                  {isChildActive && (
                    <motion.div
                      layoutId="mobileDropdownIndicator"
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full
                        ${theme === 'dark' ? 'bg-[#F5E6D3]' : 'bg-[#B94D4D]'}`}
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MobileNavItem;