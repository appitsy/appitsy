import React from 'react';

import classNames from 'classnames';
import _ from 'lodash';

import { AppComponent } from '../../types/AppComponent';
import {
  TextAreaProps,
  TextAreaTypeName,
} from '../../types/InputComponentSchema';
import {
  ValidateMinMaxLength,
  ValidateRequired,
} from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';

interface TextAreaComponentProps extends TextAreaProps {
  className: string;
  value: string;
  path?: string;
  validate?(value: string, textFieldValidate: () => string | null): string | null;
  onValueChange(value: string): void;
}

const TextArea: AppComponent<TextAreaComponentProps> = (props) => {
  const textAreaValidate = (value: string): string | null => (
    ValidateRequired(props.validations!, value)
    || ValidateMinMaxLength(props.validations!, value)
  );

  return (
    <BaseTextInputComponent
      {...props}
      value={props.value || props.data?.defaultValue || ''}
      inputType={TextAreaTypeName}
      className={classNames([`appitsy-${TextAreaTypeName}`, props.className])}
      validate={textAreaValidate}
    />
  );
};

TextArea.validateSchema = (_component: any) => true;

TextArea.checkRerender = (prevProps, nextProps) => _.isEqual(prevProps, nextProps);

export default React.memo<TextAreaComponentProps>(props => <TextArea {...props} />, TextArea.checkRerender);
