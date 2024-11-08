import React from 'react';
import { Users, Calendar, Ticket, TrendingUp } from 'lucide-react';

const Overview = () => {
  const stats = [
    { title: 'Total Events', value: '24', icon: Calendar, change: '+12%', color: 'blue' },
    { title: 'Total Attendees', value: '1,234', icon: Users, change: '+18%', color: 'green' },
    { title: 'Tickets Sold', value: '2,456', icon: Ticket, change: '+25%', color: 'purple' },
    { title: 'Revenue', value: '$12,345', icon: TrendingUp, change: '+15%', color: 'yellow' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 text-${stat.color}-500`} />
                <span className={`text-${stat.color}-500 text-sm font-medium`}>{stat.change}</span>
              </div>
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Add more dashboard widgets here */}
    </div>
  );
};

export default Overview; 