import React from 'react';

import classNames from 'classnames';
import { AppComponent } from '../../types/AppComponent';
import { ObjectComponentProps, ObjectComponentTypeName } from '../../types/DataComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';

interface ObjectComponentComponentProps extends ObjectComponentProps {
  className?: string;
  path?: string;
  renderChildComponents: (components?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
}

const ObjectComponent: AppComponent<ObjectComponentComponentProps> = (props: ObjectComponentComponentProps) => {
  const label = <div>{props.display?.label}</div>;
  return (
    <div className={classNames(['appitsy-object', props.className])}>
      { props.display?.hideLabel === true ? null : label }
      { props.renderChildComponents(props.components, props.path, { ...props, type: ObjectComponentTypeName } as ComponentSchema) }
    </div>
  );
};

ObjectComponent.validateSchema = (_component: any) => true;

ObjectComponent.checkRerender = (_prevProps, _nextProps) => false;

ObjectComponent.defaultProps = {
};

// eslint-disable-next-line @typescript-eslint/unbound-method
export default React.memo<ObjectComponentComponentProps>((props) => <ObjectComponent {...props} />, ObjectComponent.checkRerender);
