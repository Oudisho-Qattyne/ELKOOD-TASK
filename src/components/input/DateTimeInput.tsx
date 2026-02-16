import React, { useState, useEffect } from 'react';

export type DateTimeInputMode = 'date' | 'time' | 'datetime-local' | 'display';

export interface DateTimeInputProps {
  value?: Date | string | number | null;
  onChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLDivElement>;
  mode: DateTimeInputMode;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  className?: string;
}

function formatDateTime(date: Date): string {
  if (isNaN(date.getTime())) return 'Invalid date';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 -> 12
  const formattedHours = String(hours).padStart(2, '0');
  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
}

function toDateInputValue(date: Date): string {
  if (isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toTimeInputValue(date: Date): string {
  if (isNaN(date.getTime())) return '';
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function toDateTimeLocalValue(date: Date): string {
  if (isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  value,
  onChange,
  onBlur,
  mode,
  min,
  max,
  step = 60,
  disabled = false,
  className = '',
}) => {
  const [internalDate, setInternalDate] = useState<Date | null>(null);

  useEffect(() => {
    if (value === null || value === undefined) {
      setInternalDate(null);
      return;
    }
    let date: Date;
    if (value instanceof Date) {
      date = value;
    } else if (typeof value === 'string' || typeof value === 'number') {
      date = new Date(value);
    } else {
      date = new Date();
    }
    setInternalDate(isNaN(date.getTime()) ? null : date);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  if (mode === 'display') {
    const displayText = internalDate ? formatDateTime(internalDate) : '—';
    return (
      <div
        className={`px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 ${className}`}
        onBlur={onBlur as React.FocusEventHandler<HTMLDivElement>}
      >
        {displayText}
      </div>
    );
  }

  const inputType = mode; // 'date', 'time', 'datetime-local'
  let inputValue = '';
  if (internalDate) {
    if (mode === 'date') inputValue = toDateInputValue(internalDate);
    else if (mode === 'time') inputValue = toTimeInputValue(internalDate);
    else if (mode === 'datetime-local') inputValue = toDateTimeLocalValue(internalDate);
  }

  return (
    <input
      type={inputType}
      value={inputValue}
      onChange={handleChange}
      onBlur={onBlur}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className={className}
    />
  );
};

export default DateTimeInput;