import React from 'react';
import { ValidateEmail, ValidateMinMaxLength, ValidateRequired } from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';
import classNames from 'classnames';
import { AppComponent } from '../../types/AppComponent';
import { EmailSchema } from '../../types/InputComponentSchema';

interface EmailProps extends EmailSchema {
    className: string;
    value: string;
    onValueChange(value: string): void;
}

const Email: AppComponent<EmailProps> = (props) => {
    const emailValidate = (value: string): string | null => {
        return  ValidateRequired(props.validations!, value) ||
                ValidateMinMaxLength(props.validations!, value) ||
                ValidateEmail(value);
    }

    return (
        <BaseTextInputComponent
            {...props}
            className={classNames(['appitsy-email', props.className])}
            type='text'
            inputType='email'
            validate={emailValidate} />
    );
}

Email.validateSchema = (_component: any) => {
    return true;
};

Email.checkRerender = (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.display === nextProps.display;
}

export default React.memo<EmailProps>(props => <Email {...props}/>, Email.checkRerender);
