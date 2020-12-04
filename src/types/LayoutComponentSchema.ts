import { BaseComponentDisplayProps, BaseComponentProps, BaseComponentSchema, ComponentSchema } from "./ComponentSchema";

// LAYOUT COMPONENTS
export type PanelType = 'panel';
export type TabsType = 'tabs';

export const PanelTypeName = 'panel';
export const TabsTypeName = 'tabs';

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

export interface TabsDisplayProps extends BaseComponentDisplayProps {
}

export interface TabsProps extends BaseComponentProps {
  components?: TabSchema[];
  display: TabsDisplayProps;
}

export interface TabsSchema extends TabsProps, BaseComponentSchema {
  type: TabsType,
}

export interface TabProps extends BaseComponentProps {
  components?: ComponentSchema[];
}

export interface TabSchema extends TabProps {
  // don't extend from BaseComponentSchema as we don't want type to be added here
}

export type LayoutComponentType =
  | PanelType
  | TabsType
  ;

export type LayoutComponentSchema =
  | PanelSchema
  | TabsSchema
  ;
