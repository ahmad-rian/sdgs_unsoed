import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle 
} from "@/Components/ui/alert-dialog";

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
        
        // Gunakan router dari Inertia untuk mengirim request DELETE
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
            user={auth.user || auth}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Berita</h2>
                    <Link
                        href={route('berita.create')}
                        className="inline-flex items-center px-4 py-2 bg-[#B94D4D] border border-transparent 
                        rounded-lg font-medium text-sm text-white hover:bg-[#943D3D] transition-colors"
                    >
                        <PlusCircle className="w-5 h-5 mr-2" />
                        Create Berita
                    </Link>
                </div>
            }
        >
            <Head title="Berita" />

            <Notification notification={notification} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {(!berita?.data || berita?.data?.length === 0) ? (
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg p-6 text-center">
                            <p className="text-gray-600">No berita yet. Create your first berita!</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {berita?.data?.map((item) => (
                                    <div key={item.id} className="bg-white overflow-hidden shadow-sm rounded-lg flex flex-col">
                                        <div className="relative h-48">
                                            <img
                                                src={item?.compressed_image ? `/storage/${item.compressed_image}` : ''}
                                                alt={item?.title || 'Berita image'}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                                }}
                                            />
                                            <div className="absolute top-2 right-2">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                    ${item?.status === 'published' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {item?.status || 'draft'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-lg font-medium text-gray-900 truncate">
                                                {item?.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-600 overflow-hidden max-h-[4.5em] line-clamp-3">
                                                {item?.content}
                                            </p>
                                            <div className="mt-auto pt-4 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-500">
                                                        {item?.created_at ? format(new Date(item.created_at), 'MMM d, yyyy') : '-'}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        By {item?.author || 'Unknown'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Link
                                                        href={route('berita.edit', item.id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#B94D4D]/10 
                                                        border border-transparent rounded-md font-medium text-xs text-[#B94D4D] 
                                                        hover:bg-[#B94D4D]/20 focus:outline-none focus:ring-2 
                                                        focus:ring-[#B94D4D] focus:ring-offset-2 transition-all"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => confirmDelete(item)}
                                                        disabled={processing}
                                                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 
                                                        border border-transparent rounded-md font-medium text-xs text-red-700 
                                                        hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 
                                                        focus:ring-offset-2 transition-all disabled:opacity-50 
                                                        disabled:cursor-not-allowed"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Links */}
                            {berita?.links && berita.links.length > 3 && (
                                <div className="mt-6">
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {berita.links.map((link, key) => {
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
                                                            ? 'border-[#B94D4D] text-[#B94D4D] font-medium bg-[#B94D4D]/10'
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

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteModal} onOpenChange={setDeleteModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Berita</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete {beritaToDelete?.title ? `"${beritaToDelete.title}"` : 'this berita'}? 
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600"
                            disabled={processing}
                        >
                            {processing ? 'Deleting...' : 'Delete Berita'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AuthenticatedLayout>
    );
}