import { useState } from 'react';
import { Wallet, Banknote, CreditCard, Phone, AlertCircle } from 'lucide-react';

const PayoutSettings = () => {
  const [payoutMethod, setPayoutMethod] = useState('bank');
  const [minimumPayout, setMinimumPayout] = useState('100');
  const [momoDetails, setMomoDetails] = useState({
    number: '',
    name: ''
  });
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    branchCode: ''
  });

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payout Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure how you receive payments from ticket sales and events.
          </p>
        </div>

        {/* Payout Method Selection */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900">Payout Method</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setPayoutMethod('bank')}
              className={`p-4 rounded-lg border-2 flex items-start space-x-3
                ${payoutMethod === 'bank' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Banknote className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Bank Account</p>
                <p className="text-sm text-gray-500">2-3 business days</p>
              </div>
            </button>

            <button
              onClick={() => setPayoutMethod('momo')}
              className={`p-4 rounded-lg border-2 flex items-start space-x-3
                ${payoutMethod === 'momo' 
                  ? 'border-yellow-500 bg-yellow-50' 
                  : 'border-gray-200 hover:border-gray-300'}`}
            >
              <Phone className="w-5 h-5 text-yellow-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">MTN MOMO</p>
                <p className="text-sm text-gray-500">Instant transfer</p>
              </div>
            </button>

            <button
              onClick={() => setPayoutMethod('card')}
              className={`p-4 rounded-lg border-2 flex items-start space-x-3
                ${payoutMethod === 'card' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'}`}
            >
              <CreditCard className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Debit Card</p>
                <p className="text-sm text-gray-500">Instant (small fee)</p>
              </div>
            </button>
          </div>
        </div>

        {/* Payout Details Form */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900">
            {payoutMethod === 'bank' ? 'Bank Account Details' : 
             payoutMethod === 'momo' ? 'MTN MOMO Details' : 
             'Card Details'}
          </h3>
          
          {payoutMethod === 'momo' ? (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  MOMO Number
                </label>
                <input
                  type="tel"
                  value={momoDetails.number}
                  onChange={(e) => setMomoDetails({...momoDetails, number: e.target.value})}
                  placeholder="024 123 4567"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                    focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Account Name
                </label>
                <input
                  type="text"
                  value={momoDetails.name}
                  onChange={(e) => setMomoDetails({...momoDetails, name: e.target.value})}
                  placeholder="Enter the registered name"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                    focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-600">
                  Make sure the name matches exactly as registered with MTN MOMO to avoid payment delays.
                </p>
              </div>
            </div>
          ) : payoutMethod === 'bank' ? (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={bankDetails.accountName}
                    onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                      focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                      focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Name
                  </label>
                  <select
                    value={bankDetails.bankName}
                    onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                      focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Select Bank</option>
                    <option value="gcb">GCB Bank</option>
                    <option value="absa">Absa Bank</option>
                    <option value="ecobank">Ecobank</option>
                    <option value="stanbic">Stanbic Bank</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Branch Code
                  </label>
                  <input
                    type="text"
                    value={bankDetails.branchCode}
                    onChange={(e) => setBankDetails({...bankDetails, branchCode: e.target.value})}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                      focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              {/* Card details form */}
              <p className="text-sm text-gray-500">
                Card payout details will be collected securely through our payment provider.
              </p>
            </div>
          )}
        </div>

        {/* Minimum Payout */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900">Minimum Payout Amount</h3>
          <p className="mt-1 text-sm text-gray-500">
            We'll automatically transfer your earnings when they reach this amount
          </p>
          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₵</span>
              </div>
              <input
                type="number"
                value={minimumPayout}
                onChange={(e) => setMinimumPayout(e.target.value)}
                className="pl-7 block w-full rounded-lg border border-gray-300 px-3 py-2
                  focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
              hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            Save Payout Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayoutSettings; 