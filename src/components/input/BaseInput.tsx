import React from 'react';

interface BaseInputProps {
  title?: string;
  error?: string | null;
  className?: string;
  children: React.ReactElement;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  title,
  error,
  className = '',
  children,
}) => {
  const child = React.Children.only(children) as React.ReactElement<{ className?: string }>;

  const enhancedChild = React.cloneElement(child, {
    className: `${child.props.className || ''} ${
      error
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-blue-500'
    } w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out`,
  });

  return (
    <div className={`relative w-full space-y-1 ${className}`}>
      {title && <label className="block text-sm font-medium">{title}</label>}
      {enhancedChild}
      {error && <p className="text-sm text-red-600 animate-slideDown">{error}</p>}
    </div>
  );
};