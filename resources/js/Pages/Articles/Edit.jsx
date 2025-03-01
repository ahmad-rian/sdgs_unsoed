import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function Edit({ auth, article }) {
    const [imagePreview, setImagePreview] = useState(article.compressed_image ? `/storage/${article.compressed_image}` : null);
    
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: article.title,
        content: article.content,
        image: null,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('articles.update', article.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Article</h2>
                    <Link
                        href={route('articles.index')}
                        className="px-4 py-2 text-[#B94D4D] text-sm font-medium hover:text-[#943D3D] transition-colors"
                    >
                        Back to Articles
                    </Link>
                </div>
            }
        >
            <Head title="Edit Article" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100">
                        <form onSubmit={handleSubmit} className="p-8">
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
                                        placeholder="Enter article title"
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                {/* Content Textarea */}
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
                                        placeholder="Write your article content here"
                                    />
                                    <InputError message={errors.content} className="mt-2" />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Image</label>
                                    <div className="mt-1 flex items-center">
                                        <div className="w-full">
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
                                        </div>
                                    </div>
                                    <InputError message={errors.image} className="mt-2" />
                                    
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
                                        {processing ? 'Saving...' : 'Save Changes'}
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