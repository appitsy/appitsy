import React from 'react';

import classNames from 'classnames';
import { AppComponent } from '../../types/AppComponent';
import { ContainerProps, ContainerTypeName } from '../../types/DataComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';

interface ContainerComponentProps extends ContainerProps {
  className?: string;
  path?: string;
  renderChildComponents: (components?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
}

const Container: AppComponent<ContainerComponentProps> = (props: ContainerComponentProps) => (
  <div className={classNames(['appitsy-container', props.className])}>
    <div>{props.display?.label}</div>
    { props.renderChildComponents(props.components, props.path, { ...props, type: ContainerTypeName } as ComponentSchema) }
  </div>
);

Container.validateSchema = (_component: any) => true;

Container.checkRerender = (_prevProps, _nextProps) => false;

Container.defaultProps = {
};

// eslint-disable-next-line @typescript-eslint/unbound-method
export default React.memo<ContainerComponentProps>((props) => <Container {...props} />, Container.checkRerender);
