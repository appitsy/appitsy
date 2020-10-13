import React, { useState } from 'react';
import { PanelSchema, AppComponent } from '../../types/ComponentSchema';
import Styled from '../../Styled';
import classNames from 'classnames';

import Icon from '../BasicComponents/Icon';

interface PanelProps extends PanelSchema {
  children: JSX.Element[] | JSX.Element;
  className?: string;
}

const PanelHeading = Styled.h5`
    margin: 0px;
    padding: 10px;
`;

const PanelIcon = Styled(Icon)`
    font-size: 18px;
`;

const Panel: AppComponent<PanelProps> = (props) => {
    const [ state, setState ] = useState({
        expandable: props.display?.expanded,
        expanded: props.display?.expanded || false,
    });

    const toggleExpand = () => {
        if (!state.expandable) {
            return;
        }

        setState(prevState => ({
            ...prevState,
            expanded: !prevState.expanded,
        }));
    }

    return (
        <div className={classNames(['appitsy-panel', props.className])}>
            <PanelHeading onClick={toggleExpand} className='appitsy-panel-heading' ><PanelIcon icon={state.expanded ? "caret-down" : "caret-right" } />{ props.name }</PanelHeading>
            <div className={classNames(['appitsy-panel-body', state.expanded ? 'appitsy-panel-body-expanded' : 'appitsy-panel-body-collapsed'])}>{ state.expanded ? props.children : null }</div>
        </div>
    );
}

Panel.validateSchema = (_component: any) => {
    return true;
};

Panel.checkRerender = (_prevProps, _nextProps) => false;

Panel.defaultProps = {
    display: {
        expandable: true,
        expanded: true,
    }
}

export default React.memo<PanelProps>(props => <Panel {...props}/>, Panel.checkRerender);
