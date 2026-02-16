import React from 'react';
import { type InputProps } from './types';
import { BaseInput } from './BaseInput';                  // adjust path if needed
import DateTimeInput from './DateTimeInput';               // the new component
import { useValidation } from './validation';

export const DateInput: React.FC<InputProps> = (props) => {
  const {
    value,
    onChange,
    validation,
    type,
    title,
    className,
    inputClassName,
    min,
    max,
    step,
    disabled,
    ...rest
  } = props;

  const { error, setDirty } = useValidation(value, validation, type);

  const handleChange = (val: string) => onChange(val);
  const handleBlur = () => setDirty();

  // Map the input type to the corresponding DateTimeInput mode
  let mode: 'date' | 'time' | 'datetime-local' = 'date';
  if (type === 'time') mode = 'time';
  else if (type === 'datetime-local') mode = 'datetime-local';

  return (
    <BaseInput title={title} error={error} className={className}>
      <DateTimeInput
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        mode={mode}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={(
          `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} ${inputClassName}`
          
        )}
        {...rest}
      />
    </BaseInput>
  );
};