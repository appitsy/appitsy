/* eslint-disable import/no-cycle */
import { CustomComponentSchema } from './CustomComponentSchema';
import { DataComponentSchema } from './DataComponentSchema';
import { InputComponentSchema } from './InputComponentSchema';
import { LayoutComponentSchema } from './LayoutComponentSchema';

export type ComponentSchema =
  | InputComponentSchema
  | LayoutComponentSchema
  | CustomComponentSchema
  | DataComponentSchema;
