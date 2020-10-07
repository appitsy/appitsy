import React from 'react';
import { TextFieldSchema, AppComponent } from '../../types/ComponentSchema';
import BaseTextInputComponent from '../BaseTextInputComponent';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import classNames from 'classnames';

interface TextFieldProps extends TextFieldSchema {
    className: string;
    value: string;
    validate?(value: string, textFieldValidate: () => string | null): string | null;
    onValueChange(value: string): void;
}

const TextField: AppComponent<TextFieldProps> = (props) => {
    const textFieldValidate = (value: string): string | null => {
        return  ValidateRequired(props.validations!, value) || 
                ValidateMinMaxLength(props.validations!, value);
    }

    return (
        <BaseTextInputComponent {...props} className={classNames(['appitsy-textfield', props.className])} validate={textFieldValidate}/>
    );
}

TextField.validateSchema = (_component: any) => {
    return true;
};

TextField.checkRerender = (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.display === nextProps.display;
}

export default React.memo<TextFieldProps>(props => <TextField {...props}/>, TextField.checkRerender);