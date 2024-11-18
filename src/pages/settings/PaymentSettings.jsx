import { useState, useEffect } from 'react';
import { CreditCard, Wallet, Plus, AlertCircle, X, Download } from 'lucide-react';
import { useExchangeRates, formatCurrency, getDefaultCurrencyByLocation } from '../../utils/currencyConverter';
import { Dialog } from '@headlessui/react';
import html2pdf from 'html2pdf.js';
import { QRCodeSVG } from 'qrcode.react';

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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [methodToDelete, setMethodToDelete] = useState(null);
  const [newPayment, setNewPayment] = useState({
    type: 'Bank Account',
    bankName: '',
    accountNumber: '',
    accountName: '',
    provider: '',
    mobileNumber: ''
  });

  const handleAddPayment = (e) => {
    e.preventDefault();
    // Add your logic to save the new payment method
    console.log('New payment method:', newPayment);
    setIsAddModalOpen(false);
    // Reset form
    setNewPayment({
      type: 'Bank Account',
      bankName: '',
      accountNumber: '',
      accountName: '',
      provider: '',
      mobileNumber: ''
    });
  };

  const handleDeletePaymentMethod = () => {
    // Add logic to delete the payment method
    setIsDeleteModalOpen(false);
    setMethodToDelete(null);
  };

  const generatePDF = () => {
    const ticket = document.getElementById('printable-ticket-details');
    
    const opt = {
      margin: 0.5,
      filename: `ticket-${selectedBill.invoice}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: -window.scrollY,
        windowHeight: ticket.scrollHeight + 100,
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
      }
    };

    html2pdf().set(opt).from(ticket).save();
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Payment Settings</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your payment methods and view billing history.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment Methods</h3>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex flex-col sm:flex-row sm:items-center 
                justify-between gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">Expires {method.expiry}</p>
                    )}
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
                    className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 
                      hover:bg-red-50 dark:hover:bg-red-900/20 
                      rounded-lg transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ticket Purchase History</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
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
                    className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setSelectedBill(bill);
                      setIsDetailsModalOpen(true);
                    }}
                  >
                    <td className="py-3 text-gray-900 dark:text-white">{bill.date}</td>
                    <td className="py-3 text-gray-900 dark:text-white">{bill.event.name}</td>
                    <td className="py-3 text-gray-900 dark:text-white">
                      {formatCurrency(bill.amount, userCurrency)}
                      {userCurrency !== 'GHS' && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
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
        <div className="flex items-start gap-3 p-3 sm:p-4 bg-yellow-50 dark:bg-yellow-800/50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-600">
              Update Your Billing Information
            </h4>
            <p className="mt-1 text-sm text-yellow-700">
              Please ensure your payment method is up to date to enable you buy tickets for events you wish to attend.
            </p>
          </div>
        </div>

        {/* Add New Payment Method Modal */}
        <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-medium">Add Payment Method</Dialog.Title>
                <button 
                  onClick={() => setIsAddModalOpen(false)} 
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Type
                  </label>
                  <select
                    value={newPayment.type}
                    onChange={(e) => setNewPayment({ ...newPayment, type: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Bank Account</option>
                    <option>Mobile Money</option>
                  </select>
                </div>

                {newPayment.type === 'Bank Account' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        value={newPayment.bankName}
                        onChange={(e) => setNewPayment({ ...newPayment, bankName: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={newPayment.accountNumber}
                        onChange={(e) => setNewPayment({ ...newPayment, accountNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                        value={newPayment.provider}
                        onChange={(e) => setNewPayment({ ...newPayment, provider: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Provider</option>
                        <option>MTN Mobile Money</option>
                        <option>Vodafone Cash</option>
                        <option>AirtelTigo Money</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={newPayment.mobileNumber}
                        onChange={(e) => setNewPayment({ ...newPayment, mobileNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                    value={newPayment.accountName}
                    onChange={(e) => setNewPayment({ ...newPayment, accountName: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                      bg-white dark:bg-gray-800 
                      border border-gray-300 dark:border-gray-600 
                      hover:bg-gray-50 dark:hover:bg-gray-700 
                      rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                    bg-white dark:bg-gray-800 
                    border border-gray-300 dark:border-gray-600 
                    hover:bg-gray-50 dark:hover:bg-gray-700 
                    rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeletePaymentMethod}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Ticket Details Modal */}
        <Dialog open={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-medium">Ticket Details</Dialog.Title>
                <button onClick={() => setIsDetailsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {selectedBill && (
                <>
                  {/* Printable content */}
                  <div id="printable-ticket-details" className="space-y-6">
                    <div className="border-b pb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{selectedBill.event.name}</h3>
                      <p className="text-sm text-gray-500">Event Date: {selectedBill.event.date}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Order Details</h4>
                        <dl className="space-y-1">
                          <div className="grid grid-cols-2 text-sm">
                            <dt className="text-gray-500">Order Number:</dt>
                            <dd className="text-gray-900 text-right pr-4">{selectedBill.invoice}</dd>
                          </div>
                          <div className="grid grid-cols-2 text-sm">
                            <dt className="text-gray-500">Purchase Date:</dt>
                            <dd className="text-gray-900 text-right pr-4">{selectedBill.date}</dd>
                          </div>
                          <div className="grid grid-cols-2 text-sm">
                            <dt className="text-gray-500">Status:</dt>
                            <dd className="text-green-600 font-medium text-right pr-4">{selectedBill.status}</dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Ticket Information</h4>
                        <dl className="space-y-1">
                          <div className="grid grid-cols-2 text-sm">
                            <dt className="text-gray-500">Ticket Type:</dt>
                            <dd className="text-gray-900 text-right pr-4">{selectedBill.event.ticketType}</dd>
                          </div>
                          <div className="grid grid-cols-2 text-sm">
                            <dt className="text-gray-500">Quantity:</dt>
                            <dd className="text-gray-900 text-right pr-4">{selectedBill.event.tickets}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="border-t pt-4 pb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-4">Payment Summary</h4>
                      <dl className="space-y-4">
                        <div className="grid grid-cols-2 text-sm">
                          <dt className="text-gray-500">Subtotal:</dt>
                          <dd className="text-gray-900 text-right pr-4">
                            {formatCurrency(selectedBill.amount, userCurrency)}
                          </dd>
                        </div>
                        {userCurrency !== 'GHS' && (
                          <div className="grid grid-cols-2 text-sm">
                            <dt className="text-gray-500">Original Amount (GHS):</dt>
                            <dd className="text-gray-900 text-right pr-4">
                              {formatCurrency(selectedBill.amount, 'GHS')}
                            </dd>
                          </div>
                        )}
                        <div className="grid grid-cols-2 text-sm font-medium border-t pt-4">
                          <dt className="text-gray-900">Total Paid:</dt>
                          <dd className="text-gray-900 text-right pr-4">
                            {formatCurrency(selectedBill.amount, userCurrency)}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Action buttons - not included in PDF */}
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={generatePDF}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Download className="w-4 h-4" />
                      Save as PDF
                    </button>
                    <button
                      onClick={() => setIsDetailsModalOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default PaymentSettings; 