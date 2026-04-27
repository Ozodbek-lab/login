import React from 'react';

// Button uchun interfeys
interface MyButtonProps {
  type: "submit" | "button";
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const MyButton: React.FC<MyButtonProps> = ({ 
  type, 
  onClick, 
  children, 
  variant = 'primary' 
}) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      style={{
        ...buttonStyles,
        backgroundColor: variant === 'secondary' ? '#4f46e5' : '#4f46e5',
        boxShadow: variant === 'secondary' 
          ? '0 10px 15px -3px rgba(79, 70, 229, 0.4)' 
          : '0 10px 15px -3px rgba(79, 70, 229, 0.4)',
      }}
    >
      {children}
    </button>
  );
};

const buttonStyles: React.CSSProperties = {
  marginTop: '5px',
  padding: '15px',
  borderRadius: '15px',
  border: 'none',
  color: 'white',
  fontSize: '17px',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'transform 0.2s, background-color 0.2s',
  width: '100%', // Formaga mos tushishi uchun
};

export default MyButton;