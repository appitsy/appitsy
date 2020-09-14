import React, { useEffect, useState } from 'react';
import { TextFieldSchema, ThoraComponent } from '../../types/ComponentSchema';
import Label from '../Labels/Label';
import ErrorLabel from '../Labels/ErrorLabel';
import { Flex } from '../Flex/Flex';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import { errorPositionToFlexDirection, labelPositionToFlexDirection } from '../../utilities/FlexPositions';

interface ThoraTextFieldProps extends TextFieldSchema {
    inputType?: 'text' | 'email';
    className: string;
    value: string;
    validate?(value: string, textFieldValidate: () => string | null): string | null;
    onValueChange(value: string): void;
}

interface TextFieldState {
    touched?: boolean;
}

const TextField: ThoraComponent<ThoraTextFieldProps> = (props) => {
    const [state, setState] = useState<TextFieldState>({});
    let validationError = '';

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState: any) => ({
            ...prevState,
            touched: true,
        }));

        return props.onValueChange(evt.target.value);
    }

    const validate = (): string | null => {
        return  ValidateRequired(props.validations!, props.value) || 
                ValidateMinMaxLength(props.validations!, props.value);
    }

    useEffect(() => {
        props.onValueChange(props.value || props.data?.defaultValue || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (props.validations && state.touched) {
        validationError = (props.validate ? props.validate(props.value, validate) : validate()) || '';
    }

    return (
        <Flex className={props.className} flexDirection={labelPositionToFlexDirection(props.display?.labelPosition)}>
            <Label text={props.name} />
            <Flex flexDirection={errorPositionToFlexDirection(props.display?.errorPosition)} margin={false}>
                <input type={props.inputType} name={props.name} value={ props.value || '' } onChange={onChange} />
                <ErrorLabel text={validationError} />
            </Flex>
        </Flex>
    );
}

TextField.validateSchema = (_component: any) => {
    return true;
};

TextField.defaultProps = {
    inputType: 'text',
}

export default React.memo<ThoraTextFieldProps>(props => <TextField {...props}/>, (prevProps, nextProps) => prevProps.value === nextProps.value);