import React from 'react';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';
import classNames from 'classnames';
import { AppComponent } from '../../types/AppComponent';
import { TextAreaProps } from '../../types/InputComponentSchema';

interface TextAreaComponentProps extends TextAreaProps {
    className: string;
    value: string;
    validate?(value: string, textFieldValidate: () => string | null): string | null;
    onValueChange(value: string): void;
}

const TextArea: AppComponent<TextAreaComponentProps> = (props) => {
    const textAreaValidate = (value: string): string | null => {
        return  ValidateRequired(props.validations!, value) ||
                ValidateMinMaxLength(props.validations!, value);
    }

    return (
        <BaseTextInputComponent {...props} className={classNames(['appitsy-textarea', props.className])} validate={textAreaValidate}/>
    );
}

TextArea.validateSchema = (_component: any) => {
    return true;
};

TextArea.checkRerender = (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.display === nextProps.display;
}

export default React.memo<TextAreaComponentProps>(props => <TextArea {...props}/>, TextArea.checkRerender);
