import { BaseComponentSchema } from "./ComponentSchema";

export interface CustomComponentSchema extends BaseComponentSchema {
  type: string;
  [x: string]: any;
}

