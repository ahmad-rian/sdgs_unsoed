import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Navbar from '@/Components/Navbar';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B3A5B] to-[#0F2439]">
            <Head title="Log in" />
            <Navbar />

            <div className="min-h-screen flex flex-col items-center pt-32 p-4">
                {/* Logo Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <img 
                        src="/assets/sdg2.png"
                        alt="SDG's Center"
                        className="h-32 w-32 drop-shadow-2xl"
                    />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Login Card */}
                    <div className="bg-[#1F4468]/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/5 p-8 space-y-6">
                        {/* Header */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white">
                                Welcome Back
                            </h2>
                            <p className="mt-2 text-sm text-gray-300">
                                Sign in to continue to SDG's Center
                            </p>
                        </div>

                        {status && (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <p className="text-sm text-green-400">{status}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <InputLabel 
                                    htmlFor="email" 
                                    value="Email Address" 
                                    className="text-white text-sm font-medium"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="mt-1 block w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                                      text-white placeholder-gray-400 focus:border-[#B94D4D] focus:ring focus:ring-[#B94D4D] 
                                      focus:ring-opacity-20 transition-colors"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <InputLabel 
                                        htmlFor="password" 
                                        value="Password" 
                                        className="text-white text-sm font-medium"
                                    />
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-[#B94D4D] hover:text-[#943D3D] transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative mt-1">
                                    <TextInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        className="block w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                                          text-white placeholder-gray-400 focus:border-[#B94D4D] focus:ring focus:ring-[#B94D4D] 
                                          focus:ring-opacity-20 transition-colors"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 
                                          focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            <div className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 text-[#B94D4D] border-white/20 rounded bg-white/5 
                                      focus:ring-[#B94D4D] transition-colors"
                                />
                                <span className="ml-2 text-sm text-gray-300">
                                    Remember me
                                </span>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full px-4 py-3.5 bg-gradient-to-r from-[#B94D4D] to-[#943D3D] text-white 
                                      font-medium rounded-xl hover:from-[#943D3D] hover:to-[#832D2D] focus:outline-none focus:ring-2 
                                      focus:ring-[#B94D4D] focus:ring-offset-2 focus:ring-offset-[#1B3A5B] transform 
                                      hover:scale-[0.99] transition-all duration-200 flex justify-center items-center space-x-2"
                                >
                                    {processing ? (
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" 
                                              strokeWidth="4" fill="none"/>
                                            <path className="opacity-75" fill="currentColor" 
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                    ) : (
                                        <span>Sign in</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}