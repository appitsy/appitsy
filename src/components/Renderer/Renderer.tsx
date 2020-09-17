import React from 'react';
import styled from '../../Styled';

import { ComponentSchema, TextFieldSchema, TextAreaSchema, ButtonSchema, NumberSchema, EmailSchema, PanelSchema, PasswordSchema } from '../../types/ComponentSchema';
import { TextField, TextArea, Number, Email, Button, Password } from '../BasicComponents';
import { Types } from '../../types/Types';
import Panel from '../Layout/Panel';
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

class Renderer extends React.Component<RendererProps> {
    state: any = this.props.data || {};

    validateComponentName = (_componentName: string) => true;

    handleChange = (component: ComponentSchema, value: any) => {
        this.setState({
            ...this.state,
            [component.name]: value,
        })
    };

    handleClick = () => {
        alert(JSON.stringify(this.state));
    }

    renderComponent = (component: ComponentSchema): JSX.Element => {
        const componentType = component.type.toLowerCase();
        switch(componentType) {
            case Types.TextField: 
                return ( 
                    <TextField 
                        value={this.state[component.name]} 
                        onValueChange={(value: any) => this.handleChange(component, value)} 
                        className='thora-component'
                        {...component as TextFieldSchema} /> 
                );
            case Types.TextArea: 
                return ( 
                    <TextArea 
                        value={this.state[component.name]} 
                        onValueChange={(value: any) => this.handleChange(component, value)}  
                        className='thora-component'
                        {...component as TextAreaSchema}/> 
                );
            case Types.Email:  
                return (
                    <Email 
                        value={this.state[component.name]} 
                        onValueChange={(value: any) => this.handleChange(component, value)}  
                        className='thora-component'
                        {...component as EmailSchema} /> 
                );
            case Types.Number: 
                return ( 
                    <Number
                        value={this.state[component.name]} 
                        onValueChange={(value: any) => this.handleChange(component, value)}  
                        className='thora-component'
                        {...component as NumberSchema}/> 
                );
            case Types.Button: 
                return ( 
                    <Button 
                        onClick={this.handleClick} 
                        className='thora-component'
                        {...component as ButtonSchema}/> 
                );
            case Types.Password:
                return (
                    <Password value={this.state[component.name]} 
                        onValueChange={(value: any) => this.handleChange(component, value)}  
                        className='thora-component'
                        {...component as PasswordSchema}/>
                )

            case Types.Panel: {
                const childComponents = (component as PanelSchema).components || [];
                return (
                    <Panel className='thora-component' {...component as PanelSchema}>
                        { childComponents.map(panelChild => this.renderComponent(panelChild)) }
                    </Panel>
                );
            }
        }

        return <p className='thora-component'>Unknown component '{component.type}'</p>;
    }

    render () {
        this.props.schema.forEach(component => {
            this.validateComponentName(component.name);
        });

        return (
        <StyledPage>
            { this.props.schema.map(component => this.renderComponent(component)) }
        </StyledPage>
        );
    }
}

export default Renderer;