import { BaseComponentDisplayProps, BaseComponentProps, BaseComponentSchema, ComponentSchema } from "./ComponentSchema";

// LAYOUT COMPONENTS
export type PanelType = 'panel';
export const PanelTypeName = 'panel';

export interface PanelDisplayProps extends BaseComponentDisplayProps {
  title: string;
  expandable?: boolean;
  expanded?: boolean;
}

export interface PanelProps extends BaseComponentProps {
  components?: ComponentSchema[];
  display: PanelDisplayProps;
}

export interface PanelSchema extends PanelProps, BaseComponentSchema {
  type: PanelType,
}

export type LayoutComponentType =
  | PanelType
  ;

export type LayoutComponentSchema =
  | PanelSchema
  ;
