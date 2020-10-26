import { BaseTextComponentValidations, TextFieldValidations, TextAreaValidations, PasswordValidations, NumberValidations } from "../utilities/Validations";
import { BaseComponentDisplayProps, LabelPosition, ErrorPosition, BaseComponentProps, ButtonDisplaySchema, BaseComponentSchema } from "./ComponentSchema";

export interface BaseInputComponentDisplayProps extends BaseComponentDisplayProps {
  labelPosition?: LabelPosition;
  errorPosition?: ErrorPosition;
  description?: string;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  hidden?: boolean;
}

export interface BaseTextInputComponentDisplayProps extends BaseInputComponentDisplayProps {
  placeholder?: string;
}

export interface BaseInputComponentProps<T> extends BaseComponentProps {
  display?: BaseInputComponentDisplayProps;
  data?: {
    defaultValue?: T;
  };
  validations?: BaseTextComponentValidations;
}

export interface BaseTextInputComponentProps<T> extends BaseInputComponentProps<T> {
  display?: BaseTextInputComponentDisplayProps;
  data?: {
    defaultValue?: T;
  };
  validations?: BaseTextComponentValidations;
}

export interface TextFieldProps extends BaseTextInputComponentProps<string> {
  validations?: TextFieldValidations;
}

export interface EmailProps extends BaseTextInputComponentProps<string> {
  validations?: TextFieldValidations;
}

export interface TextAreaProps extends BaseTextInputComponentProps<string> {
  validations?: TextAreaValidations;
}

export interface PasswordProps extends BaseTextInputComponentProps<string> {
  validations?: PasswordValidations;
}

export interface NumberProps extends BaseTextInputComponentProps<number> {
  validations?: NumberValidations;
}

export type ButtonStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface ButtonProps extends BaseComponentProps {
  text: string;
  display?: ButtonDisplaySchema;
  style?: ButtonStyle;
}

// INPUT COMPONENTS
export type TextFieldType = 'text';
export type TextAreaType = 'textarea';
export type PasswordType = 'password';
export type NumberType = 'number';
export type EmailType = 'email';
export type ButtonType = 'button';


export interface TextFieldSchema extends TextFieldProps, BaseComponentSchema {
  type: TextFieldType;
}

export interface TextAreaSchema extends TextAreaProps, BaseComponentSchema {
  type: TextAreaType,
}

export interface NumberSchema extends NumberProps, BaseComponentSchema {
  type: NumberType,
}

export interface EmailSchema extends EmailProps, BaseComponentSchema {
  type: EmailType,
}

export interface ButtonSchema extends ButtonProps, BaseComponentSchema {
  type: ButtonType,
}
export interface PasswordSchema extends PasswordProps, BaseComponentSchema {
  type: PasswordType,
}

export type InputComponentSchema =
  | TextFieldSchema
  | TextAreaSchema
  | NumberSchema
  | EmailSchema
  | ButtonSchema
  | PasswordSchema
  ;
