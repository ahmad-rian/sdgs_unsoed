import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import NavLink from '@/Components/NavLink';
import * as Icons from 'lucide-react';
import { usePage } from '@inertiajs/react';

const NavItem = ({ item, isActive, onMouseEnter, onMouseLeave, theme }) => {
  const { url } = usePage();
  const IconComponent = Icons[item.icon];
  const isCurrentPath = item.href === url;
  const hasActiveChild = item.children?.some(child => child.href === url);
  const isActiveItem = isCurrentPath || hasActiveChild || isActive;

  const getTextColor = () => {
    if (theme === 'dark') {
      return isActiveItem ? 'text-[#F5E6D3]' : 'text-gray-300 hover:text-white';
    }
    return isActiveItem ? 'text-[#B94D4D]' : 'text-gray-600 hover:text-gray-900';
  };

  const getBackgroundColor = () => {
    if (theme === 'dark') {
      return isActiveItem ? 'bg-[#1B3A5B]/50' : 'hover:bg-[#1B3A5B]/30';
    }
    return isActiveItem ? 'bg-[#B94D4D]/10' : 'hover:bg-[#B94D4D]/5';
  };

  if (item.href) {
    return (
      <div className="relative">
        <NavLink 
          href={item.href}
          className={`block px-3 py-2 rounded-lg transition-all duration-300 ${getBackgroundColor()}`}
        >
          <span className={`flex items-center gap-2 ${getTextColor()}`}>
            {IconComponent && <IconComponent className="w-4 h-4" />}
            {item.name}
          </span>
        </NavLink>
        {isCurrentPath && (
          <motion.div
            layoutId="indicator"
            className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full
              ${theme === 'dark' ? 'bg-[#F5E6D3]' : 'bg-[#B94D4D]'}`}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className={`flex items-center gap-2 px-3 py-2 text-sm
          rounded-lg transition-all duration-300 ${getBackgroundColor()} ${getTextColor()}`}
      >
        {IconComponent && <IconComponent className="w-4 h-4" />}
        {item.name}
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {isActiveItem && (
        <motion.div
          layoutId="indicator"
          className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full
            ${theme === 'dark' ? 'bg-[#F5E6D3]' : 'bg-[#B94D4D]'}`}
        />
      )}

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute left-0 mt-1 w-56 rounded-lg shadow-lg border backdrop-blur-lg
              ${theme === 'dark' 
                ? 'bg-gray-900/90 border-gray-800' 
                : 'bg-white/90 border-gray-200'}`}
          >
            {item.children.map((child) => {
              const ChildIcon = Icons[child.icon];
              const isChildActive = child.href === url;
              
              return (
                <div key={child.name} className="relative">
                  <NavLink
                    href={child.href}
                    className={`block w-full transition-all duration-300
                      ${theme === 'dark' ? 'hover:bg-[#1B3A5B]/30' : 'hover:bg-[#B94D4D]/5'}`}
                  >
                    <span className={`flex items-center gap-2 px-4 py-2 text-sm
                      ${theme === 'dark'
                        ? isChildActive ? 'text-[#F5E6D3]' : 'text-gray-300 hover:text-white'
                        : isChildActive ? 'text-[#B94D4D]' : 'text-gray-600 hover:text-gray-900'}`}>
                      {ChildIcon && <ChildIcon className="w-4 h-4" />}
                      {child.name}
                    </span>
                  </NavLink>
                  {isChildActive && (
                    <motion.div
                      layoutId="dropdownIndicator"
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full
                        ${theme === 'dark' ? 'bg-[#F5E6D3]' : 'bg-[#B94D4D]'}`}
                    />
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavItem;