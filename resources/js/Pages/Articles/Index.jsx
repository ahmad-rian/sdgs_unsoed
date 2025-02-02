import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Transition } from '@headlessui/react';

export default function Index({ auth, articles }) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);
    const [notification, setNotification] = useState(null);
    const { props } = usePage();
    
    const { delete: destroy, processing } = useForm();

    useEffect(() => {
        // Check if flash exists before accessing its properties
        if (props?.flash?.message) {
            setNotification({
                type: 'success',
                message: props.flash.message
            });
        } else if (props?.flash?.error) {
            setNotification({
                type: 'error',
                message: props.flash.error
            });
        }

        const timer = setTimeout(() => {
            setNotification(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [props.flash]);

    const confirmDelete = (article) => {
        setArticleToDelete(article);
        setDeleteModal(true);
    };

    const handleDelete = () => {
        destroy(route('articles.destroy', articleToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteModal(false);
                setArticleToDelete(null);
            },
            onError: (errors) => {
                setNotification({
                    type: 'error',
                    message: 'Failed to delete article'
                });
            },
        });
    };

    const closeModal = () => {
        setDeleteModal(false);
        setArticleToDelete(null);
    };

    const Notification = ({ notification }) => {
        if (!notification) return null;
    
        const bgColor = notification.type === 'success' ? 'bg-green-500' : 'bg-red-500';
    
        return (
            <Transition
                show={!!notification}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className={`fixed bottom-4 right-4 rounded-md p-4 ${bgColor} text-white shadow-lg z-50 flex items-center space-x-2`}>
                    {notification.type === 'success' ? (
                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                        </svg>
                    ) : (
                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    )}
                    <p className="text-sm font-medium">
                        {notification.message}
                    </p>
                </div>
            </Transition>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Articles</h2>
                    <Link
                        href={route('articles.create')}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Create Article
                    </Link>
                </div>
            }
        >
            <Head title="Articles" />

            <Notification notification={notification} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {articles.data.length === 0 ? (
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6 text-center">
                            <p className="text-gray-600">No articles yet. Create your first article!</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {articles.data.map((article) => (
                                    <div key={article.id} className="bg-white overflow-hidden shadow-sm rounded-lg flex flex-col">
                                        <div className="relative h-48">
                                            <img
                                                src={`/storage/${article.compressed_image}`}
                                                alt={article.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                                }}
                                            />
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-lg font-medium text-gray-900 truncate">
                                                {article.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-600 overflow-hidden max-h-[4.5em] line-clamp-3">
                                                {article.content}
                                            </p>
                                            <div className="mt-auto pt-4 flex items-center justify-between">
                                                <span className="text-sm text-gray-500">
                                                    {format(new Date(article.created_at), 'MMM d, yyyy')}
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        href={route('articles.edit', article.id)}
                                                        className="inline-flex items-center px-3 py-1 bg-indigo-50 border border-transparent rounded-md font-medium text-xs text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => confirmDelete(article)}
                                                        className="inline-flex items-center px-3 py-1 bg-red-50 border border-transparent rounded-md font-medium text-xs text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Links */}
                            {articles.links && articles.links.length > 3 && (
                                <div className="mt-6">
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {articles.links.map((link, key) => {
                                            let label = link.label;
                                            if (label === '&laquo; Previous') label = '«';
                                            if (label === 'Next &raquo;') label = '»';
                                            
                                            return link.url === null ? (
                                                <span
                                                    key={key}
                                                    className="px-4 py-2 text-sm text-gray-500 bg-white border rounded cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: label,
                                                    }}
                                                />
                                            ) : (
                                                <Link
                                                    key={key}
                                                    href={link.url}
                                                    className={`px-4 py-2 text-sm border rounded hover:bg-gray-50 ${
                                                        link.active
                                                            ? 'border-indigo-500 text-indigo-600 font-medium bg-indigo-50'
                                                            : 'text-gray-700'
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: label,
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={deleteModal} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Delete Article
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Are you sure you want to delete "{articleToDelete?.title}"? This action cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end space-x-3">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton 
                            onClick={handleDelete} 
                            disabled={processing}
                            className="inline-flex items-center"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Deleting...
                                </>
                            ) : (
                                'Delete Article'
                            )}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}