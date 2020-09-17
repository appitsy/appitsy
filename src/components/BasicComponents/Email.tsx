import React from 'react';
import { ThoraComponent, EmailSchema } from '../../types/ComponentSchema';
import { ValidateEmail, ValidateMinMaxLength, ValidateRequired } from '../../utilities/Validations';
import ThoraBaseTextInput from '../ThoraBaseTextInput';

interface EmailProps extends EmailSchema {
    className: string;
    value: string;
    onValueChange(value: string): void;
}

const Email: ThoraComponent<EmailProps> = (props) => {
    const emailValidate = (value: string): string | null => {
        return  ValidateRequired(props.validations!, value) || 
                ValidateMinMaxLength(props.validations!, value) || 
                ValidateEmail(value);
    }

    return (
        <ThoraBaseTextInput
            {...props} 
            type='textfield'
            inputType='email' 
            validate={emailValidate} /> 
    );
}

Email.validateSchema = (_component: any) => {
    return true;
};

export default React.memo<EmailProps>(
    props => <Email {...props}/>, 
    (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.display === nextProps.display
);