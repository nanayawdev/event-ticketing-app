import { usePaystack } from 'react-paystack';
import { usePayment } from '../../context/PaymentContext';
import { formatCurrency } from '../../utils/currencyConverter';

const PaymentButton = ({ amount, email, metadata }) => {
  const { selectedCurrency, convertCurrency } = usePayment();
  const amountInGHS = convertCurrency(amount, selectedCurrency, 'GHS');

  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: amountInGHS * 100, // Convert to pesewas
    publicKey: 'your-paystack-public-key',
    metadata: metadata,
    currency: 'GHS',
  };

  const initializePayment = usePaystack(config);

  return (
    <button 
      onClick={() => initializePayment()}
      className="bg-sea-green-500 text-white px-6 py-2 rounded"
    >
      Pay {formatCurrency(amount, selectedCurrency)}
    </button>
  );
}; 