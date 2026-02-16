
import React from 'react';

export type InputType =
    | 'text'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'email'
    | 'file'
    | 'image'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'search'
    | 'tel'
    | 'url'
    | 'datetime-local'
    | 'select'
    | 'time';

export interface Item {
    id: string;
    item: string;
    value: string;
    icon?: React.ReactNode;
}

export interface InputProps {
    id: string
    title?: string;
    placeholder?: string;
    value?: any;
    data?: Item[];
    error?: string;
    validation?: string[];
    valid?: boolean;
    type: InputType;
    onChange: (v: any) => void;
    className?: string;
    inputClassName?: string;
    name?: string;
    icon?: any;
    disabled?: boolean,
    min?: string; 
    max?: string;   
    step?: number;
}