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

export enum LogicActionType {
  Value = 'value',
  UpdateComponent = 'updateComponent',
  SetProperty = 'setProperty',
}

export interface LogicAction {
  type: LogicActionType;
  value?: Code;
  updateComponent?: any;
  property: {
    path: string;
    value: string;
  }
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
