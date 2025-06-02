import React, { useState } from 'react';
import { Users, ShoppingBag, Package, MessageSquare, BarChart } from 'lucide-react';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import MessageCenter from './MessageCenter';
import Analytics from './Analytics';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'orders' | 'messages' | 'analytics'>('users');

  const tabs = [
    { id: 'users', name: 'Users', icon: Users },
    { id: 'products', name: 'Products', icon: ShoppingBag },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'analytics', name: 'Analytics', icon: BarChart },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'messages':
        return <MessageCenter />;
      case 'analytics':
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;