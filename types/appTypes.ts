interface FormFieldType {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  fieldType?: 'input' | 'datepicker';
}

export type { FormFieldType };
