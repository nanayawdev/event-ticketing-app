import { useState, useEffect } from 'react';
import { CreditCard, Wallet, Plus, AlertCircle } from 'lucide-react';
import { useExchangeRates, formatCurrency, getDefaultCurrencyByLocation } from '../../utils/currencyConverter';

const PaymentSettings = () => {
  const { convertCurrency, rates, loading, error } = useExchangeRates();
  const [userCurrency, setUserCurrency] = useState('GHS');
  
  // Get user's location from profile or organization settings
  const userLocation = 'Greater Accra'; // You should get this from your user profile/context
  
  const [organizationSettings, setOrganizationSettings] = useState({
    preferredCurrency: 'GHS'
  });

  useEffect(() => {
    // You would typically fetch organization settings from an API
    // For now, we'll use the default state
    const orgCurrency = organizationSettings?.preferredCurrency || 'GHS';
    setUserCurrency(orgCurrency);
  }, [organizationSettings]);

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
      invoice: '#INV-2024-001',
      event: {
        name: 'Summer Music Festival 2024',
        date: 'July 15, 2024',
        tickets: 2,
        ticketType: 'VIP Pass'
      }
    },
    {
      id: 2,
      date: 'Feb 15, 2024',
      amount: 299.99,
      status: 'Paid',
      invoice: '#INV-2024-002',
      event: {
        name: 'Tech Conference 2024',
        date: 'March 20, 2024',
        tickets: 1,
        ticketType: 'General Admission'
      }
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
            <h3 className="text-lg font-medium text-gray-900">Ticket Purchase History</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Event</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium sr-only">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {billingHistory.map((bill) => (
                  <tr 
                    key={bill.id} 
                    className="text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      console.log('Show event details:', bill.event);
                    }}
                  >
                    <td className="py-3 text-gray-900">{bill.date}</td>
                    <td className="py-3 text-gray-900">{bill.event.name}</td>
                    <td className="py-3 text-gray-900">
                      {formatCurrency(bill.amount, userCurrency)}
                      {userCurrency !== 'GHS' && (
                        <span className="text-sm text-gray-500">
                          ({formatCurrency(convertCurrency(bill.amount, 'GHS', userCurrency), userCurrency)})
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 text-xs font-medium text-green-600 bg-green-50 rounded-full">
                        {bill.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        View Details
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
              Please ensure your payment method is up to date to enable you buy tickets for events you wish to attend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings; 