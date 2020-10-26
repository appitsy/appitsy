/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import Styled from '../../Styled';

import {
  Condition,
  ComponentSchema,
} from '../../types/ComponentSchema';
import { TextField, TextArea, Number, Email, Button, Password } from '../BasicComponents';
import { Types } from '../../types/Types';
import Panel from '../Layout/Panel';
import evaluate from '../../utilities/Evaluator';
import EvaluateLogic from '../../utilities/Logic';
import {
  TextFieldProps,
  TextAreaProps,
  EmailProps,
  NumberProps,
  ButtonProps,
  PasswordProps
} from '../../types/InputComponentSchema';
import { PanelProps } from '../../types/LayoutComponentSchema';

const StyledPage = Styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
    .appitsy-component {
        margin: 7px;
        width: calc(100% - 14px);
    }
`;

type RendererProps = {
  schema: ComponentSchema[];
  data?: any;
};

class Renderer extends React.Component<RendererProps> {
  state: any = this.props.data || {};

  validateComponentName = (_componentName: string) => true;

  handleChange = (component: ComponentSchema, value: any) => {
    this.setState({
      ...this.state,
      [component.name]: value,
    });
  };

  handleClick = () => {
    alert(JSON.stringify(this.state));
  };

  shouldShow = (condition: Condition) => {
    if (condition.expression) {
      return evaluate(condition.expression, { state: this.state });
    }

    if (condition.dependency) {
      var show = false;
      switch (condition.dependency.op) {
        // could be comparing a string to a number too, which is ok
        // eslint-disable-next-line eqeqeq
        case 'eq':
          show = this.state[condition.dependency.field] === condition.dependency.value;
          break;
        // could be comparing a string to a number too, which is ok
        // eslint-disable-next-line eqeqeq
        case 'neq':
          show = this.state[condition.dependency.field] !== condition.dependency.value;
          break;
      }

      return show;
    }

    return true;
  };

  renderComponent = (component: ComponentSchema): JSX.Element => {
    const condition = component.display?.condition;
    if (condition && !this.shouldShow(condition)) {
      return <Fragment />;
    }

    // check for logic
    const logicResult = EvaluateLogic(component, this.state);
    if (logicResult.value && logicResult.value !== this.state[component.name]) {
      this.setState({
        ...this.state,
        [component.name]: logicResult.value,
      });
    }

    const componentSchema = { ...component, ...logicResult.schema };

    const componentType = component.type.toLowerCase();
    switch (componentType) {
      case Types.TextField:
        return (
          <TextField
            value={this.state[component.name]}
            onValueChange={(value: any) => this.handleChange(component, value)}
            className='appitsy-component'
            {...(componentSchema as TextFieldProps)}
          />
        );
      case Types.TextArea:
        return (
          <TextArea
            value={this.state[component.name]}
            onValueChange={(value: any) => this.handleChange(component, value)}
            className='appitsy-component'
            {...(componentSchema as TextAreaProps)}
          />
        );
      case Types.Email:
        return (
          <Email
            value={this.state[component.name]}
            onValueChange={(value: any) => this.handleChange(component, value)}
            className='appitsy-component'
            {...(componentSchema as EmailProps)}
          />
        );
      case Types.Number:
        return (
          <Number
            value={this.state[component.name]}
            onValueChange={(value: any) => this.handleChange(component, value)}
            className='appitsy-component'
            {...(componentSchema as NumberProps)}
          />
        );
      case Types.Button:
        return (
          // eslint-disable-next-line prettier/prettier
          <Button
            onClick={this.handleClick}
            className='appitsy-component'
            {...(componentSchema as any as ButtonProps)} />
        );
      case Types.Password:
        return (
          <Password
            value={this.state[component.name]}
            onValueChange={(value: any) => this.handleChange(component, value)}
            className='appitsy-component'
            {...(componentSchema as PasswordProps)}
          />
        );

      case Types.Panel: {
        const childComponents = (component as PanelProps).components || [];
        return (
          // eslint-disable-next-line prettier/prettier
          <Panel
            className='appitsy-component'
            {...(componentSchema as PanelProps)}
          >
            {childComponents.map((panelChild) => this.renderComponent(panelChild))}
          </Panel>
        );
      }
    }

    return <p className='appitsy-component'>Unknown component '{component.type}'</p>;
  };

  render() {
    this.props.schema.forEach((component) => {
      this.validateComponentName(component.name);
    });

    return <StyledPage>{this.props.schema.map((component) => this.renderComponent(component))}</StyledPage>;
  }
}

export default Renderer;
