import { BaseComponentDataProps, BaseComponentDisplayProps, BaseComponentProps, BaseComponentSchema, ComponentSchema } from './ComponentSchema';

// DATA COMPONENTS
export type TableType = 'table';
export type ContainerType = 'container';

export const TableTypeName = 'table';
export const ContainerTypeName = 'container';

export interface TableDisplayProps extends BaseComponentDisplayProps {
  label: string;
}

export interface TableDataProps extends BaseComponentDataProps {
  columns: ComponentSchema[];
}

export interface TableProps extends BaseComponentProps {
  display?: TableDisplayProps;
  data: TableDataProps;
}

export interface TableSchema extends TableProps, BaseComponentSchema {
  type: TableType,
}

export interface ContainerProps extends BaseComponentProps {
  components?: ComponentSchema[];
}

export interface ContainerSchema extends ContainerProps, BaseComponentSchema {
  type: ContainerType,
}

export type DataComponentType =
  | TableType
  | ContainerType;

export type DataComponentSchema =
  | TableSchema
  | ContainerSchema;
