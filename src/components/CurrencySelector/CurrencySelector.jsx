import React from 'react';
import { usePayment } from '../../context/PaymentContext';
import { currencies } from '../../utils/currencyConverter';

const CurrencySelector = () => {
  const { selectedCurrency, setSelectedCurrency } = usePayment();

  return (
    <select
      value={selectedCurrency}
      onChange={(e) => setSelectedCurrency(e.target.value)}
      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
    >
      {Object.entries(currencies).map(([code, { name, symbol }]) => (
        <option key={code} value={code}>
          {code} ({symbol})
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector; 