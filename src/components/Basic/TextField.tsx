import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import BaseTextInputComponent from '../BaseTextInputComponent';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import { AppComponent } from '../../types/AppComponent';
import { TextFieldProps } from '../../types/InputComponentSchema';

interface TextFieldComponentProps extends TextFieldProps {
  className: string;
  value: string;
  path?: string;
  validate?(value: string, textFieldValidate: () => string | null): string | null;
  onValueChange(value: string): void;
}

const TextField: AppComponent<TextFieldComponentProps> = (props) => {
  const textFieldValidate = (value: string): string | null => (
    ValidateRequired(props.validations!, value)
    || ValidateMinMaxLength(props.validations!, value)
  );

  return (
    <BaseTextInputComponent {...props} className={classNames(['appitsy-textfield', props.className])} validate={textFieldValidate}/>
  );
};

TextField.validateSchema = (_component: any) => true;

TextField.checkRerender = (prevProps, nextProps) => _.isEqual(prevProps, nextProps);

export default React.memo<TextFieldComponentProps>(props => <TextField {...props} />, TextField.checkRerender);
