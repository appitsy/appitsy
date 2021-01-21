import React from 'react';

import classNames from 'classnames';
import _ from 'lodash';

import { AppComponent } from '../../types/AppComponent';
import {
  TextFieldProps,
  TextFieldTypeName,
} from '../../types/InputComponentSchema';
import {
  ValidateInvalidChars,
  ValidateMinMaxLength,
  ValidateRequired,
} from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';

interface TextFieldComponentProps extends TextFieldProps {
  className: string;
  value: string;
  path?: string;
  onValidationError(name: string, error?: string): void;
  onValueChange(value: string): void;
}

const TextField: AppComponent<TextFieldComponentProps> = (props) => {
  const textFieldValidate = (value: string): string | null => (
    ValidateRequired(props.validations!, value)
    || ValidateMinMaxLength(props.validations!, value)
    || ValidateInvalidChars(props.validations!, value)
  );

  return (
    <BaseTextInputComponent
      {...props}
      value={props.value || props.data?.defaultValue || ''}
      inputType={TextFieldTypeName}
      className={classNames([`appitsy-${TextFieldTypeName}`, props.className])}
      validate={textFieldValidate}
    />
  );
};

TextField.validateSchema = (_component: any) => true;

TextField.checkRerender = (prevProps, nextProps) => _.isEqual(prevProps, nextProps);

export default React.memo<TextFieldComponentProps>(props => <TextField {...props} />, TextField.checkRerender);
