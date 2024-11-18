import React, { createContext, useContext, useState } from 'react';
import { useExchangeRates } from '../utils/currencyConverter';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('GHS');
  const { rates, loading, error, convertCurrency } = useExchangeRates();

  return (
    <PaymentContext.Provider value={{
      selectedCurrency,
      setSelectedCurrency,
      rates,
      loading,
      error,
      convertCurrency
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}; 