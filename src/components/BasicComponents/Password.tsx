import React, {  } from 'react';
import { NumberSchema, ThoraComponent } from '../../types/ComponentSchema';
import { ValidateRequired, ValidateMinMaxNumber } from '../../utilities/Validations';
import ThoraBaseComponent from '../ThoraBaseComponent';

interface ThoraPasswordProps extends NumberSchema {
    className: string;
    value: number;
    onValueChange(value: number): void;
}

const Password: ThoraComponent<ThoraPasswordProps> = (props) => {
    const passwordValidate = (value: number): string | null => {
        return  ValidateRequired(props.validations!, value.toString()) || 
                ValidateMinMaxNumber(props.validations!, value);
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