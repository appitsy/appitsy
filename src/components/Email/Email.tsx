import React from 'react';
import { ThoraComponent, EmailSchema } from '../../types/ComponentSchema';
import TextField from '../TextField/TextField';
import { ValidateEmail } from '../../utilities/Validations';

interface EmailProps extends EmailSchema {
    className: string;
    value: string;
    onValueChange(value: string): void;
}

const Email: ThoraComponent<EmailProps> = (props) => {
    const emailValidate = (value: string, validate: () => string | null): string | null => {
        return ValidateEmail(value) || validate();
    }

    return (
        <TextField 
            type='textfield' 
            inputType='email' 
            className={props.className} 
            name={props.name} 
            value={props.value} 
            validate={emailValidate} 
            validations={props.validations || {}}
            onValueChange={props.onValueChange} /> 
    );
}

Email.validateSchema = (_component: any) => {
    return true;
};

export default React.memo<EmailProps>(props => <Email {...props}/>, (prevProps, nextProps) => prevProps.value === nextProps.value);