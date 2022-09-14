import { RegisterOptions } from 'react-hook-form'

export type InputTextControlledPropsType = {
  name: string;
  type?: string;
  label?: string;
  rules?: RegisterOptions;
  placeholder?: string;
  disabled?: boolean;
}
