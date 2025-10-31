import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, user }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);

  const { data, setData, put, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('users.update', user.id));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Edit User" />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href={route('users.index')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
            <p className="mt-1 text-sm text-gray-500">
              Update user information
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <InputLabel htmlFor="name" value="Full Name" />
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <TextInput
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="pl-12"
                    placeholder="Enter full name"
                    autoFocus
                  />
                </div>
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Email */}
              <div>
                <InputLabel htmlFor="email" value="Email Address" />
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <TextInput
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="pl-12"
                    placeholder="user@example.com"
                  />
                </div>
                <InputError message={errors.email} className="mt-2" />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-700 font-medium mb-4">
                  Leave password fields empty to keep the current password
                </p>
              </div>

              {/* Password */}
              <div>
                <InputLabel htmlFor="password" value="New Password (Optional)" />
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <TextInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="pl-12 pr-12"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <InputError message={errors.password} className="mt-2" />
              </div>

              {/* Confirm Password */}
              <div>
                <InputLabel htmlFor="password_confirmation" value="Confirm New Password" />
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <TextInput
                    id="password_confirmation"
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    className="pl-12 pr-12"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswordConfirmation ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <InputError message={errors.password_confirmation} className="mt-2" />
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
              <Link
                href={route('users.index')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <PrimaryButton disabled={processing} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {processing ? 'Updating...' : 'Update User'}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
