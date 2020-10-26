import { BaseComponentDisplaySchema, BaseComponentSchema, ComponentSchema } from "./ComponentSchema";

// LAYOUT COMPONENTS
export type PanelType = 'panel';

export interface PanelDisplaySchema extends BaseComponentDisplaySchema {
  expandable?: boolean;
  expanded?: boolean;
}

export interface PanelSchema extends BaseComponentSchema {
  type: PanelType;
  components?: ComponentSchema[];
  display?: PanelDisplaySchema;
}

export type LayoutComponentSchema =
  | PanelSchema
  ;
