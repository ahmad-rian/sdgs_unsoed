import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';

export default function ErrorPage({ status, title, description }) {
    const getErrorImage = (status) => {
        switch (status) {
            case 403: return "🔒";
            case 404: return "🔍"; 
            case 419: return "⌛";
            case 429: return "⚡";
            case 500: return "🔧";
            case 503: return "🚧";
            default: return "⚠️";
        }
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-[#1B3A5B] dark:to-[#0F2439]">
                <Head title={`${status} - ${title}`} />

                <div className="min-h-[calc(100vh-64px)] flex flex-col items-center pt-20 p-4">
                    {/* Logo */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <img 
                            src="/assets/sdg2.png"
                            alt="SDG's Center"
                            className="h-36 w-36 drop-shadow-2xl"
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-lg"
                    >
                        <div className="bg-white dark:bg-[#1F4468]/50 backdrop-blur-sm rounded-3xl shadow-xl dark:shadow-2xl border border-gray-100 dark:border-white/5 p-8 text-center">
                            <div className="text-6xl mb-6">
                                {getErrorImage(status)}
                            </div>

                            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                {status}
                            </h1>

                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                {title}
                            </h2>

                            <p className="text-gray-600 dark:text-gray-300 mb-8">
                                {description}
                            </p>

                            <div className="flex justify-center">
                                <Link
                                    href={route('welcome')}
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#B94D4D] to-[#943D3D] text-white rounded-xl hover:from-[#943D3D] hover:to-[#832D2D] transition-colors"
                                >
                                    <Home className="w-5 h-5 mr-2" />
                                    Home
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AppLayout>
    );
}