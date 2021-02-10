import React from 'react';

import classNames from 'classnames';

import { AppComponent } from '../../types/AppComponent';
import {
  RadioProps,
  RadioTypeName,
} from '../../types/InputComponentSchema';
import { ValidateRequired } from '../../utilities/Validations';
import BaseInputComponent from '../BaseInputComponent';

interface RadioComponentProps extends RadioProps {
  className?: string;
  value: string;
  path?: string;
  onValidationError?: (name: string, error?: string) => void;
  onValueChange? : (value: string | undefined) => void;
}

const Radio: AppComponent<RadioComponentProps> = (props) => {
  const radioValidate = (value: string): string | null => {
    if (props.validations === undefined) {
      return null;
    }

    return ValidateRequired(props.validations, value);
  };

  const value = (props.value?.length >= 0 ? props.value : props.data?.defaultValue) || '';

  return (
    <BaseInputComponent
      name={props.name}
      display={props.display}
      data={props.data}
      value={value}
      onValueChange={props.onValueChange}
      validate={radioValidate}
      onValidationError={props.onValidationError}
      inputType={RadioTypeName}
      className={classNames(props.className, `appitsy-${RadioTypeName}`)}
    />
  );
};

Radio.validateSchema = (_component: any) => true;

Radio.checkRerender = (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.display === nextProps.display;

export default React.memo<RadioComponentProps>(props => <Radio {...props} />, Radio.checkRerender);
