import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  UserCircle,
  MailIcon,
  Calendar,
  AlertCircle
} from 'lucide-react';
import Modal from '@/Components/Modal';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Transition } from '@headlessui/react';

export default function Index({ auth, users, filters }) {
  const [search, setSearch] = useState(filters.search || '');
  const [deleteModal, setDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const { props } = usePage();

  useEffect(() => {
    if (props?.flash?.success) {
      setNotification({ type: 'success', message: props.flash.success });
    } else if (props?.flash?.error) {
      setNotification({ type: 'error', message: props.flash.error });
    }

    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [props.flash]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('users.index'), { search }, {
      preserveState: true,
      replace: true,
    });
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    router.delete(route('users.destroy', userToDelete.id), {
      preserveScroll: true,
      onSuccess: () => {
        setDeleteModal(false);
        setUserToDelete(null);
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
            <AlertCircle className="h-5 w-5" />
          )}
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      </Transition>
    );
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="User Management" />
      <Notification notification={notification} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage all users and their permissions
            </p>
          </div>
          <Link
            href={route('users.create')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span>Add User</span>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -mt-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Search
            </button>
            {filters.search && (
              <Link
                href={route('users.index')}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear
              </Link>
            )}
          </form>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.data.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                      <UserCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No users found</p>
                    </td>
                  </tr>
                ) : (
                  users.data.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            {user.id === auth.user.id && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MailIcon className="w-4 h-4 text-gray-400" />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(user.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={route('users.edit', user.id)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          {user.id !== auth.user.id && (
                            <button
                              onClick={() => confirmDelete(user)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {users.data.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{users.from}</span> to{' '}
                  <span className="font-medium">{users.to}</span> of{' '}
                  <span className="font-medium">{users.total}</span> results
                </div>
                <div className="flex gap-2">
                  {users.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url || '#'}
                      preserveState
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        link.active
                          ? 'bg-indigo-600 text-white'
                          : link.url
                          ? 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ))}
                </div>
              </div>
            </div>
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
            <h2 className="text-xl font-semibold text-gray-900">Delete User</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <strong>{userToDelete?.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <SecondaryButton onClick={() => setDeleteModal(false)}>
              Cancel
            </SecondaryButton>
            <DangerButton onClick={handleDelete}>
              Delete User
            </DangerButton>
          </div>
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}
