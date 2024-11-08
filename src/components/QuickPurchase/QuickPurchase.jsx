import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { usePayment } from '../../context/PaymentContext';
import { PriceDisplay } from '../PriceDisplay/PriceDisplay';
import { CurrencySelector } from '../CurrencySelector/CurrencySelector';

const QuickPurchase = ({ event, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const { selectedCurrency, convertCurrency } = usePayment();

  const totalAmount = event.Event_Price * quantity;
  const amountInGHS = convertCurrency(totalAmount, selectedCurrency, 'GHS');

  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: amountInGHS * 100, // Convert to pesewas
    publicKey: 'your-paystack-public-key',
    metadata: {
      eventId: event.id,
      eventName: event.Event_Name,
      quantity: quantity,
      customerId: 'user-id', // If you have user authentication
    },
    currency: 'GHS',
  };

  const initializePayment = usePaystack(config);

  const handlePayment = () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    initializePayment();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
          <Dialog.Title className="text-xl font-bold mb-4">
            Quick Purchase - {event.Event_Name}
          </Dialog.Title>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Select Currency</label>
            <CurrencySelector />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Quantity</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <PriceDisplay priceInGHS={totalAmount} />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              className="px-4 py-2 bg-sea-green-500 text-white rounded"
            >
              Pay Now
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default QuickPurchase; 