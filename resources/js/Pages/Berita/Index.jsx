import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ auth, berita }) {
    const [deleteModal, setDeleteModal] = useState(false);
    const [beritaToDelete, setBeritaToDelete] = useState(null);
    const [notification, setNotification] = useState(null);
    const [processing, setProcessing] = useState(false);
    const { flash } = usePage().props || {};
    
    useEffect(() => {
        if (flash?.message) {
            setNotification({
                type: 'success',
                message: flash.message
            });
        } else if (flash?.error) {
            setNotification({
                type: 'error',
                message: flash.error
            });
        }

        const timer = setTimeout(() => {
            setNotification(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [flash]);

    const confirmDelete = (item) => {
        if (item) {
            setBeritaToDelete(item);
            setDeleteModal(true);
        }
    };

    const handleDelete = () => {
        if (!beritaToDelete?.id) return;

        setProcessing(true);
        
        router.delete(route('berita.destroy', beritaToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteModal(false);
                setBeritaToDelete(null);
                setNotification({
                    type: 'success',
                    message: 'Berita deleted successfully'
                });
                setProcessing(false);
            },
            onError: (errors) => {
                setNotification({
                    type: 'error',
                    message: errors.message || 'Failed to delete berita'
                });
                setProcessing(false);
            },
        });
    };

    const Notification = ({ notification }) => {
        if (!notification) return null;
    
        const bgColor = notification.type === 'success' ? 'bg-green-500' : 'bg-red-500';
    
        return (
            <Transition
                show={!!notification}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className={`fixed bottom-4 right-4 rounded-lg p-4 ${bgColor} text-white shadow-lg z-50 flex items-center gap-2`}>
                    {notification.type === 'success' ? (
                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                        </svg>
                    ) : (
                        <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    )}
                    <p className="text-sm font-medium">{notification.message}</p>
                </div>
            </Transition>
        );
    };

    return (
        <AuthenticatedLayout user={auth.user || auth}>
            <Head title="Berita" />
            
            <Notification notification={notification} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Berita</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage news and announcements
                        </p>
                    </div>
                    <Link
                        href={route('berita.create')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Create Berita</span>
                    </Link>
                </div>

                {/* Content */}
                <div>
                    {(!berita?.data || berita?.data?.length === 0) ? (
                        <div className="bg-white overflow-hidden shadow-sm border border-gray-200 rounded-lg p-12 text-center">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                            </svg>
                            <p className="text-gray-600 font-medium">No berita yet. Create your first berita!</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {berita?.data?.map((item) => (
                                    <div key={item.id} className="bg-white overflow-hidden shadow-sm border border-gray-200 rounded-lg flex flex-col hover:shadow-md transition-shadow">
                                        <div className="relative h-48">
                                            <img
                                                src={item?.compressed_image ? `/storage/${item.compressed_image}` : ''}
                                                alt={item?.title || 'Berita image'}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                                }}
                                            />
                                            {item?.status && (
                                                <div className="absolute top-2 right-2">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                        ${item.status === 'published' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3.5rem]">
                                                {item?.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-1">
                                                {item?.content}
                                            </p>
                                            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-900 font-medium">
                                                        {item?.author || 'Unknown'}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {item?.created_at ? format(new Date(item.created_at), 'MMM d, yyyy') : '-'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={route('berita.edit', item.id)}
                                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => confirmDelete(item)}
                                                        disabled={processing}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {berita?.links && berita.links.length > 3 && (
                                <div className="mt-6 flex justify-center">
                                    <div className="flex gap-2">
                                        {berita.links.map((link, key) => {
                                            let label = link.label;
                                            if (label === '&laquo; Previous') label = '‹ Previous';
                                            if (label === 'Next &raquo;') label = 'Next ›';
                                            
                                            return link.url === null ? (
                                                <span
                                                    key={key}
                                                    className="px-4 py-2 text-sm text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{ __html: label }}
                                                />
                                            ) : (
                                                <Link
                                                    key={key}
                                                    href={link.url}
                                                    className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
                                                        link.active
                                                            ? 'bg-indigo-600 text-white border-indigo-600 font-medium'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: label }}
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
            <Modal show={deleteModal} onClose={() => setDeleteModal(false)}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-red-100 rounded-full">
                            <Trash2 className="w-6 h-6 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Delete Berita</h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete <strong>"{beritaToDelete?.title}"</strong>? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={() => setDeleteModal(false)}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton onClick={handleDelete} disabled={processing}>
                            {processing ? 'Deleting...' : 'Delete Berita'}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
