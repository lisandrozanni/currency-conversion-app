import React, { useState } from 'react';
import { ErrorMessage } from '../ErrorMessage';

import './styles.css';

interface AmountInputProps {
  label: string;
  amount: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({ label, amount, onChange }) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const validInput = /^[0-9]*$/.test(inputValue);

    setIsValid(validInput);

    if (validInput) {
      onChange(event);
    }
  };

  return (
    <div className="amount-input-container">
      <label className="amount-input-label" htmlFor="amount-input">{label}</label>
      <div className="amount-wrapper">
        <span className="currency-symbol">$</span>
        <input
          type="text"
          id="amount-input"
          inputMode="decimal"
          autoComplete="off"
          value={amount}
          onChange={handleInputChange}
        />
      </div>
      {!isValid && <ErrorMessage message={"Enter a valid amount"} fontSize={"13px"} />}
    </div>
  );
};
