import { ObjectComponentTypeName, DataComponentType, TableTypeName } from './DataComponentSchema';
import {
  ButtonTypeName,
  CheckboxTypeName,
  EmailTypeName,
  InputComponentType,
  MultiCheckboxTypeName,
  NumberTypeName,
  PasswordTypeName,
  TextAreaTypeName,
  TextFieldTypeName,
} from './InputComponentSchema';
import { LayoutComponentType, PanelTypeName, TabsTypeName } from './LayoutComponentSchema';

export const Types = {
  TextField: TextFieldTypeName,
  TextArea: TextAreaTypeName,
  Email: EmailTypeName,
  Number: NumberTypeName,
  Password: PasswordTypeName,
  Checkbox: CheckboxTypeName,
  MultiCheckbox: MultiCheckboxTypeName,
  Button: ButtonTypeName,

  Panel: PanelTypeName,
  Tabs: TabsTypeName,

  Table: TableTypeName,
  ObjectComponent: ObjectComponentTypeName,
};

export type ComponentType =
  | InputComponentType
  | LayoutComponentType
  | DataComponentType;
