import React, { useState } from 'react';
import Styled from '../../Styled';
import classNames from 'classnames';

import Icon from '../BasicComponents/Icon';
import { AppComponent } from '../../types/AppComponent';
import { PanelProps } from '../../types/LayoutComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';

interface PanelComponentProps extends PanelProps {
  className?: string;
  path?: string;
  renderChildComponent: (component: ComponentSchema, parentPath?: string) => JSX.Element;
}

const PanelHeading = Styled.h5`
    margin: 0px;
    padding: 10px;
`;

const PanelIcon = Styled(Icon)`
    font-size: 18px;
`;

const Panel: AppComponent<PanelComponentProps> = (props) => {
  const [state, setState] = useState({
    expandable: props.display?.expandable || true,
    expanded: props.display?.expanded || true,
  });

  const toggleExpand = () => {
    if (!state.expandable) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      expanded: !prevState.expanded,
    }));
  };

  return (
    <div className={classNames(['appitsy-panel', props.className])}>
      <PanelHeading onClick={toggleExpand} className='appitsy-panel-heading'>
        <PanelIcon icon={state.expanded ? 'caret-down' : 'caret-right'} />
        {props.display.title}
      </PanelHeading>
      <div className={classNames(['appitsy-panel-body', state.expanded ? 'appitsy-panel-body-expanded' : 'appitsy-panel-body-collapsed'])}>
        {state.expanded ? props.components?.map(c => props.renderChildComponent(c, props.path)) : null}
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
    title: '',
    expandable: true,
    expanded: true,
  },
};

export default React.memo<PanelComponentProps>((props) => <Panel {...props} />, Panel.checkRerender);
