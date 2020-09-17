import React, { useEffect, useState } from 'react';
import { BaseTextInputComponentSchema } from '../types/ComponentSchema';
import Label from './BasicComponents/Label';
import ErrorLabel from './BasicComponents/ErrorLabel';
import { Flex } from './Layout/Flex';
import { labelPositionToFlexDirection } from '../utilities/FlexPositions';
import Styled from '../Styled';

interface ThoraBaseComponentProps<T> extends BaseTextInputComponentSchema<T> {
    inputType?: 'textfield' | 'textarea' | 'email' | 'number' | 'password';
    className: string;
    value: T;
    validate(value: T): string | null;
    onValueChange(value: T): void;
}

interface ThoraBaseComponentState {
    touched?: boolean;
}

const Description = Styled.span`
    color: grey
`;

const ThoraBaseComponent = <T extends string | number>(props: ThoraBaseComponentProps<T>) => {
    const [state, setState] = useState<ThoraBaseComponentState>({});
    let validationError = '';

    const onChange = (value: T) => {
        setState((prevState: any) => ({
            ...prevState,
            touched: true,
        }));

        return props.onValueChange(value);
    }

    useEffect(() => {
        const defaultVal = (typeof props.value === 'number' ? 0 : '') as T;
        props.onValueChange(props.value || props.data?.defaultValue || defaultVal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (props.validations && state.touched) {
        validationError = (props.validate(props.value)) || '';
    }

    let childEl;
    switch (props.inputType) {
        case 'textfield':
        case 'email':
        case 'password':
            childEl = <input type={props.inputType} name={props.name} value={ props.value || '' } placeholder={props.display?.placeholder} onChange={(evt) => onChange(evt.target.value as T)} />;
            break;
        case 'textarea':
            childEl = <textarea name={props.name} value={ props.value || ''} placeholder={props.display?.placeholder} onChange={(evt) => onChange(evt.target.value as T)} />;
            break;
        case 'number':
            childEl = <input type={props.inputType} name={props.name} value={ props.value || 0 } placeholder={props.display?.placeholder} onChange={(evt) => onChange(evt.target.value as T)} />
        }

    return (
        <Flex className={props.className} flexDirection={labelPositionToFlexDirection(props.display?.labelPosition)}>
            <Label text={props.name} tooltip={props.display?.tooltip} />
            {/* errorPositionToFlexDirection(props.display?.errorPosition) */}
            <Flex flexDirection={'column'} margin={false}>
                { childEl }
                <Description>{ props.display?.description }</Description>
                <ErrorLabel error={validationError} />
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

export default ThoraBaseComponent;