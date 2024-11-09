import { useState } from 'react';
import { CreditCard, Plus, Phone, Wallet } from 'lucide-react';

const PaymentSettings = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      subtype: 'Visa',
      last4: '4242',
      expiry: '12/24'
    },
    {
      id: 2,
      type: 'momo',
      subtype: 'MTN',
      number: '0241234567',
      name: 'John Doe'
    }
  ]);

  const [showAddNew, setShowAddNew] = useState(false);
  const [newMethodType, setNewMethodType] = useState('card');

  const getMethodIcon = (type) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-6 h-6 text-gray-600" />;
      case 'momo':
        return <Phone className="w-6 h-6 text-yellow-600" />;
      default:
        return <Wallet className="w-6 h-6 text-gray-600" />;
    }
  };

  const removeMethod = (id) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your payment methods for purchasing tickets and services.
          </p>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.map(method => (
            <div key={method.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                  ${method.type === 'momo' ? 'bg-yellow-50' : 'bg-white'}`}>
                  {getMethodIcon(method.type)}
                </div>
                <div>
                  {method.type === 'card' ? (
                    <>
                      <p className="text-sm font-medium text-gray-900">
                        {method.subtype} ending in {method.last4}
                      </p>
                      <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-900">
                        {method.subtype} MOMO - {method.number}
                      </p>
                      <p className="text-sm text-gray-500">Registered to {method.name}</p>
                    </>
                  )}
                </div>
              </div>
              <button 
                onClick={() => removeMethod(method.id)}
                className="text-red-600 text-sm font-medium hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add New Payment Method */}
        {!showAddNew ? (
          <button
            onClick={() => setShowAddNew(true)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-blue-600 
              hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Payment Method</span>
          </button>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Add New Payment Method</h3>
            
            {/* Method Type Selection */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setNewMethodType('card')}
                className={`p-4 rounded-lg border-2 flex items-center space-x-3
                  ${newMethodType === 'card' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'}`}
              >
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Credit/Debit Card</span>
              </button>

              <button
                onClick={() => setNewMethodType('momo')}
                className={`p-4 rounded-lg border-2 flex items-center space-x-3
                  ${newMethodType === 'momo' 
                    ? 'border-yellow-500 bg-yellow-50' 
                    : 'border-gray-200 hover:border-gray-300'}`}
              >
                <Phone className="w-5 h-5 text-yellow-600" />
                <span className="font-medium">MTN MOMO</span>
              </button>
            </div>

            {/* Form Fields */}
            {newMethodType === 'card' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                      focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                        focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                        focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">MOMO Number</label>
                  <input
                    type="tel"
                    placeholder="024 123 4567"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                      focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Name</label>
                  <input
                    type="text"
                    placeholder="Enter the registered name"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2
                      focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddNew(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 
                  rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
                  hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
              >
                Add {newMethodType === 'card' ? 'Card' : 'MOMO'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSettings; 