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
  className: string;
  value: number;
  path?: string;
  onValueChange(value: number): void;
}

const Number: AppComponent<NumberComponentProps> = (props) => {
  const textFieldValidate = (value: number): string | null => (
    ValidateRequired(props.validations!, value.toString())
      || ValidateMinMaxNumber(props.validations!, value)
  );

  return (
    <BaseTextInputComponent
      {...props}
      inputType={NumberTypeName}
      value={props.value || props.data?.defaultValue}
      className={classNames([`appitsy-${NumberTypeName}`, props.className])}
      validate={textFieldValidate}
    />
  );
};

Number.validateSchema = (_component: any) => true;

Number.checkRerender = (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.display === nextProps.display;

export default React.memo<NumberComponentProps>(props => <Number {...props}/>, Number.checkRerender);
