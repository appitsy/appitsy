export type LabelPosition = 'left' | 'top';
export type ErrorPosition = 'right' | 'bottom';
export type Code = string;

export interface Condition {
  dependency?: {
    field: string;
    op: 'eq' | 'neq';
    value: string;
  };
  expression?: string;
}

export interface BaseComponentDisplayProps {
  label?: string;
  hideLabel?: boolean;
  condition?: Condition;
}

export interface LogicAction {
  type: 'value' | 'updateComponent';
  value?: Code;
  schema?: any;
}

export interface LogicProps {
  name: string;
  trigger: Code;
  actions: LogicAction[];
}

export interface BaseComponentProps {
  name: string;
  display?: BaseComponentDisplayProps;
  data?: BaseComponentDataProps;
  logic?: LogicProps[];
}

export interface BaseComponentSchema {
  type: string;
}

export interface BaseComponentDataProps {
  path?: string;
}
