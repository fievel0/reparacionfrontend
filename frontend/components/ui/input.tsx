import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={`border px-2 py-1 rounded ${props.className}`}
    />
  );
};