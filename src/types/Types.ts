import { ButtonTypeName, EmailTypeName, InputComponentType, NumberTypeName, PasswordTypeName, TextAreaTypeName, TextFieldTypeName } from "./InputComponentSchema";
import { LayoutComponentType, PanelTypeName } from "./LayoutComponentSchema";

export const Types = {
    TextField: TextFieldTypeName,
    TextArea: TextAreaTypeName,
    Email: EmailTypeName,
    Number: NumberTypeName,
    Password: PasswordTypeName,
    Button: ButtonTypeName,

    Panel: PanelTypeName,
}

export type ComponentType =
  | InputComponentType
  | LayoutComponentType
  ;
