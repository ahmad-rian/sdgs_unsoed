import { useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';
import { useTheme } from '@/Contexts/ThemeContext';

export default function Login({ status }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const redirectToGoogle = () => {
        window.location.href = route('auth.google');
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'} transition-colors duration-300`}>
            <Head title="Log in" />
            <Navbar />

            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Main Card */}
                    <div className={`
                        ${isDark 
                            ? 'bg-gray-900 border-gray-800 shadow-xl shadow-blue-950/20' 
                            : 'bg-white border-gray-100 shadow-2xl shadow-gray-200/60'
                        } 
                        rounded-2xl border p-8 backdrop-blur-sm
                        transition-all duration-300
                    `}>
                        {/* Logo Section */}
                        <div className="flex justify-center mb-6">
                            <img 
                                src="/assets/sdg2.png"
                                alt="SDG's Center"
                                className="h-20 w-20 drop-shadow-md transition-all duration-300 hover:scale-105"
                            />
                        </div>
                        
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Welcome to SDGs Center
                            </h1>
                            <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>
                                <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Single Sign On</span> Authentication
                            </p>
                        </div>

                        {status && (
                            <div className={`mb-6 p-4 ${
                                isDark ? 'bg-red-950/30 border-red-900/50' : 'bg-red-50 border-red-100'
                            } rounded-xl border`}>
                                <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{status}</p>
                            </div>
                        )}

                        {/* Google Login Button */}
                        <div className="mb-8">
                            <button
                                type="button"
                                onClick={redirectToGoogle}
                                className={`
                                    w-full px-4 py-3.5 font-medium rounded-xl 
                                    focus:outline-none focus:ring-2 
                                    focus:ring-offset-2 transform 
                                    transition-all duration-200 flex justify-center items-center space-x-3 
                                    ${isDark 
                                        ? 'bg-white/5 hover:bg-white/10 text-white border border-gray-700 focus:ring-blue-500 focus:ring-offset-gray-900' 
                                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-blue-500 focus:ring-offset-white'
                                    }
                                    hover:shadow-md
                                `}
                            >
                                {/* Modern Google logo (2023) */}
                                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                <span>Sign in with Google</span>
                            </button>
                        </div>
                        
                        <div className="text-center text-sm">
                            <p className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                Only authorized Google accounts can access this system
                            </p>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                            © {new Date().getFullYear()} Ahmad Rian S.R . All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}