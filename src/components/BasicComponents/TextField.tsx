import React from 'react';
import { TextFieldSchema, ThoraComponent } from '../../types/ComponentSchema';
import ThoraBaseTextInput from '../ThoraBaseTextInput';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import classNames from 'classnames';

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
        <ThoraBaseTextInput {...props} className={classNames(['thora-textfield', props.className])} validate={textFieldValidate}/>
    );
}

TextField.validateSchema = (_component: any) => {
    return true;
};

TextField.checkRerender = (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.display === nextProps.display;
}

export default React.memo<ThoraTextFieldProps>(props => <TextField {...props}/>, TextField.checkRerender);