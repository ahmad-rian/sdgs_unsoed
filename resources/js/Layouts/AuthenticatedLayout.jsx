import React, { useState } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:transform-none lg:opacity-100 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 ">
            <img 
                src="/assets/sdg2.png"  
                alt="SDGs Logo" 
                className="w-6 h-6"     
            />
            </div>
            <span className="text-lg font-semibold text-gray-900">SDGs Center Unsoed</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-50"
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
            <NavLink
              key={item.name}
              href={item.href}
              icon={item.icon}
              active={route().current(item.name.toLowerCase() + '.*')}
              badge={item.badge}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex w-full items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500 truncate">{user?.email}</div>
              </div>
              <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180' : ''
              }`} />
            </button>

            {isProfileOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-full rounded-lg bg-white shadow-lg border border-gray-200 py-1">
                <Link
                  href={route('profile.edit')}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4" />
                  Profile Settings
                </Link>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`lg:pl-64 transition-padding duration-200 ease-in-out`}>
        {/* Top Navigation */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <button 
                className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-50 rounded-lg">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Page Header */}
          {header && (
            <div className="py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
              {header}
            </div>
          )}

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-4 top-16 w-80 mt-2 rounded-lg bg-white shadow-lg border border-gray-200 py-2">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New article published</p>
                        <p className="text-xs text-gray-500 mt-0.5">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <Link href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;