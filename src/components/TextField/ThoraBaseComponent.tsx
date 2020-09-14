import React, { useEffect, useState } from 'react';
import { TextFieldSchema, ThoraComponent } from '../../types/ComponentSchema';
import Label from '../Labels/Label';
import ErrorLabel from '../Labels/ErrorLabel';
import { Flex } from '../Flex/Flex';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import { errorPositionToFlexDirection, labelPositionToFlexDirection } from '../../utilities/FlexPositions';

interface ThoraBaseComponentProps extends TextFieldSchema {
    inputType?: 'textfield' | 'textarea' | 'email' | 'number';
    className: string;
    value: string;
    validate?(value: string, baseValidate: () => string | null): string | null;
    onValueChange(value: string | number): void;
}

interface ThoraBaseComponentState {
    touched?: boolean;
}

const ThoraBaseComponent: ThoraComponent<ThoraBaseComponentProps> = (props) => {
    const [state, setState] = useState<ThoraBaseComponentState>({});
    let validationError = '';

    const onChange = (value: string | number) => {
        setState((prevState: any) => ({
            ...prevState,
            touched: true,
        }));

        return props.onValueChange(value);
    }

    const validate = (): string | null => ValidateRequired(props.validations!, props.value) || ValidateMinMaxLength(props.validations!, props.value);

    useEffect(() => {
        props.onValueChange(props.value || props.data?.defaultValue || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (props.validations && state.touched) {
        validationError = (props.validate ? props.validate(props.value, validate) : validate()) || '';
    }

    let childEl;
    switch (props.inputType) {
        case 'textfield':
        case 'email':
            childEl = <input type={props.inputType} name={props.name} value={ props.value || '' } onChange={(evt) => onChange(evt.target.value)} />;
            break;
        case 'textarea':
            childEl = <textarea name={props.name} value={ props.value } onChange={(evt) => onChange(evt.target.value)} />;
            break;
        case 'number':
            childEl = <input type='number' name={props.name} value={ props.value || 0 } onChange={(evt) => onChange(+evt.target.value)} />
    }

    return (
        <Flex className={props.className} flexDirection={labelPositionToFlexDirection(props.display?.labelPosition)}>
            <Label text={props.name} />
            <Flex flexDirection={errorPositionToFlexDirection(props.display?.errorPosition)} margin={false}>
                { childEl }
                <ErrorLabel text={validationError} />
            </Flex>
        </Flex>
    );
}

ThoraBaseComponent.validateSchema = (_component: any) => {
    return true;
};

ThoraBaseComponent.defaultProps = {
    inputType: 'textfield',
}

export default React.memo<ThoraBaseComponentProps>(props => <ThoraBaseComponent {...props}/>, (prevProps, nextProps) => prevProps.value === nextProps.value);