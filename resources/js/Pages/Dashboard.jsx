import DashboardLayout from '../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
  return (
    <DashboardLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-900">You're logged in!</p>
        </div>
      </div>
    </DashboardLayout>
  );
}