import React from "react";

const AdminDashboardPage = () => {
   return (
      <main className="p-8 bg-gray-50 min-h-screen">
         <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
         <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded shadow p-6">
               <h2 className="text-xl font-semibold mb-2">Users</h2>
               <p className="text-2xl font-bold">1,234</p>
            </div>
            <div className="bg-white rounded shadow p-6">
               <h2 className="text-xl font-semibold mb-2">Orders</h2>
               <p className="text-2xl font-bold">567</p>
            </div>
            <div className="bg-white rounded shadow p-6">
               <h2 className="text-xl font-semibold mb-2">Revenue</h2>
               <p className="text-2xl font-bold">$12,345</p>
            </div>
         </section>
         <section className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2">
               <li>User <span className="font-semibold">john_doe</span> signed up.</li>
               <li>Order <span className="font-semibold">#1234</span> placed.</li>
               <li>User <span className="font-semibold">jane_smith</span> updated profile.</li>
            </ul>
         </section>
      </main>
   );
};

export default AdminDashboardPage;