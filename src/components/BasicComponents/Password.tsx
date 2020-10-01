import React, {  } from 'react';
import { PasswordSchema, ThoraComponent } from '../../types/ComponentSchema';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import ThoraBaseTextInput from '../ThoraBaseTextInput';
import classNames from 'classnames';

interface ThoraPasswordProps extends PasswordSchema {
    className: string;
    value: string;
    onValueChange(value: string): void;
}

const Password: ThoraComponent<ThoraPasswordProps> = (props) => {
    const passwordValidate = (value: string): string | null => {
        return  ValidateRequired(props.validations!, value) || 
                ValidateMinMaxLength(props.validations!, value);
    }

    return (
        <ThoraBaseTextInput inputType='password' {...props} className={classNames(['thora-password', props.className])} validate={passwordValidate}/>
    );
}

Password.validateSchema = (_component: any) => {
    return true;
};

Password.checkRerender = (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.display === nextProps.display;
}

export default React.memo<ThoraPasswordProps>(props => <Password {...props}/>, Password.checkRerender);