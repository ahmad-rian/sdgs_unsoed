import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B3A5B] to-[#0F2439]">
            <Head title="Forgot Password" />

            <div className="min-h-screen flex flex-col items-center pt-20 p-4">
                {/* Logo Section */}
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
                    className="w-full max-w-md"
                >
                    {/* Back to Login Link */}
                    <div className="mb-6">
                        <Link 
                            href={route('login')} 
                            className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            <span>Back to login</span>
                        </Link>
                    </div>

                    {/* Forgot Password Card */}
                    <div className="bg-[#1F4468]/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/5 p-8 space-y-6">
                        {/* Header */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white">
                                Forgot Password
                            </h2>
                            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                                No problem. Just let us know your email address and we will email you a password
                                reset link that will allow you to choose a new one.
                            </p>
                        </div>

                        {status && (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <p className="text-sm text-green-400">{status}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label 
                                    htmlFor="email" 
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Email Address
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="block w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-[#B94D4D] focus:ring focus:ring-[#B94D4D] focus:ring-opacity-20 transition-colors"
                                    autoComplete="email"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full px-4 py-3.5 bg-gradient-to-r from-[#B94D4D] to-[#943D3D] text-white font-medium rounded-xl hover:from-[#943D3D] hover:to-[#832D2D] focus:outline-none focus:ring-2 focus:ring-[#B94D4D] focus:ring-offset-2 focus:ring-offset-[#1B3A5B] transform hover:scale-[0.99] transition-all duration-200 flex justify-center items-center space-x-2"
                                >
                                    {processing ? (
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                    ) : (
                                        <span>Send Reset Link</span>
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