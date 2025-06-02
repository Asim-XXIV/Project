import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

const Analytics: React.FC = () => {
  const stats = [
    {
      name: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      changeType: 'increase',
      icon: DollarSign,
    },
    {
      name: 'Active Users',
      value: '2,342',
      change: '+15.3%',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: 'Products Sold',
      value: '1,234',
      change: '+12.5%',
      changeType: 'increase',
      icon: ShoppingBag,
    },
    {
      name: 'Growth Rate',
      value: '24.5%',
      change: '+4.2%',
      changeType: 'increase',
      icon: TrendingUp,
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <span
                  className={`font-medium ${
                    stat.changeType === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>{' '}
                <span className="text-gray-500">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts would go here - Using placeholders for now */}
      <div className="grid grid-cols-1 gap-5 mt-8 lg:grid-cols-2">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Revenue Over Time</h3>
            <div className="mt-4 h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Revenue Chart Placeholder</p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Top Products</h3>
            <div className="mt-4 h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Products Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;