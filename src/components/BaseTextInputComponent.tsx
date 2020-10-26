import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Label from './BasicComponents/Label';
import ErrorLabel from './BasicComponents/ErrorLabel';
import { Flex } from './Layout/Flex';
import { labelPositionToFlexDirection } from '../utilities/FlexPositions';
import Description from './BasicComponents/Description';
import { BaseTextInputComponentSchema } from '../types/InputComponentSchema';

interface BaseTextInputProps<T> extends BaseTextInputComponentSchema<T> {
    inputType?: 'text' | 'textarea' | 'email' | 'number' | 'password';
    className: string;
    value: T;
    validate(value: T): string | null;
    onValueChange(value: T): void;
}

interface BaseTextInputState {
    touched?: boolean;
}

const BaseTextInputComponent = <T extends string | number>(props: BaseTextInputProps<T>) => {
    const [state, setState] = useState<BaseTextInputState>({});

    useEffect(() => {
        const defaultVal = (typeof props.value === 'number' ? 0 : '') as T;
        props.onValueChange(props.value || props.data?.defaultValue || defaultVal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let validationError = '';
    const onChange = (value: T) => {
        setState((prevState: any) => ({
            ...prevState,
            touched: true,
        }));

        return props.onValueChange(value);
    }

    if (props.validations && state.touched) {
        validationError = (props.validate(props.value)) || '';
    }

    let childEl;
    switch (props.inputType) {
        case 'text':
        case 'email':
        case 'password':
            childEl =
                <input  id={props.name}
                        type={props.inputType}
                        name={props.name}
                        value={ props.value || '' }
                        placeholder={props.display?.placeholder}
                        onChange={(evt) => onChange(evt.target.value as T)}
                        disabled={props.display?.disabled}
                        className='appitsy-form-control'
                />;
            break;
        case 'textarea':
            childEl =
                <textarea   id={props.name}
                            name={props.name}
                            value={ props.value || ''}
                            placeholder={props.display?.placeholder}
                            onChange={(evt) => onChange(evt.target.value as T)}
                            disabled={props.display?.disabled}
                            className='appitsy-form-control'
                />;
            break;
        case 'number':
            childEl =
                <input  id={props.name}
                        type={props.inputType}
                        name={props.name}
                        value={ props.value || 0 }
                        placeholder={props.display?.placeholder}
                        onChange={(evt) => onChange(evt.target.value as T)}
                        disabled={props.display?.disabled}
                        className='appitsy-form-control'
                />;
    }

    const wrapInPrefixSuffix = (elem?: JSX.Element) => (
        <Flex flexDirection='row' className={'appitsy-input-group'}>
            { props.display?.prefix ? <div className='appitsy-input-prefix'><span className='appitsy-input-prefix-text'>{ props.display?.prefix }</span></div> : null }
            { elem }
            { props.display?.suffix ? <div className='appitsy-input-suffix'><span className='appitsy-input-suffix-text'>{ props.display?.suffix }</span></div> : null }
        </Flex>
    )

    const classes = classNames(props.className, { 'appitsy-hidden': props.display?.hidden }, 'appitsy-input');

    return (
        <Flex className={classes} flexDirection={labelPositionToFlexDirection(props.display?.labelPosition)}>
            <Label for={props.name} text={props.name} tooltip={props.display?.tooltip} />
            {/* errorPositionToFlexDirection(props.display?.errorPosition) */}
            <Flex flexDirection={'column'}>
                { props.display?.prefix || props.display?.suffix ? wrapInPrefixSuffix(childEl) : childEl }
                <Description text={props.display?.description}/>
                <ErrorLabel error={validationError} />
            </Flex>
        </Flex>
    );
}

BaseTextInputComponent.validateSchema = (_component: any) => {
    return true;
};

BaseTextInputComponent.defaultProps = {
    inputType: 'text',
}

export default BaseTextInputComponent;
