import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import ErrorLabel from './Basic/ErrorLabel';
import { Flex } from './Layout/Flex';
import { labelPositionToFlexDirection } from '../utilities/FlexPositions';
import Description from './Basic/Description';
import {
  BaseInputComponentProps, CheckboxType, CheckboxTypeName, MultiCheckboxType, MultiCheckboxTypeName,
} from '../types/InputComponentSchema';
import Label from './Basic/Label';
import Styled from '../Styled';

interface BaseInputProps<T> extends BaseInputComponentProps<T> {
  inputType: CheckboxType | MultiCheckboxType;
  className: string;
  value: T;
  defaultValue: T;
  validate(value: T): string | null;
  onValueChange(value: T): void;
}

interface BaseInputState {
  touched?: boolean;
}

const CheckboxInput = Styled.input`
  margin-right: 4px;
`;

const BaseInputComponent = <T extends any>(props: BaseInputProps<T>): JSX.Element => {
  const [state, setState] = useState<BaseInputState>({});

  useEffect(() => {
    props.onValueChange(props.value || props.data?.defaultValue || props.defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let validationError = '';
  const onChange = (value: T) => {
    setState((prevState: BaseInputState) => ({
      ...prevState,
      touched: true,
    }));

    return props.onValueChange(value);
  };

  if (props.validations && state.touched) {
    validationError = (props.validate(props.value)) || '';
  }

  let childEl;
  switch (props.inputType) {
    case CheckboxTypeName:
      childEl = (
        <div>
          <CheckboxInput
            type='checkbox'
            id={props.name}
            name={props.name}
            checked={props.value as boolean}
            onChange={(evt) => onChange(evt.target.value as T)}
          />
          <Label for={props.name} text={props.name} />
          <ErrorLabel error={validationError} />
        </div>
      );
      break;
    case MultiCheckboxTypeName:
      break;
    default:
      childEl = <span>Unknown Input Component</span>;
      break;
  }

  const classes = classNames(props.className, { 'appitsy-hidden': props.display?.hidden }, 'appitsy-input');

  return (
    <Flex className={classes} flexDirection={labelPositionToFlexDirection(props.display?.labelPosition)}>
      <Flex flexDirection='column'>
        { childEl }
        <Description text={props.display?.description} />
        <ErrorLabel error={validationError} />
      </Flex>
    </Flex>
  );
};

BaseInputComponent.validateSchema = (_component: any) => true;

export default BaseInputComponent;
