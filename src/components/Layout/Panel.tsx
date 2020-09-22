import React, { useState } from 'react';
import { PanelSchema, ThoraComponent, PanelHeader } from '../../types/ComponentSchema';
import Styled from '../../Styled';

interface ThoraPanelProps extends PanelSchema {
    children: JSX.Element[];
    className: string;
}

const PanelHeading = Styled.h4<{ header?: PanelHeader }>`
    background-color: ${({header, theme}) => header?.background || theme.components.panel.background};
    color: ${({header, theme}) => header?.color || theme.components.panel.color};
    margin: 0px;
    padding: 10px;
`;

const PanelBody = Styled.div<{border?: string; borderRadius?: string;}>`
    border: ${({border, theme}) => border || theme.components.panel.border};
    border-radius: ${({borderRadius, theme}) => borderRadius || theme.components.panel.borderRadius};
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
        <PanelBody className={props.className} border={props.display?.border} borderRadius={props.display?.borderRadius}>
            <PanelHeading header={props.display?.header} onClick={toggleCollapse}>Panel - { props.name }</PanelHeading>
            { state.collapsed ? null : props.children }
        </PanelBody>
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