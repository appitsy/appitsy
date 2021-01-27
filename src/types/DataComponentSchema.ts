import {
  BaseComponentDataProps,
  BaseComponentDisplayProps,
  BaseComponentProps,
  BaseComponentSchema,
  Code,
} from './BaseComponentSchema';
// eslint-disable-next-line import/no-cycle
import { ComponentSchema } from './ComponentSchema';

// DATA COMPONENTS
export type TableType = 'table';
export type TableRowExpandedType = 'table-row-expand';
export type ObjectComponentType = 'object';

export const TableTypeName = 'table';
export const TableRowExpandedTypeName = 'table-row-expand';
export const ObjectComponentTypeName = 'object';

export const TableTypeDisplayName = 'Table';
export const ObjectComponentTypeDisplayName = 'Object';

export interface TableDisplayProps extends BaseComponentDisplayProps {
  minOneRow?: boolean;
  allowSorting?: boolean;
  allowAddRemove?: boolean;
}

export interface TableDataProps extends BaseComponentDataProps {
  addNewDefault?: Code;
}

export interface TableProps extends BaseComponentProps {
  display?: TableDisplayProps;
  data?: TableDataProps;
  components: ComponentSchema[];
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
