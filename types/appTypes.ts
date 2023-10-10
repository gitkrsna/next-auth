import { FieldValues, UseFormReturn } from 'react-hook-form';

interface FormFieldType {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  fieldType?:
    | 'input'
    | 'datepicker'
    | 'searchableSelect'
    | 'select'
    | 'multiSelect';
  controlType?: 'text' | 'number' | 'password' | 'time';
  options?: { label: string; value: string }[];
}

interface SelectOption {
  label: string;
  value: string;
}

export type { FormFieldType, SelectOption };
