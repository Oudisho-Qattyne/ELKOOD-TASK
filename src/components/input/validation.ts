import { useState, useEffect } from 'react';

type ValidationRule = (value: any) => string | null;

export function createValidator(rules: string[]): ValidationRule[] {
    return rules.map(rule => {
      if (rule === 'required') {
        return (value: any) => (value ? null : 'This field is required');
      }
      if (rule === 'positive') {
        return (value: any) => (Number(value) > 0 ? null : 'Must be positive');
      }
      if (rule === 'negative') {
        return (value: any) => (Number(value) < 0 ? null : 'Must be negative');
      }
      if (rule === 'phoneNumber') {
        return (value: any) => {
          const phoneRegex = /^\+?[0-9\s\-\(\)]{8,}$/;
          const cleaned = String(value).trim();
          return phoneRegex.test(cleaned) ? null : 'Invalid phone number (must include country code)';
        };
      }
      const gtMatch = rule.match(/^>(\d+)$/);
      if (gtMatch) {
        const threshold = Number(gtMatch[1]);
        return (value: any) => (Number(value) > threshold ? null : `Must be greater than ${threshold}`);
      }
      const ltMatch = rule.match(/^<(\d+)$/);
      if (ltMatch) {
        const threshold = Number(ltMatch[1]);
        return (value: any) => (Number(value) < threshold ? null : `Must be less than ${threshold}`);
      }
  
      // File size validation ( "size<1MB", "size>500KB")
      const fileSizeMatch = rule.match(/^size([<>])(\d+)([KM]B)$/);
      if (fileSizeMatch) {
        const [_, operator, sizeStr, unit] = fileSizeMatch;
        const size = Number(sizeStr);
        const multiplier = unit === 'KB' ? 1024 : 1024 * 1024;
        const limit = size * multiplier;
        return (value: FileList | File | null) => {
          if (!value) return null;
          const files = value instanceof FileList ? Array.from(value) : [value];
          for (const file of files) {
            const fileSize = file.size;
            if (operator === '<' && fileSize >= limit) {
              return `File size must be < ${size}${unit}`;
            }
            if (operator === '>' && fileSize <= limit) {
              return `File size must be > ${size}${unit}`;
            }
          }
          return null;
        };
      }
  
      // Date comparisons ("after:2025-01-01", "before:today")
      const afterMatch = rule.match(/^after:(.+)$/);
      if (afterMatch) {
        const targetDate = new Date(afterMatch[1]);
        return (value: string) => {
          const inputDate = new Date(value);
          return inputDate > targetDate ? null : `Date must be after ${afterMatch[1]}`;
        };
      }
      const beforeMatch = rule.match(/^before:(.+)$/);
      if (beforeMatch) {
        const targetDate = beforeMatch[1] === 'today' ? new Date() : new Date(beforeMatch[1]);
        return (value: string) => {
          const inputDate = new Date(value);
          return inputDate < targetDate ? null : `Date must be before ${beforeMatch[1]}`;
        };
      }
      
  
      return () => null;
    });
  }

export function useValidation(
  value: any,
  rules: string[] = [],
  type: string
): { error: string | null; valid: boolean; setDirty: () => void } {
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);
    type    
  useEffect(() => {
    if (!dirty) return;
    const validators = createValidator(rules);
    for (const validate of validators) {
      const err = validate(value);
      if (err) {
        setError(err);
        return;
      }
    }
    setError(null);
  }, [value, rules, dirty]);

  return {
    error,
    valid: !error,
    setDirty: () => setDirty(true),
  };
}