import React from 'react';

import classNames from 'classnames';
import _ from 'lodash';

import { AppComponent } from '../../types/AppComponent';
import {
  TextAreaProps,
  TextAreaTypeName,
} from '../../types/InputComponentSchema';
import {
  ValidateInvalidChars,
  ValidateMinMaxLength,
  ValidateRequired,
} from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';

interface TextAreaComponentProps extends TextAreaProps {
  className: string;
  value: string;
  path?: string;
  onValidationError(name: string, error?: string): void;
  onValueChange(value: string): void;
}

const TextArea: AppComponent<TextAreaComponentProps> = (props) => {
  const textAreaValidate = (value: string): string | null => (
    ValidateRequired(props.validations!, value)
    || ValidateMinMaxLength(props.validations!, value)
    || ValidateInvalidChars(props.validations!, value)
  );

  return (
    <BaseTextInputComponent
      {...props}
      value={props.value !== undefined ? props.value : (props.data?.defaultValue || '')}
      inputType={TextAreaTypeName}
      className={classNames([`appitsy-${TextAreaTypeName}`, props.className])}
      validate={textAreaValidate}
    />
  );
};

TextArea.validateSchema = (_component: any) => true;

TextArea.checkRerender = (prevProps, nextProps) => _.isEqual(prevProps, nextProps);

export default React.memo<TextAreaComponentProps>(props => <TextArea {...props} />, TextArea.checkRerender);
