import { BaseComponentDisplayProps, BaseComponentProps, BaseComponentSchema, ComponentSchema } from './ComponentSchema';

// DATA COMPONENTS
export type TableType = 'table';

export const TableTypeName = 'table';

export interface TableDisplayProps extends BaseComponentDisplayProps {
  label: string;
}

export interface TableDataProps {
  columns: ComponentSchema[];
}

export interface TableProps extends BaseComponentProps {
  display?: TableDisplayProps;
  data: TableDataProps;
}

export interface TableSchema extends TableProps, BaseComponentSchema {
  type: TableType,
}

export type DataComponentType =
  | TableType;

export type DataComponentSchema =
  | TableSchema;
