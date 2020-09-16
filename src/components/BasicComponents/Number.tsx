import React, {  } from 'react';
import { NumberSchema, ThoraComponent } from '../../types/ComponentSchema';
import { ValidateRequired, ValidateMinMaxNumber } from '../../utilities/Validations';
import ThoraBaseComponent from '../ThoraBaseComponent';

interface ThoraNumberProps extends NumberSchema {
    className: string;
    value: number;
    onValueChange(value: number): void;
}

const TextField: ThoraComponent<ThoraNumberProps> = (props) => {
    const textFieldValidate = (value: number): string | null => {
        return  ValidateRequired(props.validations!, value.toString()) || 
                ValidateMinMaxNumber(props.validations!, value);
    }

    return (
        <ThoraBaseComponent inputType='number' {...props} validate={textFieldValidate}/>
    );
}

TextField.validateSchema = (_component: any) => {
    return true;
};

export default React.memo<ThoraNumberProps>(
    props => <TextField {...props}/>, 
    (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.display === nextProps.display
);