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
  RadioTypeDisplayName,
  RadioTypeName,
  SelectTypeDisplayName,
  SelectTypeName,
  TextAreaTypeDisplayName,
  TextAreaTypeName,
  TextFieldTypeDisplayName,
  TextFieldTypeName,
} from './InputComponentSchema';
import {
  ColumnsTypeDisplayName,
  ColumnsTypeName,
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
  Select: SelectTypeName,
  Radio: RadioTypeName,
  Button: ButtonTypeName,

  Panel: PanelTypeName,
  Columns: ColumnsTypeName,
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
  Select: SelectTypeDisplayName,
  Radio: RadioTypeDisplayName,
  Button: ButtonTypeDisplayName,

  Panel: PanelTypeDisplayName,
  Columns: ColumnsTypeDisplayName,
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
    case Types.Select: return SelectTypeDisplayName;
    case Types.Radio: return RadioTypeDisplayName;
    case Types.Button: return ButtonTypeDisplayName;
    case Types.Panel: return PanelTypeDisplayName;
    case Types.Columns: return ColumnsTypeDisplayName;
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
