import { BaseComponentProps } from "./ComponentSchema";

export interface CustomComponentSchema extends BaseComponentProps {
  type: string;
  [x: string]: any;
}

