import React, { useEffect, type ChangeEvent } from 'react';
import { type InputProps } from './types';
import { useValidation } from './validation';
import { BaseInput } from './BaseInput';

export const CheckboxInput: React.FC<InputProps> = (props) => {
  const { value, onChange, validation, type, title, data, className, inputClassName,onError, ...rest } = props;
  const { error } = useValidation(value, validation, type);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!data) {
      onChange(e.target.checked);
      return;
    }
    const selectedValue = e.target.value;
    const newValue = Array.isArray(value) ? [...value] : [];
    if (e.target.checked) {
      newValue.push(selectedValue);
    } else {
      const index = newValue.indexOf(selectedValue);
      if (index > -1) newValue.splice(index, 1);
    }
    onChange(newValue);
  };

  useEffect(() => {
    onError?.(error);
  }, [error, onError]);



  if (data && data.length) {
    return (
      <BaseInput title={title} error={error} className={className}>
        <div className="space-y-2">
          {data.map((item) => (
            <label key={item.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                value={item.value}
                checked={Array.isArray(value) && value.includes(item.value)}
                onChange={handleChange}
                className={`rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out ${inputClassName}`}
                {...rest}
                
              />
              {item.icon && <span>{item.icon}</span>}
              <span className="text-sm text-gray-700">{item.item}</span>
            </label>
          ))}
        </div>
      </BaseInput>
    );
  }

  return (
    <BaseInput title={title} error={error} className={className}>
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={!!value}
          onChange={handleChange}
          className={`rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out ${inputClassName}`}
          {...rest}
        />
        <span className="text-sm text-gray-700">{title}</span>
      </label>
    </BaseInput>
  );
};