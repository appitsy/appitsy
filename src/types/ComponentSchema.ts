import { TextFieldValidations, TextAreaValidations, NumberValidations, BaseTextComponentValidations, PasswordValidations } from "../utilities/Validations";
import { PropsWithChildren } from "react";

export interface BaseComponentSchema {
    name: string;
    type: string;
    display?: BaseComponentDisplaySchema;
    logic?: LogicSchema[];
}

export enum Types {
    TextField,
    TextArea,
    Button,
}

export type LabelPosition = 'left' | 'top';
export type ErrorPosition = 'right' | 'bottom';

export type TextFieldType ='textfield';
export type TextAreaType ='textarea';
export type PasswordType ='password';
export type NumberType ='number';
export type EmailType = 'email';
export type ButtonType ='button';

export type PanelType = 'panel';

export interface Condition {
    dependency?: {
        field: string;
        op: 'eq' | 'neq';
        value: string;
    };
    expression?: string;
}

export interface BaseComponentDisplaySchema {
    condition?: Condition;
}

export interface BaseInputComponentDisplaySchema extends BaseComponentDisplaySchema {
    labelPosition?: LabelPosition;
    errorPosition?: ErrorPosition;
    description?:  string;
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
    }
    validations?: BaseTextComponentValidations;
}

export interface BaseTextInputComponentSchema<T> extends BaseInputComponentSchema<T> {
    display?: BaseTextInputComponentDisplaySchema;
    data?: {
        defaultValue?: T;
    }
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

export interface ButtonSchema extends BaseComponentSchema {
    type: ButtonType;
    text: string;
}

export interface PanelHeader {
    color?: string;
    background?: string;
}

export interface PanelDisplaySchema extends BaseComponentDisplaySchema {
    header?: PanelHeader;
    border?: string;
    borderRadius?: string;
    collapsible?: boolean;
    collapsed?: boolean;
}

export interface PanelSchema extends BaseComponentSchema {
    type: PanelType;
    components?: ComponentSchema[]
    display?: PanelDisplaySchema;
}

export interface CustomComponentSchema extends BaseComponentSchema {
    type: string;
    [x: string]: any;
}

export interface LogicSchema {
    name: string;
    trigger: string;
    actions: ActionSchema[];
}

export interface ActionSchema {
    type: 'value' | 'updateComponent'
    value?: string;
    schema?: any;
}

export type ComponentSchema = TextFieldSchema | TextAreaSchema | NumberSchema | EmailSchema | ButtonSchema | PasswordSchema | PanelSchema | CustomComponentSchema;

export interface ThoraComponent<T> extends React.FC<T> {
    validateSchema(component: any): boolean;
    checkRerender(prevProps: Readonly<PropsWithChildren<T>>, nextProps: Readonly<PropsWithChildren<T>>): boolean;
}
