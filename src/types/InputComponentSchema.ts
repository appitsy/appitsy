import { BaseTextComponentValidations, TextFieldValidations, TextAreaValidations, PasswordValidations, NumberValidations } from "../utilities/Validations";
import { BaseComponentDisplaySchema, LabelPosition, ErrorPosition, BaseComponentSchema, ButtonDisplaySchema } from "./ComponentSchema";

export interface BaseInputComponentDisplaySchema extends BaseComponentDisplaySchema {
  labelPosition?: LabelPosition;
  errorPosition?: ErrorPosition;
  description?: string;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  hidden?: boolean;
}

export interface BaseTextInputComponentDisplaySchema extends BaseInputComponentDisplaySchema {
  placeholder?: string;
}

export interface BaseInputComponentSchema<T> extends BaseComponentSchema {
  display?: BaseInputComponentDisplaySchema;
  data?: {
    defaultValue?: T;
  };
  validations?: BaseTextComponentValidations;
}

export interface BaseTextInputComponentSchema<T> extends BaseInputComponentSchema<T> {
  display?: BaseTextInputComponentDisplaySchema;
  data?: {
    defaultValue?: T;
  };
  validations?: BaseTextComponentValidations;
}

export interface TextFieldSchema extends BaseTextInputComponentSchema<string> {
  type: TextFieldType;
  validations?: TextFieldValidations;
}

export interface EmailSchema extends BaseTextInputComponentSchema<string> {
  type: EmailType;
  validations?: TextFieldValidations;
}

export interface TextAreaSchema extends BaseTextInputComponentSchema<string> {
  type: TextAreaType;
  validations?: TextAreaValidations;
}

export interface PasswordSchema extends BaseTextInputComponentSchema<string> {
  type: PasswordType;
  validations?: PasswordValidations;
}

export interface NumberSchema extends BaseTextInputComponentSchema<number> {
  type: NumberType;
  validations?: NumberValidations;
}

export type ButtonStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface ButtonSchema extends BaseComponentSchema {
  type: ButtonType;
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

export type InputComponentSchema =
  | TextFieldSchema
  | TextAreaSchema
  | NumberSchema
  | EmailSchema
  | ButtonSchema
  | PasswordSchema
  ;
