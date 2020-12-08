import React, {  } from 'react';
import { ValidateRequired, ValidateMinMaxNumber } from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';
import classNames from 'classnames';
import { AppComponent } from '../../types/AppComponent';
import { NumberProps } from '../../types/InputComponentSchema';

interface NumberComponentProps extends NumberProps {
    className: string;
    value: number;
    path?: string;
    onValueChange(value: number): void;
}

const Number: AppComponent<NumberComponentProps> = (props) => {
    const textFieldValidate = (value: number): string | null => {
        return  ValidateRequired(props.validations!, value.toString()) ||
                ValidateMinMaxNumber(props.validations!, value);
    }

    return (
        <BaseTextInputComponent inputType='number' {...props} className={classNames(['appitsy-number', props.className])} validate={textFieldValidate}/>
    );
}

Number.validateSchema = (_component: any) => {
    return true;
};

Number.checkRerender = (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.display === nextProps.display;
}

export default React.memo<NumberComponentProps>(props => <Number {...props}/>, Number.checkRerender);
