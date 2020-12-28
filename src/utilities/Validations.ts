import _ from "lodash";

export interface RequiredValidations {
  required?: boolean;
}

export interface MinMaxLengthValidations {
  minLength?: number;
  maxLength?: number;
}

export interface MinMaxNumberValidations {
  min?: number;
  max?: number;
}

export interface MinMaxSelectionValidations {
  minSelected?: number;
  maxSelected?: number;
}

export interface RegexValidations {
  regex: RegExp;
}

export interface BaseInputComponentValidations extends RequiredValidations {}
export interface BaseTextComponentValidations extends RequiredValidations, MinMaxLengthValidations {}
export type TextFieldValidations = BaseTextComponentValidations;
export type TextAreaValidations = BaseTextComponentValidations;
export type PasswordValidations = BaseTextComponentValidations;
export interface NumberValidations extends RequiredValidations, MinMaxLengthValidations, MinMaxNumberValidations { }
export type CheckboxValidations = RequiredValidations;
export interface MultiCheckboxValidations extends RequiredValidations, MinMaxSelectionValidations {}

export const ValidateRequiredBool = (validations: RequiredValidations, value: boolean): string | null => (
  validations.required && value !== true
    ? 'Field is required'
    : null
);

export const ValidateRequired = (validations: RequiredValidations, value: string): string | null => (
  validations.required && value?.length === 0
    ? 'Field is required'
    : null
);

export const ValidateMinMaxLength = (validations: MinMaxLengthValidations, value: string): string | null => {
  if (validations.minLength && value?.length < validations.minLength) {
    return `Field should have a min of ${validations.minLength} chars`;
  }

  if (validations.maxLength && value?.length > validations.maxLength) {
    return `Field should have a max of ${validations.maxLength} chars`;
  }

  return null;
};

export const ValidateMinMaxNumber = (validation: MinMaxNumberValidations, value: number): string | null => {
  if (validation.min !== undefined && value < validation.min) {
    return `Field should can have min value '${validation.min}'`;
  }

  if (validation.max !== undefined && value > validation.max) {
    return `Field should can have max value '${validation.max}'`;
  }

  return null;
};

export const ValidateMinMaxSelection = (validation: MinMaxSelectionValidations, value: any): string | null => {
  const selected = _.filter(value, x => x === true).length;
  if (validation.maxSelected !== undefined && selected > validation.maxSelected) {
    return `Maximum of ${validation.maxSelected} items can be selected`;
  }

  if (validation.minSelected !== undefined && selected < validation.minSelected) {
    return `Minimum of ${validation.minSelected} need to be selected`;
  }

  return null;
};

export const ValidateRegex = (validation: RegexValidations, value: string): string | null => (
  validation.regex.test(value) ? null : `Field doesn't match regex ${validation.regex.toString()}`
);

export const ValidateEmail = (value: string): string | null => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(value) ? null : 'Field should be a valid email id';
};
