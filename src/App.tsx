import React, { useState, useEffect } from 'react';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { convertCurrency } from './services/currencyService';
import { AmountInput, CurrencySelector, ResultDisplay, Spinner } from './components';

import './App.css';

const App: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<number>(1);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const fetchConversion = async (): Promise<void> => {
      setLoading(true);
      try {
        const conversionResult = await convertCurrency(fromCurrency, toCurrency, amount);
        setResult(conversionResult);
      } catch (error) {
        setError('Error in conversion');
      } finally {
        setLoading(false);
      }
    };

    fetchConversion();
  }, [fromCurrency, toCurrency, amount]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsSmallScreen(mediaQuery.matches);
  
    const handleResize = (event: MediaQueryListEvent) => {
      setIsSmallScreen(event.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
  
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  const handleInvertCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  console.log({error});

  return (
    <main className="app-container">
      <header>
        <h1>Currency Converter</h1>
      </header>
      <section className="currency-selection-section">
        <AmountInput
          label="Amount"
          amount={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <CurrencySelector
          label="From"
          currencies={["USD", "EUR"]}
          selectedCurrency={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        />
        <button onClick={handleInvertCurrencies} className="swap-button">
          {isSmallScreen ? <SwapVertIcon /> : <SwapHorizIcon />}
        </button>
        <CurrencySelector
          label="To"
          currencies={["USD", "EUR"]}
          selectedCurrency={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        />
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <ResultDisplay
          result={result}
          error={error}
          amount={amount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      )}
    </main>
  );
};

export default App;
