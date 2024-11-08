import React, { createContext, useContext, useState } from 'react';
import { useExchangeRates } from '../utils/currencyConverter';
import { toast } from 'sonner';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('GHS');
  const { rates, loading, error, convertCurrency } = useExchangeRates();

  const value = {
    selectedCurrency,
    setSelectedCurrency,
    rates,
    loading,
    error,
    convertCurrency
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}; 