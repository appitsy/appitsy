import React, {  } from 'react';
import { PasswordSchema, AppComponent } from '../../types/ComponentSchema';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';
import classNames from 'classnames';

interface PasswordProps extends PasswordSchema {
    className: string;
    value: string;
    onValueChange(value: string): void;
}

const Password: AppComponent<PasswordProps> = (props) => {
    const passwordValidate = (value: string): string | null => {
        return  ValidateRequired(props.validations!, value) || 
                ValidateMinMaxLength(props.validations!, value);
    }

    return (
        <BaseTextInputComponent inputType='password' {...props} className={classNames(['appitsy-password', props.className])} validate={passwordValidate}/>
    );
}

Password.validateSchema = (_component: any) => {
    return true;
};

Password.checkRerender = (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.display === nextProps.display;
}

export default React.memo<PasswordProps>(props => <Password {...props}/>, Password.checkRerender);