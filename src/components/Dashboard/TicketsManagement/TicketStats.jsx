import React from 'react';
import { BarChart, DollarSign, Users } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
  </div>
);

const TicketStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatCard
        icon={DollarSign}
        title="Total Revenue"
        value={`GH₵${stats.totalRevenue.toFixed(2)}`}
        description="Total earnings from ticket sales"
      />
      <StatCard
        icon={Users}
        title="Tickets Sold"
        value={stats.totalSold}
        description="Total number of tickets sold"
      />
      <StatCard
        icon={BarChart}
        title="Available Capacity"
        value={stats.remainingCapacity}
        description="Remaining tickets available"
      />
    </div>
  );
};

export default TicketStats; 