import React, {  } from 'react';
import { NumberSchema, AppComponent } from '../../types/ComponentSchema';
import { ValidateRequired, ValidateMinMaxNumber } from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';
import classNames from 'classnames';

interface NumberProps extends NumberSchema {
    className: string;
    value: number;
    onValueChange(value: number): void;
}

const Number: AppComponent<NumberProps> = (props) => {
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

export default React.memo<NumberProps>(props => <Number {...props}/>, Number.checkRerender);