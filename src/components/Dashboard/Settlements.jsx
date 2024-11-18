import React from 'react';
import { DollarSign, Download, Ticket, Percent, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import PriceDisplay from '../PriceDisplay/PriceDisplay';

const Settlements = () => {
  const settlements = [
    { 
      id: 1, 
      eventName: 'Summer Festival 2024',
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
    { 
      id: 3, 
      eventName: 'Music Concert Live',
      amount: 15000.00,
      status: 'Completed',
      date: '2024-03-12',
      reference: 'SET123458'
    },
    { 
      id: 4, 
      eventName: 'Business Summit',
      amount: 5250.00,
      status: 'Pending',
      date: '2024-03-10',
      reference: 'SET123459'
    },
    { 
      id: 5, 
      eventName: 'Food Festival',
      amount: 9800.00,
      status: 'Completed',
      date: '2024-03-08',
      reference: 'SET123460'
    },
    { 
      id: 6, 
      eventName: 'Art Exhibition',
      amount: 3500.00,
      status: 'Completed',
      date: '2024-03-05',
      reference: 'SET123461'
    },
    { 
      id: 7, 
      eventName: 'Comedy Night',
      amount: 6250.00,
      status: 'Pending',
      date: '2024-03-03',
      reference: 'SET123462'
    },
    { 
      id: 8, 
      eventName: 'Wedding Expo',
      amount: 11200.00,
      status: 'Completed',
      date: '2024-03-01',
      reference: 'SET123463'
    },
    { 
      id: 9, 
      eventName: 'Fashion Show',
      amount: 7800.00,
      status: 'Pending',
      date: '2024-02-28',
      reference: 'SET123464'
    },
    { 
      id: 10, 
      eventName: 'Sports Tournament',
      amount: 13500.00,
      status: 'Completed',
      date: '2024-02-25',
      reference: 'SET123465'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settlements</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Tickets Sold</h3>
            <Ticket className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Gross Revenue</h3>
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-2xl font-bold">₵0.00</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Commission</h3>
            <Percent className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-2xl font-bold">7.50%</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Net Revenue</h3>
            <TrendingUp className="w-6 h-6 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold">₵0.00</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Total Paid Out</h3>
            <CheckCircle className="w-6 h-6 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold">₵0.00</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Balance To Be Paid</h3>
            <Clock className="w-6 h-6 text-orange-500" />
          </div>
          <p className="text-2xl font-bold">₵0.00</p>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriceDisplay priceInGHS={settlement.amount} />
                  </td>
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