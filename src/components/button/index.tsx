import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: React.ReactNode; 
}

const Button = ({ 
  title, 
  icon, 
  className = '', 
  ...rest 
}: ButtonProps) => {
  return (
    <button
      className={`relative flex items-center justify-center gap-2 px-3 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 cursor-pointer select-none  ${className}`}
      {...rest}
    >
      {icon && <span className="animate-pulse">{icon}</span>}
      <p>{title}</p>
    </button>
  );
};

export default Button;