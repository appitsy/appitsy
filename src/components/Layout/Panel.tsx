import React, { useState } from 'react';
import { PanelSchema, ThoraComponent } from '../../types/ComponentSchema';
import Styled from '../../Styled';
import classNames from 'classnames';

interface ThoraPanelProps extends PanelSchema {
    children: JSX.Element[];
    className: string;
}

const PanelHeading = Styled.h6`
    margin: 0px;
    padding: 10px;
`;

const Panel: ThoraComponent<ThoraPanelProps> = (props) => {
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
        <div className={classNames(['thora-panel', props.className])}>
            <PanelHeading onClick={toggleCollapse} className='thora-panel-heading' >Panel - { props.name }</PanelHeading>
            <div className={classNames(['thora-panel-body', state.collapsed ? 'thora-panel-body-collapsed' : 'thora-panel-body-expanded'])}>{ state.collapsed ? null : props.children }</div>
        </div>
    );
}

Panel.validateSchema = (_component: any) => {
    return true;
};

Panel.checkRerender = (prevProps, nextProps) => false;

Panel.defaultProps = {
    display: {
        collapsible: true,
        collapsed: false,
    }
}

export default React.memo<ThoraPanelProps>(props => <Panel {...props}/>, Panel.checkRerender);