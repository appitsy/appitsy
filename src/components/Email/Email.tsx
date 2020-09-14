import React from 'react';
import { ThoraComponent, EmailSchema } from '../../types/ComponentSchema';
import { ValidateEmail } from '../../utilities/Validations';
import ThoraBaseComponent from '../TextField/ThoraBaseComponent';

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
        <ThoraBaseComponent
            {...props} 
            type='textfield'
            inputType='email' 
            validate={emailValidate} /> 
    );
}

Email.validateSchema = (_component: any) => {
    return true;
};

export default Email;