import { TextFieldValidations, TextAreaValidations, NumberValidations, BaseTextComponentValidations } from "../utilities/Validations";

export interface BaseComponentSchema {
    name: string;
    type: string;
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
export type NumberType ='textarea';
export type EmailType = 'email';
export type ButtonType ='button';

export type PanelType = 'panel';

export interface BaseTextComponentSchema<T> extends BaseComponentSchema {
    display?: {
        labelPosition?: LabelPosition;
        errorPosition?: ErrorPosition;
    }
    data?: {
        defaultValue?: T;
    }
    validations?: BaseTextComponentValidations;
}

export interface TextFieldSchema extends BaseTextComponentSchema<string> {
    type: TextFieldType;
    validations?: TextFieldValidations;
}

export interface EmailSchema extends BaseTextComponentSchema<string> {
    type: EmailType;
    validations?: TextFieldValidations;
}

export interface TextAreaSchema extends BaseTextComponentSchema<string> {
    type: TextAreaType;
    validations?: TextAreaValidations;
}

export interface NumberSchema extends BaseTextComponentSchema<number> {
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

export interface PanelDisplayOptions {
    header?: PanelHeader;
    border?: string;
    borderRadius?: string;
}

export interface PanelSchema extends BaseComponentSchema {
    type: PanelType;
    components: BaseComponentSchema[]
    collapsible?: boolean;
    collapsed?: boolean;
    display?: PanelDisplayOptions;
}

export interface CustomComponentSchema extends BaseComponentSchema {
    type: string;
    [x: string]: any;
}

export type ComponentSchema = TextFieldSchema | TextAreaSchema | NumberSchema | EmailSchema | ButtonSchema | PanelSchema | CustomComponentSchema;

export interface ThoraComponent<T> extends React.FC<T> {
    validateSchema(component: any): boolean;
}
