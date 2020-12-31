import React, {
  useEffect,
  useState,
} from 'react';

import classNames from 'classnames';
import _ from 'lodash';
import ReactSelect from 'react-select';

import Styled from '../Styled';
import {
  BaseInputComponentProps,
  CheckboxType,
  CheckboxTypeName,
  MultiCheckboxProps,
  MultiCheckboxType,
  MultiCheckboxTypeName,
  SelectProps,
  SelectType,
  SelectTypeName,
} from '../types/InputComponentSchema';
import { labelPositionToFlexDirection } from '../utilities/FlexPositions';
import Description from './Basic/Description';
import ErrorLabel from './Basic/ErrorLabel';
import Label from './Basic/Label';
import { Flex } from './Layout/Flex';

interface BaseInputProps<T> extends BaseInputComponentProps<T> {
  inputType: CheckboxType | MultiCheckboxType | SelectType;
  className: string;
  value: T;
  validate(value: T): string | null;
  onValueChange(value: T): void;
}

interface BaseInputState {
  touched?: boolean;
}

const CheckboxInput = Styled.input`
  margin-right: 4px;
`;

const BaseInputComponent = <T extends any>(props: BaseInputProps<T>): JSX.Element => {
  const [state, setState] = useState<BaseInputState>({});

  useEffect(() => {
    props.onValueChange(props.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let validationError = '';
  const onChange = (value: T) => {
    setState((prevState: BaseInputState) => ({
      ...prevState,
      touched: true,
    }));

    return props.onValueChange(value);
  };

  if (props.validate && state.touched) {
    validationError = (props.validate(props.value)) || '';
  }

  let childEl;
  switch (props.inputType) {
    case CheckboxTypeName:
      childEl = (
        <div>
          <CheckboxInput
            type='checkbox'
            id={props.name}
            name={props.name}
            checked={props.value as boolean}
            onChange={(evt) => onChange(evt.target.checked as T)}
          />
          <Label for={props.name} text={props.display?.label || props.name} />
        </div>
      );
      break;
    case MultiCheckboxTypeName:
      {
        const value: string[] = props.value as string[] || [];
        const checkboxes = (props as MultiCheckboxProps).data?.checkboxes;
        const checkboxesEl = checkboxes?.map((c, idx) => {
          const onMultiCheckboxChange = (val: boolean) => {
            const newValue = [...value];
            if (val) {
              newValue.push(c.name);
            } else {
              _.pull(newValue, c.name);
            }
            onChange(newValue as T);
          };

          return (
            <div>
              <CheckboxInput
                type='checkbox'
                id={`${props.name}-${idx}`}
                name={props.name}
                checked={value.includes(c.name)}
                onChange={(evt) => onMultiCheckboxChange(evt.target.checked)}
              />
              <Label for={`${props.name}-${idx}`} text={c.label} />
            </div>
          );
        });

        const errorLabel = <ErrorLabel error={validationError} />;
        childEl = [...(checkboxesEl || []), errorLabel];
      }
      break;
    case SelectTypeName:
      {
        const selectProps = props as SelectProps;
        const options = selectProps.data?.options;
        const allowMultiSelection = selectProps.data?.allowMultiSelection || false;
        const value = props.value as string | string[];
        childEl = (
          <>
            <Label for={props.name} text={props.display?.label || props.name} />
            <ReactSelect
              options={options}
              // eslint-disable-next-line
              onChange={(val: any) => onChange(allowMultiSelection ? (val?.map((x: any) => x.value)) as T : val.value as T)}
              isClearable
              isSearchable
              isMulti={allowMultiSelection}
              value={allowMultiSelection ? options?.filter(option => value.includes(option.value)) : options?.find(x => x.value === value)}
            />
            <ErrorLabel error={validationError} />
          </>
        );
      }
      break;
    default:
      childEl = <span>Unknown Input Component</span>;
      break;
  }

  const classes = classNames(props.className, { 'appitsy-hidden': props.display?.hidden }, 'appitsy-input');

  return (
    <Flex className={classes} flexDirection={labelPositionToFlexDirection(props.display?.labelPosition)}>
      <Flex flexDirection='column'>
        { childEl }
        <Description text={props.display?.description} />
        <ErrorLabel error={validationError} />
      </Flex>
    </Flex>
  );
};

BaseInputComponent.validateSchema = (_component: any) => true;

export default BaseInputComponent;
