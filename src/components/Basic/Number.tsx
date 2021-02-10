import React from 'react';

import classNames from 'classnames';

import { AppComponent } from '../../types/AppComponent';
import {
  NumberProps,
  NumberTypeName,
} from '../../types/InputComponentSchema';
import {
  ValidateMinMaxNumber,
  ValidateRequired,
} from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';

interface NumberComponentProps extends NumberProps {
  className?: string;
  value: number;
  path?: string;
  onValidationError?: (name: string, error?: string) => void;
  onValueChange?: (value: number | undefined) => void;
}

const Number: AppComponent<NumberComponentProps> = (props) => {
  const textFieldValidate = (value?: number): string | null => {
    if (!props.validations) {
      return null;
    }

    return ValidateRequired(props.validations, value?.toString())
      || ValidateMinMaxNumber(props.validations, value!);
  };

  return (
    <BaseTextInputComponent
      {...props}
      inputType={NumberTypeName}
      defaultValue={props.value || props.data?.defaultValue}
      className={classNames([`appitsy-${NumberTypeName}`, props.className])}
      validate={textFieldValidate}
    />
  );
};

Number.validateSchema = (_component: any) => true;

Number.checkRerender = (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.display === nextProps.display;

export default React.memo<NumberComponentProps>(props => <Number {...props}/>, Number.checkRerender);
