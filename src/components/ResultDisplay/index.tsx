import React from 'react';
import { ErrorMessage } from '../ErrorMessage';

import './styles.css';

interface ResultDisplayProps {
  result: string;
  error: string;
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

const singularPluralMap: Record<string, { singular: string; plural: string }> = {
  USD: { singular: 'US Dollar', plural: 'US Dollars' },
  EUR: { singular: 'Euro', plural: 'Euros' },
};

const getResultString = (amount: number, currency: string): string => {
  const { singular, plural } = singularPluralMap[currency] || { singular: '', plural: '' };
  return amount === 1 ? singular : plural;
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, error, amount, fromCurrency, toCurrency }) => {
  const currencyAmount = getResultString(amount, fromCurrency);
  const currencyResult = getResultString(Number(result), toCurrency);

  return (
    <div className="conversion-result-container">
      {error ? (
        <ErrorMessage message={error} fontSize="16px" />
      ) : (
        <>
          <p className="conversion-amount">{amount} {currencyAmount} =</p>
          <span className="conversion-result-value">{result} {currencyResult}</span>
        </>
      )}
    </div>
  );
};
