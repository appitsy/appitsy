import { BaseComponentProps } from './BaseComponentSchema';

export interface CustomComponentSchema extends BaseComponentProps {
  type: string;
  [x: string]: any;
}
