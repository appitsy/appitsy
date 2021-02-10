// eslint-disable-next-line import/no-extraneous-dependencies
import { screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from '@testing-library/user-event';

const getElementByTestId = (testId: string): HTMLElement => screen.getByTestId(testId);

const exists = (testId: string): boolean => screen.queryAllByTestId(testId).length !== 0;
const getLabel = (): HTMLElement => getElementByTestId('label');
const getRequiredAsterisk = (): HTMLElement => getElementByTestId('labelRequiredAsterisk');
const getErrorLabel = (): HTMLElement => getElementByTestId('errorLabel');

const typeIn = (element: HTMLElement, text: string, emptyField?: boolean): void => {
  if (emptyField !== false) {
    userEvent.clear(element);
  }

  userEvent.type(element, text);
};

// eslint-disable-next-line import/prefer-default-export
export const TestUtils = {
  exists,
  getLabel,
  getRequiredAsterisk,
  getErrorLabel,

  typeIn,
};
