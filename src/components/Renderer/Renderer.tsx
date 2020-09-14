import React, { useState } from 'react';
import styled from '../../Styled';

import { ComponentSchema, TextFieldSchema, TextAreaSchema, ButtonSchema, NumberSchema, EmailSchema, PanelSchema } from '../../types/ComponentSchema';
import TextField from '../TextField/TextField';
import TextArea from '../TextArea/TextArea';
import Number from '../Number/Number';
import Button from '../Button/Button';
import { Types } from '../../types/Types';
import Email from '../Email/Email';
import Panel from '../Panel/Panel';
import { RendererOptions } from './RendererOptions';

const StyledPage = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({theme}) => theme.colors.bg};
    .thora-element {
        margin: ${({theme}) => theme.layout.componentInternalMargin};
    }
    .thora-component {
        margin: ${({theme}) => theme.layout.componentMargin};
    }
`;

type RendererProps = {
    schema: ComponentSchema[]
    data?: any;
    options?: RendererOptions;
}

const Renderer: React.FC<RendererProps> = (props) => {
    const [state, setState] = useState(props.data || {});

    const validateComponentName = (_componentName: string) => true;

    const handleChange = (component: ComponentSchema, value: any) => {
        setState((prevState: any) => ({
            ...prevState,
            [component.name]: value,
        }));
    };

    const handleClick = () => {
        alert(JSON.stringify(state));
    }

    const renderComponent = (component: ComponentSchema): JSX.Element => {
        const componentType = component.type.toLowerCase();
        switch(componentType) {
            case Types.TextField: 
                return ( 
                    <TextField 
                        value={state[component.name]} 
                        onValueChange={(value: any) => handleChange(component, value)} 
                        className='thora-component'
                        {...component as TextFieldSchema} /> 
                );
            case Types.TextArea: 
                return ( 
                    <TextArea 
                        value={state[component.name]} 
                        onValueChange={(value: any) => handleChange(component, value)}  
                        className='thora-component'
                        {...component as TextAreaSchema}/> 
                );
            case Types.Email:  
                return (
                    <Email 
                        value={state[component.name]} 
                        onValueChange={(value: any) => handleChange(component, value)}  
                        className='thora-component'
                        {...component as EmailSchema} /> 
                );
            case Types.Number: 
                return ( 
                    <Number
                        value={state[component.name]} 
                        onValueChange={(value: any) => handleChange(component, value)}  
                        className='thora-component'
                        {...component as NumberSchema}/> 
                );
            case Types.Button: 
                return ( 
                    <Button 
                        onClick={handleClick} 
                        className='thora-component'
                        {...component as ButtonSchema}/> 
                );


            case Types.Panel: {
                const childComponents = (component as PanelSchema).components || [];
                return (
                    <Panel className='thora-component' {...component as PanelSchema}>
                        { childComponents.map(panelChild => renderComponent(panelChild)) }
                    </Panel>
                );
            }
        }

        return <p className='thora-component'>Unknown component '{component.type}'</p>;
    }

    props.schema.forEach(component => {
        validateComponentName(component.name);
    });

    return (
    <StyledPage>
        { props.schema.map(component => renderComponent(component)) }
    </StyledPage>
    );
}

export default Renderer;