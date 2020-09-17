import React, {  } from 'react';
import { PasswordSchema, ThoraComponent } from '../../types/ComponentSchema';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import ThoraBaseComponent from '../ThoraBaseComponent';

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
        <ThoraBaseComponent inputType='password' {...props} validate={passwordValidate}/>
    );
}

Password.validateSchema = (_component: any) => {
    return true;
};

export default React.memo<ThoraPasswordProps>(
    props => <Password {...props}/>, 
    (prevProps, nextProps) => prevProps.value === nextProps.value
);