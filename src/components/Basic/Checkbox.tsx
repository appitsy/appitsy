import React from 'react';
import classNames from 'classnames';

import { ValidateRequired } from '../../utilities/Validations';
import { AppComponent } from '../../types/AppComponent';
import { CheckboxProps, CheckboxTypeName } from '../../types/InputComponentSchema';
import BaseInputComponent from '../BaseInputComponent';

interface CheckboxComponentProps extends CheckboxProps {
  className: string;
  value: boolean;
  path?: string;
  onValueChange(value: boolean): void;
}

const Checkbox: AppComponent<CheckboxComponentProps> = (props) => {
  const checkboxValidate = (value: boolean): string | null => {
    if (props.validations === undefined) {
      return null;
    }
    return ValidateRequired(props.validations, value.toString());
  };

  return (
    <BaseInputComponent
      name={props.name}
      value={props.value}
      onValueChange={props.onValueChange}
      defaultValue={false}
      validate={checkboxValidate}
      inputType={CheckboxTypeName}
      className={classNames(props.className, `appitsy-${CheckboxTypeName}`)}
    />
  );
};

Checkbox.validateSchema = (_component: any) => true;

Checkbox.checkRerender = (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.display === nextProps.display;

export default React.memo<CheckboxComponentProps>(props => <Checkbox {...props} />, Checkbox.checkRerender);
