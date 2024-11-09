import { useState } from 'react';
import { Wallet, Banknote, Plus, AlertCircle, Building2 } from 'lucide-react';

const PayoutSettings = () => {
  const [payoutMethods] = useState([
    {
      id: 1,
      type: 'Bank Account',
      bankName: 'GCB Bank',
      accountNumber: '****5678',
      accountName: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mobile Money',
      provider: 'MTN',
      number: '****4567',
      accountName: 'John Doe',
      isDefault: false
    }
  ]);

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Payout Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage how you receive your event earnings.
          </p>
        </div>

        {/* Payout Methods */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Payout Methods</h3>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium 
              text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          <div className="space-y-3">
            {payoutMethods.map((method) => (
              <div key={method.id} className="flex flex-col sm:flex-row sm:items-center 
                justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center 
                    justify-center">
                    {method.type === 'Bank Account' ? 
                      <Banknote className="w-5 h-5 text-gray-600" /> : 
                      <Wallet className="w-5 h-5 text-gray-600" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">
                        {method.type === 'Bank Account' ? method.bankName : method.provider}
                      </h4>
                      {method.isDefault && (
                        <span className="px-2 py-0.5 text-xs font-medium text-blue-600 
                          bg-blue-50 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {method.accountNumber || method.number} • {method.accountName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 
                      rounded-lg transition-colors">
                      Set as Default
                    </button>
                  )}
                  <button className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 
                    rounded-lg transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Schedule */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Payout Schedule</h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between 
              gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900">Automatic Payouts</h4>
                <p className="text-sm text-gray-500">
                  Receive your earnings automatically every week
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
                  peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                </div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between 
              gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900">Minimum Payout Amount</h4>
                <p className="text-sm text-gray-500">
                  Only process payouts when balance exceeds this amount
                </p>
              </div>
              <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>GHS 100</option>
                <option>GHS 500</option>
                <option>GHS 1,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payout Alert */}
        <div className="flex items-start gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">
              Next Payout Scheduled
            </h4>
            <p className="mt-1 text-sm text-blue-700">
              Your next automatic payout of GHS 2,450.00 is scheduled for April 15, 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutSettings; 