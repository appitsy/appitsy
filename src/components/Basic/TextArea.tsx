import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';
import { AppComponent } from '../../types/AppComponent';
import { TextAreaProps } from '../../types/InputComponentSchema';

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
    <BaseTextInputComponent {...props} className={classNames(['appitsy-textarea', props.className])} validate={textAreaValidate}/>
  );
};

TextArea.validateSchema = (_component: any) => true;

TextArea.checkRerender = (prevProps, nextProps) => _.isEqual(prevProps, nextProps);

export default React.memo<TextAreaComponentProps>(props => <TextArea {...props} />, TextArea.checkRerender);
