import React from 'react';
import { TextFieldSchema, ThoraComponent } from '../../types/ComponentSchema';
import ThoraBaseComponent from './ThoraBaseComponent';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';

interface ThoraTextFieldProps extends TextFieldSchema {
    className: string;
    value: string;
    validate?(value: string, textFieldValidate: () => string | null): string | null;
    onValueChange(value: string): void;
}

const TextField: ThoraComponent<ThoraTextFieldProps> = (props) => {
    const textFieldValidate = (value: string): string | null => {
        return  ValidateRequired(props.validations!, value) || 
                ValidateMinMaxLength(props.validations!, value);
    }

    return (
        <ThoraBaseComponent {...props} validate={textFieldValidate}/>
    );
}

TextField.validateSchema = (_component: any) => {
    return true;
};

export default React.memo<ThoraTextFieldProps>(
    props => <TextField {...props}/>, 
    (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.display === nextProps.display
);