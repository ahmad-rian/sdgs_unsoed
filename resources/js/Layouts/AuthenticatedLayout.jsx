import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { 
  LayoutDashboard, 
  FileText, 
  ChevronDown, 
  Menu, 
  X, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  MessageSquare,
  Home,
  Users,
  BarChart,
  Folder
} from 'lucide-react';

const DashboardLayout = ({ user, header, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const navigation = [
    { 
      name: 'Dashboard', 
      href: route('dashboard'), 
      icon: LayoutDashboard,
      badge: null
    },
    { 
      name: 'Articles', 
      href: route('articles.index'), 
      icon: FileText,
      badge: null
    },
    { 
      name: 'Berita', 
      href: route('berita.index'), 
      icon: Folder,   
      badge: null
    },
    { 
      name: 'Users', 
      href: route('users.index'), 
      icon: Users,   
      badge: null
    },
  ];

  const NavLink = ({ href, icon: Icon, active, children, badge }) => (
    <Link
      href={href}
      className={`group flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-150 ${
        active
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${active ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'}`} />
        <span className="text-sm font-medium">{children}</span>
      </div>
      {badge && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
          {badge}
        </span>
      )}
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Backdrop Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 flex-shrink-0">
              <img 
                src="/assets/sdg2.png"  
                alt="SDGs Logo" 
                className="w-6 h-6"     
              />
            </div>
            <span className="text-base font-semibold text-gray-900 truncate">SDGs Center Unsoed</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -mt-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <div key={item.name} onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}>
              <NavLink
                href={item.href}
                icon={item.icon}
                active={route().current(item.name.toLowerCase() + '.*')}
                badge={item.badge}
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="border-t border-gray-200 p-4">
          <div className="text-xs text-gray-500 text-center">
            SDGs Center Unsoed © 2025
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64 transition-all duration-300 ease-in-out">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              {header && (
                <div className="hidden sm:block">
                  {header}
                </div>
              )}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="relative">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white"></div>
                  </div>
                  <div className="hidden md:block text-left max-w-[150px]">
                    <div className="text-sm font-medium text-gray-900 truncate">{user?.name}</div>
                  </div>
                  <ChevronDown className={`hidden md:block h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isProfileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-lg bg-white shadow-xl border border-gray-200 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <div className="text-sm font-medium text-gray-900 truncate">{user?.name}</div>
                        <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                      </div>
                      <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Profile Settings
                      </Link>
                      <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Page Header */}
          {header && (
            <div className="sm:hidden py-3 px-4 border-t border-gray-200 bg-gray-50">
              {header}
            </div>
          )}

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsNotificationOpen(false)}
              />
              <div className="absolute right-4 top-16 w-80 sm:w-96 mt-2 rounded-lg bg-white shadow-xl border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[1, 2, 3].map((_, i) => (
                    <button 
                      key={i} 
                      className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      onClick={() => setIsNotificationOpen(false)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <Bell className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">New article published</p>
                          <p className="text-xs text-gray-500 mt-0.5">2 hours ago</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <Link 
                    href="#" 
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    onClick={() => setIsNotificationOpen(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            </>
          )}
        </header>

        {/* Main Content */}
        <main className="py-4 sm:py-6 lg:py-8">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;