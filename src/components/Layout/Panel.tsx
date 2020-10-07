import React, { useState } from 'react';
import { PanelSchema, AppComponent } from '../../types/ComponentSchema';
import Styled from '../../Styled';
import classNames from 'classnames';

interface PanelProps extends PanelSchema {
    children: JSX.Element[];
    className: string;
}

const PanelHeading = Styled.h6`
    margin: 0px;
    padding: 10px;
`;

const Panel: AppComponent<PanelProps> = (props) => {
    const [ state, setState ] = useState({
        collapsible: props.display?.collapsible,
        collapsed: props.display?.collapsed || false,
    });

    const toggleCollapse = () => {
        if (!state.collapsible) {
            return;
        }

        setState(prevState => ({
            ...prevState,
            collapsed: !prevState.collapsed,
        }));
    }

    return (
        <div className={classNames(['appitsy-panel', props.className])}>
            <PanelHeading onClick={toggleCollapse} className='appitsy-panel-heading' >Panel - { props.name }</PanelHeading>
            <div className={classNames(['appitsy-panel-body', state.collapsed ? 'appitsy-panel-body-collapsed' : 'appitsy-panel-body-expanded'])}>{ state.collapsed ? null : props.children }</div>
        </div>
    );
}

Panel.validateSchema = (_component: any) => {
    return true;
};

Panel.checkRerender = (_prevProps, _nextProps) => false;

Panel.defaultProps = {
    display: {
        collapsible: true,
        collapsed: false,
    }
}

export default React.memo<PanelProps>(props => <Panel {...props}/>, Panel.checkRerender);
