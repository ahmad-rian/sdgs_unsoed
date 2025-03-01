
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { ArrowLeft } from 'lucide-react';

export default function Create({ auth }) {
    const [imagePreview, setImagePreview] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        keywords: '',
        meta_description: '',
        image: null,
        author: '',
        status: 'draft'
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('berita.store'), {
            onSuccess: () => {
                reset();
                setImagePreview(null);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Berita</h2>
                    <Link
                        href={route('berita.index')}
                        className="inline-flex items-center gap-2 px-4 py-2 text-[#B94D4D] text-sm font-medium 
                        hover:text-[#943D3D] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Berita
                    </Link>
                </div>
            }
        >
            <Head title="Create Berita" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100">
                        <form onSubmit={submit} className="p-8">
                            <div className="space-y-6">
                                {/* Title Input */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 
                                        rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B94D4D]/20 
                                        focus:border-[#B94D4D] transition-all text-gray-900"
                                        placeholder="Enter berita title"
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* Content */}
                                <div>
                                    <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        rows={8}
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 
                                        rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B94D4D]/20 
                                        focus:border-[#B94D4D] transition-all text-gray-900 resize-none"
                                        placeholder="Write your content here"
                                    />
                                    <InputError message={errors.content} className="mt-2" />
                                </div>

                                {/* SEO Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="keywords" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Keywords (SEO)
                                        </label>
                                        <input
                                            type="text"
                                            id="keywords"
                                            value={data.keywords}
                                            onChange={(e) => setData('keywords', e.target.value)}
                                            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 
                                            rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B94D4D]/20 
                                            focus:border-[#B94D4D] transition-all text-gray-900"
                                            placeholder="Enter SEO keywords, separated by commas"
                                        />
                                        <InputError message={errors.keywords} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="meta_description" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Meta Description
                                        </label>
                                        <textarea
                                            id="meta_description"
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 
                                            rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B94D4D]/20 
                                            focus:border-[#B94D4D] transition-all text-gray-900 resize-none"
                                            rows={3}
                                            placeholder="Enter meta description for SEO"
                                        />
                                        <InputError message={errors.meta_description} className="mt-2" />
                                    </div>
                                </div>

                                {/* Author & Status */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="author" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            id="author"
                                            value={data.author}
                                            onChange={(e) => setData('author', e.target.value)}
                                            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 
                                            rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B94D4D]/20 
                                            focus:border-[#B94D4D] transition-all text-gray-900"
                                            placeholder="Enter author name"
                                        />
                                        <InputError message={errors.author} className="mt-2" />
                                    </div>

                                    <div>
                                        <label htmlFor="status" className="block text-sm font-semibold text-gray-900 mb-2">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 
                                            rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B94D4D]/20 
                                            focus:border-[#B94D4D] transition-all text-gray-900"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Image</label>
                                    <div className="mt-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="block w-full text-sm text-gray-500 
                                            file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 
                                            file:text-sm file:font-medium file:bg-[#B94D4D]/10 file:text-[#B94D4D] 
                                            hover:file:bg-[#B94D4D]/20 transition-all cursor-pointer
                                            border border-gray-200 rounded-lg"
                                        />
                                        <InputError message={errors.image} className="mt-2" />
                                    </div>
                                    
                                    {imagePreview && (
                                        <div className="mt-4 relative group">
                                            <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50 
                                            shadow-sm">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-48 object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-3 bg-[#B94D4D] text-white font-medium rounded-lg
                                        hover:bg-[#943D3D] focus:outline-none focus:ring-2 focus:ring-[#B94D4D]/50
                                        focus:ring-offset-2 transform hover:scale-[0.98] transition-all
                                        shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Creating...' : 'Create Berita'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}