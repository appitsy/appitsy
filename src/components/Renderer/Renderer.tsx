/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import Styled from '../../Styled';

import {
  Condition,
  ComponentSchema,
} from '../../types/ComponentSchema';
import {
  TextField,
  TextArea,
  Number,
  Email,
  Button,
  Password,
} from '../BasicComponents';
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
  PasswordProps,
} from '../../types/InputComponentSchema';
import { PanelProps, TabsProps } from '../../types/LayoutComponentSchema';
import Tabs from '../Layout/Tabs';
import { Table } from '../Data';
import { TableProps } from '../../types/DataComponentSchema';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';

const StyledPage = Styled.div`
    display: flex;
    flex-direction: column;
    padding: 7px;
    .appitsy-component {
        margin: 7px;
        width: calc(100% - 14px);
    }
`;

export type RendererProps = {
  schema: ComponentSchema[];
  data?: any;
  onSubmit(data: any): void;
};

export class Renderer<T extends RendererProps = RendererProps> extends React.Component<T> {
  state: any = this.props.data || {};

  validateComponentName = (_componentName: string) => true;

  handleChange = (componentPath: string, value: any): void => {
    const newState = { ...this.state };
    _.set(newState, componentPath, value);
    this.setState(newState);
  };

  handleClick = () => {
    this.props.onSubmit(this.state);
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

  public renderComponent(component: ComponentSchema, parentPath?: string): JSX.Element {
    const condition = component.display?.condition;
    if (condition && !this.shouldShow(condition)) {
      return <Fragment />;
    }

    const componentPath = parentPath ? `${parentPath}.${component.name}` : component.name;

    // check for logic
    const logicResult = EvaluateLogic(component, this.state);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (logicResult.value && logicResult.value !== this.state[componentPath]) {
      this.handleChange(componentPath, logicResult.value);
    }

    const componentSchema = { ...component, ...logicResult.schema };

    const value = _.get(this.state, componentPath);
    const onValueChange = (val: any) => this.handleChange(componentPath, val);

    const componentType = component.type.toLowerCase();
    switch (componentType) {
      case Types.TextField:
        return (
          <TextField
            value={value}
            onValueChange={onValueChange}
            className='appitsy-component'
            key={componentPath}
            path={componentPath}
            {...(componentSchema as TextFieldProps)}
          />
        );
      case Types.TextArea:
        return (
          <TextArea
            value={value}
            onValueChange={onValueChange}
            className='appitsy-component'
            key={componentPath}
            path={componentPath}
            {...(componentSchema as TextAreaProps)}
          />
        );
      case Types.Email:
        return (
          <Email
            value={value}
            onValueChange={onValueChange}
            className='appitsy-component'
            key={componentPath}
            path={componentPath}
            {...(componentSchema as EmailProps)}
          />
        );
      case Types.Number:
        return (
          <Number
            value={value}
            onValueChange={onValueChange}
            className='appitsy-component'
            key={componentPath}
            path={componentPath}
            {...(componentSchema as NumberProps)}
          />
        );
      case Types.Button:
        return (
          // eslint-disable-next-line prettier/prettier
          <Button
            onClick={this.handleClick}
            className='appitsy-component'
            key={componentPath}
            path={componentPath}
            {...(componentSchema as any as ButtonProps)} />
        );
      case Types.Password:
        return (
          <Password
            value={value}
            onValueChange={onValueChange}
            className='appitsy-component'
            key={componentPath}
            path={componentPath}
            {...(componentSchema as PasswordProps)}
          />
        );

      case Types.Panel: {
        return (
          <Panel
            className='appitsy-component'
            renderChildComponent={this.renderComponent.bind(this)}
            key={componentPath}
            path={componentPath}
            {...(componentSchema as PanelProps)}
          />
        );
      }

      case Types.Tabs: {
        return (
          <Tabs
            className='appitsy-component'
            renderChildComponent={this.renderComponent.bind(this)}
            key={componentPath}
            path={componentPath}
            {...(componentSchema as TabsProps)}
          />
        );
      }

      case Types.Table: {
        return (
          <Table
            className='appitsy-component'
            renderChildComponent={this.renderComponent.bind(this)}
            key={componentPath}
            path={componentPath}
            value={value}
            onValueChange={onValueChange}
            {...(componentSchema as TableProps)}
          />
        );
      }

      default: {
        return (
          <p className='appitsy-component'>
            { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
            Unknown component &apos;{component.type}&apos;
          </p>
        );
      }
    }
  }

  public renderChildren() {
    return this.props.schema.map((component) => this.renderComponent(component));
  }

  public renderRoot() {
    return (
      <StyledPage>
        {this.renderChildren()}
        <ReactTooltip />
      </StyledPage>
    );
  }

  public render() {
    this.props.schema.forEach((component) => {
      this.validateComponentName(component.name);
    });

    return this.renderRoot();
  }
}
