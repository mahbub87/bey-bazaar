"use client";
import { createContext, useContext, useState } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('CAD');
  const [rates, setRates] = useState({
    CAD: 1,
    USD: 0.74,
    EUR: 0.68,
  });

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
};
