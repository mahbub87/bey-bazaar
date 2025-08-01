"use client";
import { createContext, useContext, useState } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('CAD');
  // TODO: Replace hardcoded exchange rates with dynamic API-based rates
  // Consider using a service like ExchangeRate-API or similar to fetch real-time rates
  // This will provide accurate currency conversion for international customers
  const [rates, setRates] = useState({
    CAD: 1,
    USD: 0.73,
    EUR: 0.68,
  });

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
};
