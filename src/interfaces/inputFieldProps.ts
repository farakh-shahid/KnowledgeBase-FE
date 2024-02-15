import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
export interface InputFieldProps {
  placeholder: string;
  type: string;
  required?: boolean;
  value?: string;
  name?: string;
  onChange?: (event: any) => void;
  disabled?: boolean;
  onKeyDown?: (event: any) => void;
  onFocus?: any;
  search?: string;
  accept?: string;
}

export interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  picture?: any;
}
