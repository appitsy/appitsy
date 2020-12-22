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

export const getDisplayNameForType = (type: string): string => {
  switch (type) {
    case Types.TextField: return TextFieldTypeDisplayName;
    case Types.TextArea: return TextAreaTypeDisplayName;
    case Types.Email: return EmailTypeDisplayName;
    case Types.Number: return NumberTypeDisplayName;
    case Types.Password: return PasswordTypeDisplayName;
    case Types.Checkbox: return CheckboxTypeDisplayName;
    case Types.MultiCheckbox: return MultiCheckboxTypeDisplayName;
    case Types.Button: return ButtonTypeDisplayName;
    case Types.Panel: return PanelTypeDisplayName;
    case Types.Tabs: return TabsTypeDisplayName;
    case Types.Table: return TableTypeDisplayName;
    case Types.ObjectComponent: return ObjectComponentTypeDisplayName;
    default: return '';
  }
};

export type ComponentType =
  | InputComponentType
  | LayoutComponentType
  | DataComponentType;
