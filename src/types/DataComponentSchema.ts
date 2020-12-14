import { BaseComponentDataProps, BaseComponentDisplayProps, BaseComponentProps, BaseComponentSchema, Code, ComponentSchema } from './ComponentSchema';

// DATA COMPONENTS
export type TableType = 'table';
export type ObjectComponentType = 'object';

export const TableTypeName = 'table';
export const ObjectComponentTypeName = 'object';

export interface TableDisplayProps extends BaseComponentDisplayProps {
  label: string;
}

export interface TableDataProps extends BaseComponentDataProps {
  columns: ComponentSchema[];
  addNewDefault?: Code;
}

export interface TableProps extends BaseComponentProps {
  display?: TableDisplayProps;
  data: TableDataProps;
}

export interface TableSchema extends TableProps, BaseComponentSchema {
  type: TableType,
}

export interface ObjectComponentProps extends BaseComponentProps {
  components?: ComponentSchema[];
}

export interface ObjectComponentSchema extends ObjectComponentProps, BaseComponentSchema {
  type: ObjectComponentType,
}

export type DataComponentType =
  | TableType
  | ObjectComponentType;

export type DataComponentSchema =
  | TableSchema
  | ObjectComponentSchema;
