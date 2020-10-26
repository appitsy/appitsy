import { CustomComponentSchema } from './CustomComponentSchema';
import { InputComponentSchema } from './InputComponentSchema';
import { LayoutComponentSchema } from './LayoutComponentSchema';

export interface BaseComponentSchema {
  name: string;
  type: string;
  display?: BaseComponentDisplaySchema;
  logic?: LogicSchema[];
}

export interface Condition {
  dependency?: {
    field: string;
    op: 'eq' | 'neq';
    value: string;
  };
  expression?: string;
}

export interface BaseComponentDisplaySchema {
  condition?: Condition;
}

export interface ButtonDisplaySchema extends BaseComponentDisplaySchema {
  leftIcon?: string;
  rightIcon?: string;
}

export type LabelPosition = 'left' | 'top';
export type ErrorPosition = 'right' | 'bottom';

export interface LogicSchema {
  name: string;
  trigger: string;
  actions: ActionSchema[];
}

export interface ActionSchema {
  type: 'value' | 'updateComponent';
  value?: string;
  schema?: any;
}

export type ComponentSchema =
  | InputComponentSchema
  | LayoutComponentSchema
  | CustomComponentSchema;
