import React from 'react';
import { Users, Clock, Ticket, TrendingUp, Tag, Eye, Percent } from 'lucide-react';

const Overview = () => {
  const stats = [
    { 
      title: 'Registrations', 
      value: '0 / 0', 
      icon: Users, 
      subtitle: 'Current / Capacity',
      color: 'blue' 
    },
    { 
      title: 'Revenue Achieved', 
      value: '₵ 0', 
      icon: TrendingUp, 
      subtitle: 'Total confirmed payments',
      color: 'green' 
    },
    { 
      title: 'Revenue Expected', 
      value: '₵ 0', 
      icon: Ticket, 
      subtitle: 'Based on total registrations',
      color: 'purple' 
    },
    { 
      title: 'Revenue Pending', 
      value: '₵ 0', 
      icon: Clock,
      subtitle: 'Awaiting payment',
      color: 'yellow' 
    },
    { 
      title: 'Total Discount', 
      value: '₵ 0', 
      icon: Tag,
      subtitle: 'Applied discounts',
      color: 'pink' 
    },
    { 
      title: 'Event Views', 
      value: '0', 
      icon: Eye,
      subtitle: 'Total page views',
      color: 'indigo' 
    },
    { 
      title: 'Commission Rate', 
      value: '7.50%', 
      icon: Percent,
      subtitle: 'Platform fee',
      color: 'gray' 
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview; 