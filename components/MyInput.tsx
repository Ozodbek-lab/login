import React from 'react';

// Input uchun interfeys
interface MyInputProps {
  type?: 'text' | 'password' | 'email';
  placeholder: string;
  value: string;
  onChange: (val: string) => void; // TypeScriptda qat'iy string
  onFocus?: () => void;
  onBlur?: () => void;
}

const MyInput: React.FC<MyInputProps> = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  onFocus, 
  onBlur 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      style={inputStyles}
    />
  );
};

const inputStyles: React.CSSProperties = {
  width: '100%',
  padding: '15px 18px',
  borderRadius: '15px',
  border: '2px solid #e2e8f0',
  fontSize: '16px',
  outline: 'none',
  boxSizing: 'border-box',
  backgroundColor: '#f8fafc',
  transition: 'border-color 0.3s',
};

export default MyInput;