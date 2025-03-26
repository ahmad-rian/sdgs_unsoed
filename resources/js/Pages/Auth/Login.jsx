import { useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ThemeToggle from '@/Components/ThemeToggle';
import { useTheme } from '@/Contexts/ThemeContext';

export default function Login({ status }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const redirectToGoogle = () => {
        window.location.href = route('auth.google');
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
            <Head title="Log in" />
            <Navbar />

           

            <div className="min-h-screen flex flex-col items-center pt-24 p-4">
                {/* Logo Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                >
                    <img 
                        src="/assets/sdg2.png"
                        alt="SDG's Center"
                        className="h-28 w-28 drop-shadow-xl"
                    />
                </motion.div>
                
                {/* SSO Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className={`text-center text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                       SDGs Center - <span className={`${isDark ? 'text-blue-400' : 'text-[#1B3A5B]'}`}>(Single Sign On)</span>
                    </h1>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full max-w-md"
                >
                    {/* Login Card */}
                    <div className={`${
                        isDark 
                            ? 'bg-gray-800 border-gray-700 shadow-lg shadow-blue-900/10' 
                            : 'bg-white border-gray-200 shadow-xl'
                    } rounded-2xl border p-8 space-y-6 transition-colors duration-300`}>
                        {/* Header */}
                        <div className="text-center">
                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Welcome Back
                            </h2>
                            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Sign in to continue to SDG's Center
                            </p>
                        </div>

                        {status && (
                            <div className={`p-4 ${
                                isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
                            } rounded-xl border`}>
                                <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{status}</p>
                            </div>
                        )}

                        {/* Google Login Button */}
                        <div>
                            <button
                                type="button"
                                onClick={redirectToGoogle}
                                className={`w-full px-4 py-3.5 font-medium rounded-xl 
                                  focus:outline-none focus:ring-2 
                                  focus:ring-offset-2 transform 
                                  hover:scale-[0.99] transition-all duration-200 flex justify-center items-center space-x-3 border
                                  ${isDark 
                                    ? 'bg-gray-700/50 text-blue-300 border-gray-600 hover:bg-gray-700 focus:ring-blue-500 focus:ring-offset-gray-900' 
                                    : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 focus:ring-[#1B3A5B] focus:ring-offset-white'
                                  }`}
                            >
                                <svg className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} viewBox="0 0 24 24">
                                    <g transform="matrix(1, 0, 0, 1, 0, 0)">
                                        <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1Z" fill="currentColor"></path>
                                    </g>
                                </svg>
                                <span>Sign in with Google</span>
                            </button>
                        </div>
                        
                        <div className="text-center text-sm mt-6">
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Only authorized Google accounts can access this system
                            </p>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="text-center mt-6">
                        <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            © {new Date().getFullYear()} Ahmad Rian S.R . All rights reserved.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}