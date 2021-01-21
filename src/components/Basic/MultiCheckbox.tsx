import React from 'react';

import classNames from 'classnames';
import _ from 'lodash';

import { AppComponent } from '../../types/AppComponent';
import {
  MultiCheckboxProps,
  MultiCheckboxTypeName,
} from '../../types/InputComponentSchema';
import { ValidateRequired } from '../../utilities/Validations';
import BaseInputComponent from '../BaseInputComponent';

interface MultiCheckboxComponentProps extends MultiCheckboxProps {
  className: string;
  value: boolean;
  path?: string;
  onValidationError(name: string, error?: string): void;
  onValueChange(value: boolean): void;
}

const MultiCheckbox: AppComponent<MultiCheckboxComponentProps> = (props) => {
  const MultiCheckboxValidate = (value: boolean): string | null => {
    if (props.validations === undefined) {
      return null;
    }
    return ValidateRequired(props.validations, value.toString());
  };

  let value = props.value || props.data?.defaultValue;
  if (!_.isArray(value)) {
    value = [];
  }

  return (
    <BaseInputComponent
      {...props}
      name={props.name}
      value={value}
      onValueChange={props.onValueChange}
      validate={MultiCheckboxValidate}
      onValidationError={props.onValidationError}
      inputType={MultiCheckboxTypeName}
      className={classNames(props.className, `appitsy-${MultiCheckboxTypeName}`)}
    />
  );
};

MultiCheckbox.validateSchema = (_component: any) => true;

MultiCheckbox.checkRerender = (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.display === nextProps.display;

export default React.memo<MultiCheckboxComponentProps>(props => <MultiCheckbox {...props} />, MultiCheckbox.checkRerender);
