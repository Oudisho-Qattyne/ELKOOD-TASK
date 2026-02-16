import React, {useEffect, type ChangeEvent } from 'react';
import { type InputProps } from './types';
import { useValidation } from './validation';
import { BaseInput } from './BaseInput';

export const NumberInput: React.FC<InputProps> = (props) => {
  const { value, onChange, validation, type, title, placeholder, className, inputClassName, onError , ...rest } = props;
  const { error } = useValidation(value, validation, type);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? '' : Number(e.target.value);
    onChange(val);
  };

  useEffect(() => {
    onError?.(error);
  }, [error, onError]);

  return (
    <BaseInput title={title} error={error} className={className}>
      <input
        type={type}
        value={value ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
      />
    </BaseInput>
  );
};