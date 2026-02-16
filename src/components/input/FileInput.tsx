import React, {type ChangeEvent } from 'react';
import {type InputProps } from './types';
import { useValidation } from './validation';
import { BaseInput } from './BaseInput';

export const FileInput: React.FC<InputProps> = (props) => {
  const { onChange, validation, type, title, className, inputClassName, ...rest } = props;
  const { error, setDirty } = useValidation(undefined, validation, type);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files);
  };

  const handleBlur = () => setDirty();

  return (
    <BaseInput title={title} error={error} className={className}>
      <input
        type="file"
        onChange={handleChange}
        onBlur={handleBlur}
        className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-150 ease-in-out ${inputClassName}`}
        {...rest}
      />
    </BaseInput>
  );
};