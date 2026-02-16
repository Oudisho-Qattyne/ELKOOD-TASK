
import React, { type ChangeEvent } from 'react';
import { type InputProps } from './types';
import { useValidation } from './validation';
import { BaseInput } from './BaseInput';

export const TextInput: React.FC<InputProps> = (props) => {
  const { value, onChange, validation, type, title, placeholder, className, inputClassName, ...rest } = props;
  const { error, setDirty } = useValidation(value, validation, type);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = () => setDirty();

  return (
    <BaseInput title={title} error={error} className={className}>
      <input
        type={type === 'text' ? 'text' : type} 
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
      />
    </BaseInput>
  );
};