import React, {  } from 'react';
import { NumberSchema, ThoraComponent } from '../../types/ComponentSchema';
import { ValidateRequired, ValidateMinMaxNumber } from '../../utilities/Validations';
import ThoraBaseTextInput from '../ThoraBaseTextInput';
import classNames from 'classnames';

interface ThoraNumberProps extends NumberSchema {
    className: string;
    value: number;
    onValueChange(value: number): void;
}

const Number: ThoraComponent<ThoraNumberProps> = (props) => {
    const textFieldValidate = (value: number): string | null => {
        return  ValidateRequired(props.validations!, value.toString()) || 
                ValidateMinMaxNumber(props.validations!, value);
    }

    return (
        <ThoraBaseTextInput inputType='number' {...props} className={classNames(['thora-number', props.className])} validate={textFieldValidate}/>
    );
}

Number.validateSchema = (_component: any) => {
    return true;
};

Number.checkRerender = (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.display === nextProps.display;
}

export default React.memo<ThoraNumberProps>(props => <Number {...props}/>, Number.checkRerender);