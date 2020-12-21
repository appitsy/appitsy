import {
  BaseTextComponentValidations,
  TextFieldValidations,
  TextAreaValidations,
  PasswordValidations,
  NumberValidations,
  CheckboxValidations,
  MultiCheckboxValidations,
  BaseInputComponentValidations,
} from '../utilities/Validations';
import {
  BaseComponentDisplayProps,
  LabelPosition,
  ErrorPosition,
  BaseComponentDataProps,
  BaseComponentProps,
  BaseComponentSchema,
} from './BaseComponentSchema';

export interface BaseInputComponentDisplayProps extends BaseComponentDisplayProps {
  labelPosition?: LabelPosition;
  errorPosition?: ErrorPosition;
  description?: string;
  tooltip?: string;
  disabled?: boolean;
  hidden?: boolean;
}

export interface BaseTextInputComponentDisplayProps extends BaseInputComponentDisplayProps {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}

export interface BaseInputComponentDataProps<T> extends BaseComponentDataProps {
  defaultValue?: T;
}

export interface BaseInputComponentProps<T> extends BaseComponentProps {
  display?: BaseInputComponentDisplayProps;
  data?: BaseInputComponentDataProps<T>;
  validations?: BaseInputComponentValidations;
}

export interface BaseTextInputComponentProps<T> extends BaseInputComponentProps<T> {
  display?: BaseTextInputComponentDisplayProps;
  data?: BaseInputComponentDataProps<T>;
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

export interface CheckboxProps extends BaseInputComponentProps<boolean> {
  validations?: CheckboxValidations;
}

interface Checkbox {
  name: string;
  label: string;
  defaultValue?: boolean;
}

export interface MultiCheckboxDataProps extends BaseInputComponentDataProps<any> {
  checkboxes?: Checkbox[];
}

export interface MultiCheckboxProps extends BaseInputComponentProps<any> {
  data?: MultiCheckboxDataProps;
  validations?: MultiCheckboxValidations;
}

export type ButtonStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface ButtonDisplaySchema extends BaseComponentDisplayProps {
  leftIcon?: string;
  rightIcon?: string;
}

export interface ButtonProps extends BaseComponentProps {
  text: string;
  display?: ButtonDisplaySchema;
  style?: ButtonStyle;
}

// INPUT COMPONENTS
export const TextFieldTypeName = 'text';
export const TextAreaTypeName = 'textarea';
export const PasswordTypeName = 'password';
export const NumberTypeName = 'number';
export const EmailTypeName = 'email';
export const ButtonTypeName = 'button';
export const CheckboxTypeName = 'checkbox';
export const MultiCheckboxTypeName = 'multi-checkbox';

export type TextFieldType = 'text';
export type TextAreaType = 'textarea';
export type PasswordType = 'password';
export type NumberType = 'number';
export type EmailType = 'email';
export type ButtonType = 'button';
export type CheckboxType = 'checkbox';
export type MultiCheckboxType = 'multi-checkbox';

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

export interface CheckboxSchema extends CheckboxProps, BaseComponentSchema {
  type: CheckboxType,
}

export interface MultiCheckboxSchema extends MultiCheckboxProps, BaseComponentSchema {
  type: MultiCheckboxType,
}

export type InputComponentType =
  | TextFieldType
  | TextAreaType
  | NumberType
  | EmailType
  | ButtonType
  | PasswordType
  | CheckboxType
  | MultiCheckboxType;

export type InputComponentSchema =
  | TextFieldSchema
  | TextAreaSchema
  | NumberSchema
  | EmailSchema
  | ButtonSchema
  | PasswordSchema
  | CheckboxSchema
  | MultiCheckboxSchema;
