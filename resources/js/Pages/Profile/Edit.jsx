import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { User, Lock, Trash2 } from 'lucide-react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile Settings" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your account settings and preferences
                    </p>
                </div>

                {/* Profile Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <User className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                                <p className="text-sm text-gray-600">Update your account's profile information and email address</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>
                </div>

                {/* Update Password */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Lock className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Update Password</h2>
                                <p className="text-sm text-gray-600">Ensure your account is using a long, random password to stay secure</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <UpdatePasswordForm />
                    </div>
                </div>

                {/* Delete Account */}
                <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
                    <div className="border-b border-red-200 bg-red-50 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Trash2 className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Delete Account</h2>
                                <p className="text-sm text-red-600">Permanently delete your account and all associated data</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
