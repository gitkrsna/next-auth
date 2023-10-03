interface FormFieldType {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  fieldType?: 'input' | 'datepicker';
  controlType?: 'text' | 'number' | 'password';
}

export type { FormFieldType };
