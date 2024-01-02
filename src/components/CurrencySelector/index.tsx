import React from 'react';

import './styles.css';

interface CurrencySelectorProps {
  label: string;
  currencies: string[];
  selectedCurrency: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

type CurrencyFlag = Record<string, string>;

const currencyFlag: CurrencyFlag = {
  'USD': '🇺🇸 USD - US Dollar',
  'EUR': '🇪🇺 EUR - Euro'
};

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ label, currencies, selectedCurrency, onChange }) => {
  return (
    <div className="currency-selector-container">
      <label className="currency-selector-label">{label}</label>
      <select className="currency-selector-select" value={selectedCurrency} onChange={onChange}>
        {currencies.map(currency => (
          <option key={currency} value={currency}>{currencyFlag[currency]}</option>
        ))}
      </select>
    </div>
  );
};
