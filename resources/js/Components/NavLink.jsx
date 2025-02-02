import { Link } from '@inertiajs/react';

const NavLink = ({ active = false, className = '', children, ...props }) => {
  return (
    <Link
      {...props}
      className={`
        inline-flex items-center px-3 py-2 text-sm font-medium
        transition-all duration-200 relative group
        ${active ? 'text-blue-500 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}
        ${className}
      `}
    >
      <span className="relative z-10">
        {children}
      </span>
      <span className={`absolute inset-x-0 bottom-0 h-0.5 transform origin-left scale-x-0 
        transition-transform duration-200 bg-blue-500 dark:bg-blue-400
        group-hover:scale-x-100 ${active ? 'scale-x-100' : ''}`} 
      />
    </Link>
  );
};

export default NavLink;