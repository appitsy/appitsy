import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { BaseTextInputComponentSchema } from '../types/ComponentSchema';
import Label from './BasicComponents/Label';
import ErrorLabel from './BasicComponents/ErrorLabel';
import { Flex } from './Layout/Flex';
import { labelPositionToFlexDirection } from '../utilities/FlexPositions';
import Description from './BasicComponents/Description';

interface ThoraBaseTextInputProps<T> extends BaseTextInputComponentSchema<T> {
    inputType?: 'textfield' | 'textarea' | 'email' | 'number' | 'password';
    className: string;
    value: T;
    validate(value: T): string | null;
    onValueChange(value: T): void;
}

interface ThoraBaseTextInputState {
    touched?: boolean;
}

const ThoraBaseTextInput = <T extends string | number>(props: ThoraBaseTextInputProps<T>) => {
    const [state, setState] = useState<ThoraBaseTextInputState>({});
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
            childEl = 
                <input  type={props.inputType} 
                        name={props.name} 
                        value={ props.value || '' } 
                        placeholder={props.display?.placeholder} 
                        onChange={(evt) => onChange(evt.target.value as T)}
                        disabled={props.display?.disabled} 
                />;
            break;
        case 'textarea':
            childEl = 
                <textarea   name={props.name} 
                            value={ props.value || ''} 
                            placeholder={props.display?.placeholder} 
                            onChange={(evt) => onChange(evt.target.value as T)} 
                            disabled={props.display?.disabled} 
                />;
            break;
        case 'number':
            childEl = 
                <input  type={props.inputType} 
                        name={props.name} 
                        value={ props.value || 0 } 
                        placeholder={props.display?.placeholder} 
                        onChange={(evt) => onChange(evt.target.value as T)} 
                        disabled={props.display?.disabled} 
                />;
    }

    const wrapInPrefixSuffix = (elem?: JSX.Element) => (
        <div>
            { props.display?.prefix ? <span>{ props.display?.prefix }</span> : null }
            { elem }
            { props.display?.suffix ? <span>{ props.display?.suffix }</span> : null }
        </div>
    )
    
    const classes = classNames(props.className, { 'thora-hidden': props.display?.hidden });

    return (
        <Flex className={classes} flexDirection={labelPositionToFlexDirection(props.display?.labelPosition)}>
            <Label text={props.name} tooltip={props.display?.tooltip} />
            {/* errorPositionToFlexDirection(props.display?.errorPosition) */}
            <Flex flexDirection={'column'} margin={false}>
                { props.display?.prefix || props.display?.suffix ? wrapInPrefixSuffix(childEl) : childEl }
                <Description text={props.display?.description}/>
                <ErrorLabel error={validationError} />
            </Flex>
        </Flex>
    );
}

ThoraBaseTextInput.validateSchema = (_component: any) => {
    return true;
};

ThoraBaseTextInput.defaultProps = {
    inputType: 'textfield',
}

export default ThoraBaseTextInput;