import React from 'react';

import classNames from 'classnames';

import Styled from '../../Styled';
import { AppComponent } from '../../types/AppComponent';
import { ComponentSchema } from '../../types/ComponentSchema';
import {
  ColumnsProps,
  ColumnsTypeName,
} from '../../types/LayoutComponentSchema';

interface ColumnsComponentProps extends ColumnsProps {
  className?: string;
  path?: string;
  renderChildComponents: (components?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
}

const ColumnWrapper = Styled.div`
  margin: 0px !important;
  width: 100% !important;
`;

const ColumnsHeading = Styled.h5`
  margin: 0px;
  padding: 10px;
`;

const Row = Styled.div`
  display: flex;
  flex-direction: row;
`;

const Columns: AppComponent<ColumnsComponentProps> = (props) => (
  <ColumnWrapper className={classNames([`appitsy-${ColumnsTypeName}`, props.className])}>
    <ColumnsHeading>{props.display.label}</ColumnsHeading>
    <Row>
      { props.renderChildComponents(props.components, props.path, { ...props, type: ColumnsTypeName } as ComponentSchema) }
    </Row>
  </ColumnWrapper>
);

Columns.validateSchema = (_component: any) => true;

Columns.checkRerender = (_prevProps, _nextProps) => false;

Columns.defaultProps = {
  display: {
    label: '',
  },
};

// eslint-disable-next-line @typescript-eslint/unbound-method
export default React.memo<ColumnsComponentProps>((props) => <Columns {...props} />, Columns.checkRerender);
