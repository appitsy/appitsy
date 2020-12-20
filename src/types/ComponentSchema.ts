import { CustomComponentSchema } from './CustomComponentSchema';
import { InputComponentSchema } from './InputComponentSchema';
import { LayoutComponentSchema } from './LayoutComponentSchema';
import { DataComponentSchema } from './DataComponentSchema';

export type ComponentSchema =
  | InputComponentSchema
  | LayoutComponentSchema
  | CustomComponentSchema
  | DataComponentSchema
  ;
