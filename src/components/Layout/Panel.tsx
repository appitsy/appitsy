import React, { useState } from 'react';

import classNames from 'classnames';

import Styled from '../../Styled';
import { AppComponent } from '../../types/AppComponent';
import { ComponentSchema } from '../../types/ComponentSchema';
import {
  PanelProps,
  PanelTypeName,
} from '../../types/LayoutComponentSchema';
import { getParentComponentPath } from '../../utilities/ComponentPath';
import { getBooleanOrDefault } from '../../utilities/Utilities';
import Icon from '../Basic/Icon';

interface PanelComponentProps extends PanelProps {
  className?: string;
  path?: string;
  renderChildComponents: (components?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
}

const PanelHeading = Styled.h5`
    margin: 0px;
    padding: 10px;
`;

const PanelIcon = Styled(Icon)`
    font-size: 18px;
`;

const Panel: AppComponent<PanelComponentProps> = (props) => {
  const expandable = getBooleanOrDefault(props.display?.expandable, true);
  const [expanded, setExpanded] = useState(!expandable || getBooleanOrDefault(props.display?.expanded, true));

  const path = getParentComponentPath(props.path);

  const toggleExpand = () => {
    if (!expandable) {
      return;
    }

    setExpanded(!expanded);
  };

  return (
    <div className={classNames(['appitsy-panel', props.className])}>
      <PanelHeading onClick={toggleExpand} className='appitsy-panel-heading'>
        { expandable ? <PanelIcon icon={expanded ? 'caret-down' : 'caret-right'} /> : null}
        {props.display.label}
      </PanelHeading>
      <div className={classNames(['appitsy-panel-body', expanded ? 'appitsy-panel-body-expanded' : 'appitsy-panel-body-collapsed'])}>
        {expanded ? props.renderChildComponents(props.components, path, { ...props, type: PanelTypeName } as ComponentSchema) : null}
      </div>
    </div>
  );
};

Panel.validateSchema = (_component: any) => {
  return true;
};

Panel.checkRerender = (_prevProps, _nextProps) => false;

Panel.defaultProps = {
  display: {
    label: '',
    expandable: true,
    expanded: true,
  },
};

export default React.memo<PanelComponentProps>((props) => <Panel {...props} />, Panel.checkRerender);
