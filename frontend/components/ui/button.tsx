import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', type = 'button' }) => {
  return (
    <button type={type} className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}>
      {children}
    </button>
  );
};