import React from 'react';
import FinancialMetrics from '../FinancialMetrics/FinancialMetrics';

const DashboardOverview = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      <div className="space-y-6">
        <FinancialMetrics />
        <p className="text-gray-600">Welcome to your event management dashboard!</p>
      </div>
    </div>
  );
};

export default DashboardOverview;