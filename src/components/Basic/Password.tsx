import React, { } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import BaseTextInputComponent from '../BaseTextInputComponent';
import { AppComponent } from '../../types/AppComponent';
import { PasswordProps } from '../../types/InputComponentSchema';

interface PasswordComponentProps extends PasswordProps {
  className: string;
  value: string;
  path?: string;
  onValueChange(value: string): void;
}

const Password: AppComponent<PasswordComponentProps> = (props) => {
  const passwordValidate = (value: string): string | null => (
    ValidateRequired(props.validations!, value)
    || ValidateMinMaxLength(props.validations!, value)
  );

  return (
    <BaseTextInputComponent inputType='password' {...props} className={classNames(['appitsy-password', props.className])} validate={passwordValidate} />
  );
};

Password.validateSchema = (_component: any) => true;

Password.checkRerender = (prevProps, nextProps) => _.isEqual(prevProps, nextProps);

export default React.memo<PasswordComponentProps>(props => <Password {...props} />, Password.checkRerender);
