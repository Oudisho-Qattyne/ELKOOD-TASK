
import React from 'react';
import {type InputProps, type InputType } from './types';
import { TextInput } from './TextInput';
import { NumberInput } from './NumberInput';
import { CheckboxInput } from './CheckboxInput';
import { FileInput } from './FileInput';
import { DateInput } from './DateInput';
import Select from './Select';


const inputComponentMap: Record<InputType, React.FC<InputProps>> = {
  text: TextInput,
  email: TextInput,
  password: TextInput,
  search: TextInput,
  tel: TextInput,
  url: TextInput,
  number: NumberInput,
  range: NumberInput,
  checkbox: CheckboxInput,
  file: FileInput,
  image: FileInput,
  date: DateInput,
  'datetime-local': DateInput,
  time: DateInput,
  color: TextInput,      
  radio: TextInput,       
  select: Select,
  
};

const Input: React.FC<InputProps> = (props) => {
  const { type } = props;
  const Component = inputComponentMap[type] || TextInput; 
  return <Component {...props} />;
};

export default Input;