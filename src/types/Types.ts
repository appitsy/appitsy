import {
  DataComponentType,
  ObjectComponentTypeDisplayName,
  ObjectComponentTypeName,
  TableTypeDisplayName,
  TableTypeName,
} from './DataComponentSchema';
import {
  ButtonTypeDisplayName,
  ButtonTypeName,
  CheckboxTypeDisplayName,
  CheckboxTypeName,
  EmailTypeDisplayName,
  EmailTypeName,
  InputComponentType,
  MultiCheckboxTypeDisplayName,
  MultiCheckboxTypeName,
  NumberTypeDisplayName,
  NumberTypeName,
  PasswordTypeDisplayName,
  PasswordTypeName,
  TextAreaTypeDisplayName,
  TextAreaTypeName,
  TextFieldTypeDisplayName,
  TextFieldTypeName,
} from './InputComponentSchema';
import {
  LayoutComponentType,
  PanelTypeDisplayName,
  PanelTypeName,
  TabsTypeDisplayName,
  TabsTypeName,
} from './LayoutComponentSchema';

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

export const TypeDisplayNames = {
  TextField: TextFieldTypeDisplayName,
  TextArea: TextAreaTypeDisplayName,
  Email: EmailTypeDisplayName,
  Number: NumberTypeDisplayName,
  Password: PasswordTypeDisplayName,
  Checkbox: CheckboxTypeDisplayName,
  MultiCheckbox: MultiCheckboxTypeDisplayName,
  Button: ButtonTypeDisplayName,

  Panel: PanelTypeDisplayName,
  Tabs: TabsTypeDisplayName,

  Table: TableTypeDisplayName,
  ObjectComponent: ObjectComponentTypeDisplayName,
};

export type ComponentType =
  | InputComponentType
  | LayoutComponentType
  | DataComponentType;
