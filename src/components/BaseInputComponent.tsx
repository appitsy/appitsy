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
  RadioProps,
  RadioType,
  RadioTypeName,
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
  inputType: CheckboxType | MultiCheckboxType | SelectType | RadioType;
  className: string;
  value: T;
  validate(value: T): string | null;
  onValidationError(name: string, errorMsg?: string): void;
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

  if (props.validate) {
    validationError = (props.validate(props.value)) || '';
    props.onValidationError(props.name, validationError);
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
        childEl = checkboxes?.map((c, idx) => {
          const onMultiCheckboxChange = (val: boolean) => {
            const newValue = [...value];
            if (val) {
              newValue.push(c.value);
            } else {
              _.pull(newValue, c.value);
            }
            onChange(newValue as T);
          };

          return (
            <div>
              <CheckboxInput
                type='checkbox'
                id={`${props.name}-${idx}`}
                name={props.name}
                checked={value.includes(c.value)}
                onChange={(evt) => onMultiCheckboxChange(evt.target.checked)}
              />
              <Label for={`${props.name}-${idx}`} text={c.label} />
            </div>
          );
        });
      }
      break;
    case RadioTypeName:
      {
        const value: string = props.value as string;
        const radioButtons = (props as RadioProps).data?.options;
        childEl = radioButtons?.map((c, idx) => {
          const onRadioButtonChange = (val?: string) => {
            onChange(val as T);
          };

          return (
            <div>
              <input
                type='radio'
                name={c.value}
                id={`${props.name}-${idx}`}
                value={c.value}
                checked={value === c.value}
                onClick={() => {
                  if (c.value === value) {
                    onRadioButtonChange(undefined);
                  } else {
                    onRadioButtonChange(c.value);
                  }
                }}
              />
              <Label for={`${props.name}-${idx}`} text={c.label} />
            </div>
          );
        });
      }
      break;
    case SelectTypeName:
      {
        const selectProps = props as SelectProps;
        const options = selectProps.data?.options;
        const allowMultiSelection = selectProps.data?.allowMultiSelection || false;
        const value = props.value as string | string[];
        const onSelectChange = (val: any) => {
          if (allowMultiSelection) {
            // eslint-disable-next-line
            onChange((val?.map((x: any) => x.value)) as T);
          } else {
            // eslint-disable-next-line
            onChange(val?.value || '' as T);
          }
        };

        childEl = (
          <>
            { props.display?.hideLabel === true ? null : <Label for={props.name} text={props.display?.label || props.name} /> }
            <ReactSelect
              options={options}
              // eslint-disable-next-line
              onChange={(val: any) => onSelectChange(val)}
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
        { state.touched ? <ErrorLabel error={validationError} /> : null }
      </Flex>
    </Flex>
  );
};

BaseInputComponent.validateSchema = (_component: any) => true;

export default BaseInputComponent;
