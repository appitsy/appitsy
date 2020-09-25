import React from 'react';
import styled from '../../Styled';

import { Condition, ComponentSchema, TextFieldSchema, TextAreaSchema, ButtonSchema, NumberSchema, EmailSchema, PanelSchema, PasswordSchema, BaseComponentSchema } from '../../types/ComponentSchema';
import { TextField, TextArea, Number, Email, Button, Password } from '../BasicComponents';
import { Types } from '../../types/Types';
import Panel from '../Layout/Panel';
import { RendererOptions } from './RendererOptions';
import evaluate from '../../utilities/Evaluator';
import EvaluateLogic from '../../utilities/Logic';

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

    shouldShow = (condition: Condition) => {
        if (condition.expression) {
            return evaluate(condition.expression, { state: this.state });
        }

        if (condition.dependency) {
            var show = false;
            switch(condition.dependency.op) {
                // could be comparing a string to a number too, which is ok
                // eslint-disable-next-line eqeqeq
                case 'eq': show = (this.state[condition.dependency.field] == condition.dependency.value); break;
                // could be comparing a string to a number too, which is ok
                // eslint-disable-next-line eqeqeq
                case 'neq': show = (this.state[condition.dependency.field] != condition.dependency.value); break;
            }
    
            return show;
        }

        return true;
    }

    renderComponent = (component: BaseComponentSchema): JSX.Element => {
        const condition = component.display?.condition;
        if (condition && !this.shouldShow(condition)) {
            return <></>;
        }

        // check for logic
        let logicResult = EvaluateLogic(component, this.state);
        if (logicResult.value && logicResult.value !== this.state[component.name]) {
            this.setState({
                ...this.state,
                [component.name]: logicResult.value,
            })
        }

        const componentSchema = {...component, ...logicResult.schema};
    
        const componentType = component.type.toLowerCase();
        switch(componentType) {
            case Types.TextField: 
                return ( 
                    <TextField 
                        value={this.state[component.name]} 
                        onValueChange={(value: any) => this.handleChange(component, value)} 
                        className='thora-component'
                        {...componentSchema as TextFieldSchema} /> 
                );
            case Types.TextArea: 
                return ( 
                    <TextArea 
                        value={this.state[component.name]} 
                        onValueChange={(value: any) => this.handleChange(component, value)}  
                        className='thora-component'
                        {...componentSchema as TextAreaSchema} /> 
                );
            case Types.Email:  
                return (
                    <Email 
                        value={this.state[component.name]} 
                        onValueChange={(value: any) => this.handleChange(component, value)}  
                        className='thora-component'
                        {...componentSchema as EmailSchema} /> 
                );
            case Types.Number: 
                return ( 
                    <Number
                        value={this.state[component.name]} 
                        onValueChange={(value: any) => this.handleChange(component, value)}  
                        className='thora-component'
                        {...componentSchema as NumberSchema} /> 
                );
            case Types.Button: 
                return ( 
                    <Button 
                        onClick={this.handleClick} 
                        className='thora-component'
                        {...componentSchema as ButtonSchema} /> 
                );
            case Types.Password:
                return (
                    <Password value={this.state[component.name]} 
                        onValueChange={(value: any) => this.handleChange(component, value)}  
                        className='thora-component'
                        {...componentSchema as PasswordSchema} />
                )

            case Types.Panel: {
                const childComponents = (component as PanelSchema).components || [];
                return (
                    <Panel className='thora-component' {...componentSchema as PanelSchema}>
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