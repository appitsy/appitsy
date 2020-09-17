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

export interface RegexValidations {
    regex: RegExp;
}

export interface BaseTextComponentValidations extends RequiredValidations, MinMaxLengthValidations {}
export interface TextFieldValidations extends BaseTextComponentValidations { }
export interface TextAreaValidations extends BaseTextComponentValidations { }
export interface PasswordValidations extends BaseTextComponentValidations { }
export interface NumberValidations extends RequiredValidations, MinMaxLengthValidations, MinMaxNumberValidations { }

export const ValidateRequired = (validations: RequiredValidations, value: string): string | null => {
    return validations.required && value.length === 0
        ? 'Field is required'
        : null;
}

export const ValidateMinMaxLength = (validations: MinMaxLengthValidations, value: string): string | null => {
    if (validations.minLength && value.length < validations.minLength) {
        return `Field should have a min of ${validations.minLength} chars`;
    } else if (validations.maxLength && value.length > validations.maxLength) {
        return `Field should have a max of ${validations.maxLength} chars`;
    }

    return null;
}

export const ValidateMinMaxNumber = (validation: MinMaxNumberValidations, value: number): string | null => {
    if (validation.min !== undefined && value < validation.min) {
        return `Field should can have min value '${validation.min}'`
    } else if (validation.max !== undefined && value > validation.max) {
        return `Field should can have max value '${validation.max}'`
    }

    return null;
}

export const ValidateRegex = (validation: RegexValidations, value: string): string | null => {
    return validation.regex.test(value) ? null : `Field doesn't match regex ${validation.regex}`;
}

export const ValidateEmail = (value: string): string | null => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value) ? null : `Field should be a valid email id`;
}