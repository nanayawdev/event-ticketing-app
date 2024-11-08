import React from 'react';
import { usePayment } from '../../context/PaymentContext';
import { formatCurrency } from '../../utils/currencyConverter';

const PriceDisplay = ({ priceInGHS }) => {
  const { selectedCurrency, convertCurrency, loading } = usePayment();

  if (loading) return <span className="animate-pulse">...</span>;

  const price = priceInGHS || 0; // Fallback to 0 if no price
  const convertedPrice = convertCurrency(price, 'GHS', selectedCurrency);
  
  return (
    <span className="font-bold">
      {formatCurrency(convertedPrice, selectedCurrency)}
    </span>
  );
};

export default PriceDisplay; 