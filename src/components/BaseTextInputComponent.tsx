import React, {
  useEffect,
  useState,
} from 'react';

import classNames from 'classnames';

import {
  BaseTextInputComponentProps,
  EmailType,
  EmailTypeName,
  NumberType,
  NumberTypeName,
  PasswordType,
  PasswordTypeName,
  TextAreaType,
  TextAreaTypeName,
  TextFieldType,
  TextFieldTypeName,
} from '../types/InputComponentSchema';
import { labelPositionToFlexDirection } from '../utilities/FlexPositions';
import Description from './Basic/Description';
import ErrorLabel from './Basic/ErrorLabel';
import Label from './Basic/Label';
import { Flex } from './Layout/Flex';

interface BaseTextInputProps<T> extends BaseTextInputComponentProps<T> {
  inputType?: TextFieldType | TextAreaType | EmailType | NumberType | PasswordType;
  className?: string;
  defaultValue: T | undefined;
  validate(value: T | undefined): string | null;
  onValidationError?: (name: string, error?: string) => void;
  onValueChange?: (value: T | undefined) => void;
}

interface BaseTextInputState {
  touched?: boolean;
}

const BaseTextInputComponent = <T extends string | number>(props: BaseTextInputProps<T>): JSX.Element => {
  const [state, setState] = useState<BaseTextInputState>({});

  useEffect(() => {
    if (props.onValueChange) {
      props.onValueChange(props.defaultValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let validationError = '';
  const onChange = (value: T) => {
    setState((prevState: BaseTextInputState) => ({
      ...prevState,
      touched: true,
    }));

    if (props.onValueChange) {
      props.onValueChange(value);
    }
  };

  if (props.validations) {
    validationError = (props.validate(props.defaultValue)) || '';
    if (props.onValidationError) {
      props.onValidationError(props.name, validationError);
    }
  }

  let childEl;
  switch (props.inputType) {
    case TextFieldTypeName:
    case EmailTypeName:
    case PasswordTypeName:
      childEl = (
        <input
          id={props.name}
          type={props.inputType}
          name={props.name}
          defaultValue={props.defaultValue || ''}
          placeholder={props.display?.placeholder}
          onChange={(evt) => onChange(evt.target.value as T)}
          disabled={props.display?.disabled}
          className='appitsy-form-control'
          data-testid='textInputComponent'
        />
      );
      break;
    case TextAreaTypeName:
      childEl = (
        <textarea
          id={props.name}
          name={props.name}
          value={props.defaultValue || ''}
          placeholder={props.display?.placeholder}
          onChange={(evt) => onChange(evt.target.value as T)}
          disabled={props.display?.disabled}
          className='appitsy-form-control'
          data-testid='textInputComponent'
        />
      );
      break;
    case NumberTypeName:
      childEl = (
        <input
          id={props.name}
          type={props.inputType}
          name={props.name}
          value={props.defaultValue}
          placeholder={props.display?.placeholder}
          onChange={(evt) => onChange(evt.target.value as T)}
          disabled={props.display?.disabled}
          className='appitsy-form-control'
          data-testid='textInputComponent'
        />
      );
      break;
    default:
      childEl = <span>Unknown Input Component</span>;
      break;
  }

  const wrapInPrefixSuffix = (elem?: JSX.Element) => (
    <Flex flexDirection='row' className='appitsy-input-group'>
      { props.display?.prefix ? <div className='appitsy-input-prefix'><span className='appitsy-input-prefix-text'>{ props.display?.prefix }</span></div> : null }
      { elem }
      { props.display?.suffix ? <div className='appitsy-input-suffix'><span className='appitsy-input-suffix-text'>{ props.display?.suffix }</span></div> : null }
    </Flex>
  );

  const classes = classNames(props.className, { 'appitsy-hidden': props.display?.hidden }, 'appitsy-input');

  const label = <Label for={props.name} text={props.display?.label || props.name} tooltip={props.display?.tooltip} requiredAsterisk={props.validations?.required === true} />;

  return (
    <Flex className={classes} flexDirection={labelPositionToFlexDirection(props.display?.labelPosition)}>
      {
        props.display?.hideLabel === true ? null : label
      }
      {/* errorPositionToFlexDirection(props.display?.errorPosition) */}
      <Flex flexDirection='column'>
        { props.display?.prefix || props.display?.suffix ? wrapInPrefixSuffix(childEl) : childEl }
        <Description text={props.display?.description} />
        { state.touched ? <ErrorLabel error={validationError} /> : null }
      </Flex>
    </Flex>
  );
};

BaseTextInputComponent.validateSchema = (_component: any) => true;

BaseTextInputComponent.defaultProps = {
  inputType: TextFieldTypeName,
};

export default BaseTextInputComponent;
