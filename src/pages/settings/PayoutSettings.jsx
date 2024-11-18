import { useState } from 'react';
import { Wallet, Banknote, Plus, AlertCircle, Building2, X } from 'lucide-react';
import { useExchangeRates, formatCurrency } from '../../utils/currencyConverter';
import { Dialog } from '@headlessui/react';

const PayoutSettings = () => {
  const { rates, loading, error, convertCurrency } = useExchangeRates();
  
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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState(null);
  const [newMethod, setNewMethod] = useState({
    type: 'Bank Account',
    bankName: '',
    accountNumber: '',
    accountName: '',
    provider: '',
    number: '',
  });

  const handleAddMethod = (e) => {
    e.preventDefault();
    // Add your logic to save the new payment method
    setIsAddModalOpen(false);
    setNewMethod({
      type: 'Bank Account',
      bankName: '',
      accountNumber: '',
      accountName: '',
      provider: '',
      number: '',
    });
  };

  const handleDeleteMethod = () => {
    // Add your logic to delete the payment method
    setIsDeleteModalOpen(false);
    setMethodToDelete(null);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Payout Settings</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage how you receive your event earnings.
          </p>
        </div>

        {/* Payout Methods */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payout Methods</h3>
            </div>
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium 
              text-white bg-blue-600 hover:bg-blue-700 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-900 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          <div className="space-y-3">
            {payoutMethods.map((method) => (
              <div key={method.id} className="flex flex-col sm:flex-row sm:items-center 
                justify-between gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center 
                    justify-center text-gray-600 dark:text-gray-400">
                    {method.type === 'Visa' ? 'V' : 
                     method.type === 'Mastercard' ? 'M' : 
                     'MTN'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {method.type === 'Bank Account' ? method.bankName : method.provider}
                      </h4>
                      {method.isDefault && (
                        <span className="px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 
                          bg-blue-50 dark:bg-blue-950 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {method.accountNumber || method.number} • {method.accountName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <button className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 
                      hover:bg-gray-50 dark:hover:bg-gray-700 
                      rounded-lg transition-colors">
                      Set as Default
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      setMethodToDelete(method);
                      setIsDeleteModalOpen(true);
                    }} 
                    className="px-3 py-1.5 text-sm text-red-500 dark:text-red-400 
                      hover:bg-red-50 dark:hover:bg-red-900/20 
                      rounded-lg transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Schedule */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payout Schedule</h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between 
              gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Automatic Payouts</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
              gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Minimum Payout Amount</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Only process payouts when balance exceeds this amount
                </p>
              </div>
              <select className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                text-gray-900 dark:text-white bg-white dark:bg-gray-700">
                <option>GHS 100</option>
                <option>GHS 500</option>
                <option>GHS 1,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payout Alert */}
        <div className="flex items-start gap-3 p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-600">
              Update Your Billing Information
            </h4>
            <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
              Please ensure your payment method is up to date to enable you buy tickets for events you wish to attend.
            </p>
          </div>
        </div>
      </div>

      {/* Add Payment Method Modal */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">Add Payout Method</Dialog.Title>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMethod} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payout Type
                </label>
                <select
                  value={newMethod.type}
                  onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value })}
                  className="w-full px-3 py-2 
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white 
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:border-blue-500 dark:focus:border-blue-400"
                >
                  <option>Bank Account</option>
                  <option>Mobile Money</option>
                </select>
              </div>

              {newMethod.type === 'Bank Account' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={newMethod.bankName}
                      onChange={(e) => setNewMethod({ ...newMethod, bankName: e.target.value })}
                      className="w-full px-3 py-2 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        rounded-lg 
                        focus:ring-blue-500 dark:focus:ring-blue-400 
                        focus:border-blue-500 dark:focus:border-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={newMethod.accountNumber}
                      onChange={(e) => setNewMethod({ ...newMethod, accountNumber: e.target.value })}
                      className="w-full px-3 py-2 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        rounded-lg 
                        focus:ring-blue-500 dark:focus:ring-blue-400 
                        focus:border-blue-500 dark:focus:border-blue-400"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mobile Money Provider
                    </label>
                    <select
                      value={newMethod.provider}
                      onChange={(e) => setNewMethod({ ...newMethod, provider: e.target.value })}
                      className="w-full px-3 py-2 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        rounded-lg 
                        focus:ring-blue-500 dark:focus:ring-blue-400 
                        focus:border-blue-500 dark:focus:border-blue-400"
                      required
                    >
                      <option value="">Select Provider</option>
                      <option>MTN</option>
                      <option>Vodafone</option>
                      <option>AirtelTigo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={newMethod.number}
                      onChange={(e) => setNewMethod({ ...newMethod, number: e.target.value })}
                      className="w-full px-3 py-2 
                        bg-white dark:bg-gray-700 
                        text-gray-900 dark:text-white 
                        border border-gray-300 dark:border-gray-600 
                        rounded-lg 
                        focus:ring-blue-500 dark:focus:ring-blue-400 
                        focus:border-blue-500 dark:focus:border-blue-400"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  value={newMethod.accountName}
                  onChange={(e) => setNewMethod({ ...newMethod, accountName: e.target.value })}
                  className="w-full px-3 py-2 
                    bg-white dark:bg-gray-700 
                    text-gray-900 dark:text-white 
                    border border-gray-300 dark:border-gray-600 
                    rounded-lg 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:border-blue-500 dark:focus:border-blue-400"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium 
                    text-gray-700 dark:text-gray-300 
                    bg-white dark:bg-gray-700 
                    border border-gray-300 dark:border-gray-600 
                    hover:bg-gray-50 dark:hover:bg-gray-600 
                    rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium 
                    text-white bg-blue-600 
                    hover:bg-blue-700 dark:hover:bg-blue-500 
                    rounded-lg transition-colors"
                >
                  Add Method
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white rounded-lg p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Remove Payment Method
            </Dialog.Title>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to remove this payment method? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMethod}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default PayoutSettings; 