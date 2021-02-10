import React from 'react';

import classNames from 'classnames';
import _ from 'lodash';

import { AppComponent } from '../../types/AppComponent';
import {
  EmailProps,
  EmailTypeName,
} from '../../types/InputComponentSchema';
import {
  ValidateEmail,
  ValidateMinMaxLength,
  ValidateRequired,
} from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';

interface EmailComponentProps extends EmailProps {
  className?: string;
  value: string;
  path?: string;
  onValidationError?: (name: string, error?: string) => void;
  onValueChange? : (value: string | undefined) => void;
}

const Email: AppComponent<EmailComponentProps> = (props) => {
  const emailValidate = (value: string): string | null => (
    ValidateRequired(props.validations!, value)
    || ValidateMinMaxLength(props.validations!, value)
    || ValidateEmail(value)
  );

  return (
    <BaseTextInputComponent
      {...props}
      inputType={EmailTypeName}
      defaultValue={props.value !== undefined ? props.value : (props.data?.defaultValue || '')}
      className={classNames([`appitsy-${EmailTypeName}`, props.className])}
      validate={emailValidate}
    />
  );
};

Email.validateSchema = (_component: any) => true;

Email.checkRerender = (prevProps, nextProps) => _.isEqual(prevProps, nextProps);

export default React.memo<EmailComponentProps>(props => <Email {...props} />, Email.checkRerender);
