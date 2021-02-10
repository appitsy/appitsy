import React from 'react';

import classNames from 'classnames';
import _ from 'lodash';

import { AppComponent } from '../../types/AppComponent';
import {
  PasswordProps,
  PasswordTypeName,
} from '../../types/InputComponentSchema';
import {
  ValidateMinMaxLength,
  ValidateRequired,
} from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';

interface PasswordComponentProps extends PasswordProps {
  className?: string;
  value: string;
  path?: string;
  onValidationError?: (name: string, error?: string) => void;
  onValueChange? : (value: string | undefined) => void;
}

const Password: AppComponent<PasswordComponentProps> = (props) => {
  const passwordValidate = (value: string): string | null => (
    ValidateRequired(props.validations!, value)
    || ValidateMinMaxLength(props.validations!, value)
  );

  return (
    <BaseTextInputComponent
      {...props}
      inputType={PasswordTypeName}
      defaultValue={props.value || ''}
      className={classNames([`appitsy-${PasswordTypeName}`, props.className])}
      validate={passwordValidate}
    />
  );
};

Password.validateSchema = (_component: any) => true;

Password.checkRerender = (prevProps, nextProps) => _.isEqual(prevProps, nextProps);

export default React.memo<PasswordComponentProps>(props => <Password {...props} />, Password.checkRerender);
