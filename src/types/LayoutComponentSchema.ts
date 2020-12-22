import {
  BaseComponentDataProps,
  BaseComponentDisplayProps,
  BaseComponentProps,
  BaseComponentSchema,
} from './BaseComponentSchema';
// eslint-disable-next-line import/no-cycle
import { ComponentSchema } from './ComponentSchema';

// LAYOUT COMPONENTS
export type PanelType = 'panel';
export type TabsType = 'tabs';

export const PanelTypeName = 'panel';
export const TabsTypeName = 'tabs';

export const PanelTypeDisplayName = 'Panel';
export const TabsTypeDisplayName = 'Tabs';

export interface PanelDisplayProps extends BaseComponentDisplayProps {
  title: string;
  expandable?: boolean;
  expanded?: boolean;
}

export type PanelDataProps = BaseComponentDataProps;

export interface PanelProps extends BaseComponentProps {
  components?: ComponentSchema[];
  display: PanelDisplayProps;
  data?: PanelDataProps;
}

export interface PanelSchema extends PanelProps, BaseComponentSchema {
  type: PanelType;
}

export type TabsDisplayProps = BaseComponentDisplayProps;

export type TabsDataProps = BaseComponentDataProps;

export interface TabsProps extends BaseComponentProps {
  components?: TabSchema[];
  display: TabsDisplayProps;
  data?: TabsDataProps;
}

export interface TabsSchema extends TabsProps, BaseComponentSchema {
  type: TabsType,
}

export interface TabProps extends BaseComponentProps {
  components?: ComponentSchema[];
}

// don't extend from BaseComponentSchema as we don't want type to be added here
export type TabSchema = TabProps;

export type LayoutComponentType =
  | PanelType
  | TabsType;
export type LayoutComponentSchema =
  | PanelSchema
  | TabsSchema;
