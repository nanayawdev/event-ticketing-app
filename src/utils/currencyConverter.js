import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';

const EXCHANGE_RATES_API = 'https://api.exchangerate-api.com/v4/latest/GHS';
// Alternative APIs:
// - https://api.apilayer.com/exchangerates_data
// - https://api.currencyapi.com/v3/
// - https://openexchangerates.org/api/

export const currencies = {
  GHS: { symbol: '₵', name: 'Ghana Cedi' },
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  NGN: { symbol: '₦', name: 'Nigerian Naira' },
  // Add more currencies as needed
};

export const formatCurrency = (amount, currency = 'GHS') => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
};

export const useExchangeRates = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(EXCHANGE_RATES_API);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRates(data.rates);
        setError(null); // Clear any previous errors
      } catch (err) {
        // Generic error message for users
        const userMessage = navigator.onLine 
          ? 'Unable to update exchange rates at this time' 
          : 'Please check your internet connection';
        
        toast.error(userMessage, {
          duration: 3000,
          id: 'exchange-rate-error', // Prevent duplicate toasts
        });
        
        // Log the actual error for debugging
        console.error('Exchange rate fetch error:', err);
        
        setError(err);
        
        // Use cached rates if available
        if (!rates) {
          // Fallback to some default rates if needed
          setRates({
            USD: 0.083, // Example fallback rates
            EUR: 0.077,
            GBP: 0.066,
            NGN: 63.09,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    // Refresh rates every hour
    const interval = setInterval(fetchRates, 3600000);
    return () => clearInterval(interval);
  }, [rates]); // Add rates as dependency to access in catch block

  const convertCurrency = useCallback((amount, fromCurrency = 'GHS', toCurrency) => {
    if (!rates || !amount) return null;
    
    // Convert to GHS first if not already
    const amountInGHS = fromCurrency === 'GHS' 
      ? amount 
      : amount / rates[fromCurrency];
    
    // Then convert to target currency
    return toCurrency === 'GHS' 
      ? amountInGHS 
      : amountInGHS * rates[toCurrency];
  }, [rates]);

  return { rates, loading, error, convertCurrency };
}; 