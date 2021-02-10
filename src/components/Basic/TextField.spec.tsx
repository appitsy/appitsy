import '@testing-library/jest-dom/extend-expect';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { TestUtils } from '../../TestUtils/TestUtils';
import { TextFieldProps } from '../../types/InputComponentSchema';
import TextField from './TextField';

describe('TextField:', () => {
  const textFieldProps = {
    name: 'textFieldName',
  };

  const textFieldValue = 'text field value';
  const onValueChange = jest.fn();

  const renderTextField = (props: TextFieldProps, value?: string) => {
    render(
      <TextField
        {...props}
        value={value || undefined}
        onValueChange={onValueChange}
      />,
    );
  };

  const getTextField = (): HTMLInputElement => {
    const component = screen.getByTestId('textInputComponent');
    expect(component.tagName).toBe('INPUT');
    return component as HTMLInputElement;
  };

  describe('Value:', () => {
    it('should load with empty value', () => {
      renderTextField(textFieldProps);
      const textInputElement = getTextField();
      expect(textInputElement.value).toBe('');
    });

    it('should load with default value', () => {
      renderTextField({
        ...textFieldProps,
        data: {
          defaultValue: textFieldValue,
        },
      });

      const textInputElement = getTextField();
      expect(textInputElement.value).toBe(textFieldValue);
    });

    it('should load with the value passed', () => {
      renderTextField(textFieldProps, textFieldValue);
      const textInputElement = getTextField();
      expect(textInputElement.value).toBe(textFieldValue);
    });
  });

  describe('Validations:', () => {
    it('should not display any error when field is untouched', () => {
      renderTextField({
        ...textFieldProps,
        validations: {
          required: true,
        },
      }, textFieldValue);

      const textInputElement = getTextField();
      expect(textInputElement).toHaveValue(textFieldValue);
      expect(TestUtils.exists('errorLabel')).toBe(false);
    });

    it('should display required error only when field is touched', () => {
      renderTextField({
        ...textFieldProps,
        validations: {
          required: true,
        },
      });

      const textInputElement = getTextField();
      expect(textInputElement.value).toBe('');
      expect(TestUtils.exists('errorLabel')).toBe(false);

      // put some value and then empty field;
      const someValue = 'some value';
      TestUtils.typeIn(textInputElement, someValue);
      expect(textInputElement).toHaveValue(someValue);

      TestUtils.typeIn(textInputElement, '');
      expect(textInputElement).toHaveValue('');

      expect(TestUtils.exists('errorLabel')).toBe(true);
      expect(TestUtils.getErrorLabel().textContent).toBe('Field is required');
    });
  });
});
