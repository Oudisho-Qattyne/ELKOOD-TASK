
import React, { useEffect, type ChangeEvent } from 'react';
import { type InputProps } from './types';
import { useValidation } from './validation';
import { BaseInput } from './BaseInput';

export const TextInput: React.FC<InputProps> = (props) => {
  const { value, onChange, validation, type, title, placeholder, className, inputClassName, onError  , ...rest } = props;
  const { error } = useValidation(value, validation, type);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

    useEffect(() => {
      onError?.(error);
    }, [error, onError , value]);


  return (
    <BaseInput title={title} error={error} className={className}>
      <input
        type={type === 'text' ? 'text' : type} 
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
      />
    </BaseInput>
  );
};