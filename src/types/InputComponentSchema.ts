import {
  BaseInputComponentValidations,
  BaseTextComponentValidations,
  CheckboxValidations,
  MultiCheckboxValidations,
  NumberValidations,
  PasswordValidations,
  TextAreaValidations,
  TextFieldValidations,
} from '../utilities/Validations';
import {
  BaseComponentDataProps,
  BaseComponentDisplayProps,
  BaseComponentProps,
  BaseComponentSchema,
  ErrorPosition,
  LabelPosition,
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
  value: string;
  label: string;
}

export interface MultiCheckboxDataProps extends BaseInputComponentDataProps<any> {
  checkboxes?: Checkbox[];
}

export interface MultiCheckboxProps extends BaseInputComponentProps<any> {
  data?: MultiCheckboxDataProps;
  validations?: MultiCheckboxValidations;
}

interface Option {
  value: string;
  label: string;
}

export interface SelectDataProps extends BaseInputComponentDataProps<string | string[]> {
  options: Option[];
  allowMultiSelection?: boolean;
}

export interface SelectProps extends BaseInputComponentProps<string | string[]> {
  data?: SelectDataProps;
}

export interface RadioDataProps extends BaseInputComponentDataProps<string> {
  options: Option[];
}

export interface RadioProps extends BaseInputComponentProps<string> {
  data?: RadioDataProps;
}

export type ButtonStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface ButtonDisplaySchema extends BaseComponentDisplayProps {
  leftIcon?: string;
  rightIcon?: string;
}

export interface ButtonProps extends BaseComponentProps {
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
export const SelectTypeName = 'select';
export const RadioTypeName = 'radio';

export const TextFieldTypeDisplayName = 'Text Field';
export const TextAreaTypeDisplayName = 'Text Area';
export const PasswordTypeDisplayName = 'Password';
export const NumberTypeDisplayName = 'Number';
export const EmailTypeDisplayName = 'Email';
export const ButtonTypeDisplayName = 'Button';
export const CheckboxTypeDisplayName = 'Checkbox';
export const MultiCheckboxTypeDisplayName = 'Multi Checkbox';
export const SelectTypeDisplayName = 'Select';
export const RadioTypeDisplayName = 'Radio Buttons';

export type TextFieldType = 'text';
export type TextAreaType = 'textarea';
export type PasswordType = 'password';
export type NumberType = 'number';
export type EmailType = 'email';
export type ButtonType = 'button';
export type CheckboxType = 'checkbox';
export type MultiCheckboxType = 'multi-checkbox';
export type SelectType = 'select';
export type RadioType = 'radio';

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

export interface SelectSchema extends SelectProps, BaseComponentSchema {
  type: SelectType,
}

export interface RadioSchema extends RadioProps, BaseComponentSchema {
  type: RadioType,
}

export type InputComponentType =
  | TextFieldType
  | TextAreaType
  | NumberType
  | EmailType
  | ButtonType
  | PasswordType
  | CheckboxType
  | MultiCheckboxType
  | SelectType
  | RadioType;

export type InputComponentSchema =
  | TextFieldSchema
  | TextAreaSchema
  | NumberSchema
  | EmailSchema
  | ButtonSchema
  | PasswordSchema
  | CheckboxSchema
  | MultiCheckboxSchema
  | SelectSchema
  | RadioSchema;
