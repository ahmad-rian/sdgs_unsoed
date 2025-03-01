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

  if (item.href && !item.children) {
    return (
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <NavLink 
          href={item.href}
          className={`block px-2.5 py-1.5 rounded-lg transition-all duration-300 ${getBackgroundColor()}`}
        >
          <span className={`flex items-center gap-1.5 text-sm ${getTextColor()}`}>
            {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
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
      </motion.div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() => {
          if (item.href) {
            window.location.href = item.href;
          }
        }}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium
          rounded-lg transition-all duration-300 ${getBackgroundColor()} ${getTextColor()}`}
      >
        {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
        {item.name}
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.button>

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
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`absolute left-0 mt-1 w-48 rounded-lg shadow-lg border backdrop-blur-lg
              ${theme === 'dark' 
                ? 'bg-gray-900/90 border-gray-800' 
                : 'bg-white/90 border-gray-200'}`}
          >
            <div className="p-1">
              {item.children.map((child) => {
                const ChildIcon = Icons[child.icon];
                const isChildActive = child.href === url;
                
                return (
                  <motion.div 
                    key={child.name} 
                    className="relative"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <NavLink
                      href={child.href}
                      className={`block w-full rounded-md transition-all duration-300
                        ${theme === 'dark' ? 'hover:bg-[#1B3A5B]/30' : 'hover:bg-[#B94D4D]/5'}`}
                    >
                      <span className={`flex items-center gap-1.5 px-3 py-1.5 text-xs
                        ${theme === 'dark'
                          ? isChildActive ? 'text-[#F5E6D3]' : 'text-gray-300 hover:text-white'
                          : isChildActive ? 'text-[#B94D4D]' : 'text-gray-600 hover:text-gray-900'}`}>
                        {ChildIcon && <ChildIcon className="w-3.5 h-3.5" />}
                        {child.name}
                      </span>
                    </NavLink>
                    {isChildActive && (
                      <motion.div
                        layoutId="dropdownIndicator"
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full
                          ${theme === 'dark' ? 'bg-[#F5E6D3]' : 'bg-[#B94D4D]'}`}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavItem;