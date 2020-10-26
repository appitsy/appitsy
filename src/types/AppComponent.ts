import { PropsWithChildren } from "react";

export interface AppComponent<T> extends React.FC<T> {
  validateSchema(component: any): boolean;
  checkRerender(prevProps: Readonly<PropsWithChildren<T>>, nextProps: Readonly<PropsWithChildren<T>>): boolean;
}
