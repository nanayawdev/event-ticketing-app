import React from 'react';
import { DollarSign, Download } from 'lucide-react';

const Settlements = () => {
  const settlements = [
    { 
      id: 1, 
      eventName: 'Summer Festival',
      amount: 12500.00,
      status: 'Completed',
      date: '2024-03-15',
      reference: 'SET123456'
    },
    { 
      id: 2, 
      eventName: 'Tech Conference',
      amount: 8750.00,
      status: 'Pending',
      date: '2024-03-14',
      reference: 'SET123457'
    },
    // Add more settlements...
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settlements</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Total Settlements</h3>
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-2xl font-bold">$21,250.00</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Pending</h3>
            <DollarSign className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold">$8,750.00</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Completed</h3>
            <DollarSign className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">$12,500.00</p>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Settlement History</h3>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {settlements.map((settlement) => (
                <tr key={settlement.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{settlement.reference}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{settlement.eventName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${settlement.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{settlement.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      settlement.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {settlement.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Settlements; 