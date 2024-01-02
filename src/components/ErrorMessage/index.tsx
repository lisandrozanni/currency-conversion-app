import React from 'react';

interface ErrorMessageProps {
  message: string;
  fontSize?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, fontSize }) => (
  <p className="error-message" style={{ fontSize, color: "var(--error-color" }}>
    {message}
  </p>
);
