import { useState } from 'react';
import { CreditCard, Wallet, Plus, AlertCircle } from 'lucide-react';

const PaymentSettings = () => {
  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/24',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiry: '08/25',
      isDefault: false
    },
    {
      id: 3,
      type: 'MTN MoMo',
      last4: '6789',
      expiry: null,
      isDefault: false
    }
  ]);

  const [billingHistory] = useState([
    {
      id: 1,
      date: 'Mar 15, 2024',
      amount: 299.99,
      status: 'Paid',
      invoice: '#INV-2024-001'
    },
    {
      id: 2,
      date: 'Feb 15, 2024',
      amount: 299.99,
      status: 'Paid',
      invoice: '#INV-2024-002'
    }
  ]);

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your payment methods and view billing history.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium 
              text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex flex-col sm:flex-row sm:items-center 
                justify-between gap-3 p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center 
                    justify-center">
                    {method.type === 'Visa' ? 'V' : 
                     method.type === 'Mastercard' ? 'M' : 
                     'MTN'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">
                        {method.type} {method.last4 && `ending in ${method.last4}`}
                      </h4>
                      {method.isDefault && (
                        <span className="px-2 py-0.5 text-xs font-medium text-blue-600 
                          bg-blue-50 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    {method.expiry && (
                      <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                    )}
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

        {/* Billing History */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Billing History</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Invoice</th>
                  <th className="pb-3 font-medium sr-only">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {billingHistory.map((bill) => (
                  <tr key={bill.id} className="text-sm">
                    <td className="py-3 text-gray-900">{bill.date}</td>
                    <td className="py-3 text-gray-900">
                      ${bill.amount.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 text-xs font-medium text-green-600 
                        bg-green-50 rounded-full">
                        {bill.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-900">{bill.invoice}</td>
                    <td className="py-3 text-right">
                      <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 
                        rounded-lg transition-colors">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Billing Alert */}
        <div className="flex items-start gap-3 p-3 sm:p-4 bg-yellow-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">
              Update Your Billing Information
            </h4>
            <p className="mt-1 text-sm text-yellow-700">
              Your next billing cycle starts on April 15, 2024. Please ensure your 
              payment method is up to date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings; 