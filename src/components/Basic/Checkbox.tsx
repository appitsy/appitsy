import React from 'react';

import classNames from 'classnames';

import { AppComponent } from '../../types/AppComponent';
import {
  CheckboxProps,
  CheckboxTypeName,
} from '../../types/InputComponentSchema';
import { ValidateRequiredBool } from '../../utilities/Validations';
import BaseInputComponent from '../BaseInputComponent';

interface CheckboxComponentProps extends CheckboxProps {
  className: string;
  value: boolean;
  path?: string;
  onValidationError(name: string, error?: string): void;
  onValueChange(value: boolean): void;
}

const Checkbox: AppComponent<CheckboxComponentProps> = (props) => {
  const checkboxValidate = (value: boolean): string | null => {
    if (props.validations === undefined) {
      return null;
    }
    return ValidateRequiredBool(props.validations, value);
  };

  return (
    <BaseInputComponent
      name={props.name}
      display={props.display}
      value={props.value || props.data?.defaultValue || false}
      onValueChange={props.onValueChange}
      validate={checkboxValidate}
      onValidationError={props.onValidationError}
      inputType={CheckboxTypeName}
      className={classNames(props.className, `appitsy-${CheckboxTypeName}`)}
    />
  );
};

Checkbox.validateSchema = (_component: any) => true;

Checkbox.checkRerender = (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.display === nextProps.display;

export default React.memo<CheckboxComponentProps>(props => <Checkbox {...props} />, Checkbox.checkRerender);
