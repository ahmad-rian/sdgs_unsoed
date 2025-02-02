import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

export default function Show({ auth, article }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">{article.title}</h2>
                    <div className="flex gap-4">
                        <Link
                            href={route('articles.edit', article.id)}
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-500"
                        >
                            Edit Article
                        </Link>
                        <Link
                            href={route('articles.index')}
                            className="px-4 py-2 text-indigo-600 text-sm font-medium hover:text-indigo-500"
                        >
                            Back to Articles
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={article.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-8">
                            {/* Article Image */}
                            <div className="mb-8">
                            <img
                                                src={`/storage/${article.compressed_image}`}
                                                alt={article.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                                }}
                                            />
                            </div>

                            {/* Article Content */}
                            <div className="prose max-w-none">
                                <div className="mb-6">
                                    <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Published on {format(new Date(article.created_at), 'MMMM d, yyyy')}
                                    </p>
                                </div>
                                
                                <div className="mt-6">
                                    <div 
                                        className="text-gray-700 leading-relaxed whitespace-pre-line"
                                        dangerouslySetInnerHTML={{ __html: article.formatted_content }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}