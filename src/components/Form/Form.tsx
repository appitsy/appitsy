/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';

import _, { cloneDeep } from 'lodash';

import Styled from '../../Styled';
import { Condition } from '../../types/BaseComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';
import {
  ObjectComponentProps,
  TableProps,
} from '../../types/DataComponentSchema';
import {
  ButtonProps,
  CheckboxProps,
  EmailProps,
  NumberProps,
  PasswordProps,
  RadioProps,
  SelectProps,
  TextAreaProps,
  TextFieldProps,
} from '../../types/InputComponentSchema';
import {
  ColumnsProps,
  PanelProps,
  TabsProps,
} from '../../types/LayoutComponentSchema';
import { Types } from '../../types/Types';
import { getRelativeComponentPath } from '../../utilities/ComponentPath';
import evaluate from '../../utilities/Evaluator';
import EvaluateLogic from '../../utilities/Logic';
import {
  Button,
  Checkbox,
  Email,
  Number,
  Password,
  Radio,
  Select,
  TextArea,
  TextField,
} from '../Basic';
import MultiCheckbox from '../Basic/MultiCheckbox';
import {
  ObjectComponent,
  Table,
} from '../Data';
import { Columns } from '../Layout';
import Panel from '../Layout/Panel';
import Tabs from '../Layout/Tabs';

const StyledPage = Styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px;
`;

export type FormProps = {
  schema: ComponentSchema[];
  data: any;
  onDataChange?: (data: any) => void;
  onSubmit?: (data: any, buttonName: string) => void;
};

interface ValidationError {
  fieldName: string;
  error: string;
}

interface FormState {
  schema: ComponentSchema[];
  data: any;
  originalData: any;
  formUpdating: boolean;
  validationErrors: ValidationError[],
}

export class Form<T extends FormProps = FormProps> extends React.Component<T, FormState> {
  formId = _.uniqueId();

  constructor(props: FormProps) {
    super(props as any);
    this.state = {
      data: this.props.data,
      originalData: this.props.data,
      schema: this.props.schema,
      formUpdating: false,
      validationErrors: [],
    };
  }

  shouldComponentUpdate(nextProps: FormProps, nextState: FormState) {
    return nextProps.data !== this.state.data
            || nextProps.schema !== this.state.schema
            || this.state.validationErrors.length !== nextState.validationErrors.length;
  }

  static getDerivedStateFromProps(nextProps: FormProps, currentState: FormState): any {
    const updatedState: any = {};

    if (nextProps.data !== currentState.originalData) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updatedState.originalData = nextProps.data;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updatedState.data = nextProps.data;
    }

    if (nextProps.schema !== currentState.schema) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updatedState.schema = nextProps.schema;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (updatedState.data !== undefined || updatedState.schema !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return updatedState;
    }

    return null;
  }

  componentDidMount() {
    // Focus the first input element on form load
    const firstInputEl = document.getElementById(this.formId)?.querySelector('input');
    if (firstInputEl) {
      firstInputEl.focus();
    }
  }

  validateComponentName = (_componentName: string) => true;

  handleChange = (componentPath: string, value: any): void => {
    if (this.state.formUpdating === true) {
      return;
    }

    const newStateData = { ...this.state.data };
    _.set(newStateData, componentPath, value);
    this.setState({
      data: newStateData,
    });

    if (this.props.onDataChange) {
      this.props.onDataChange(newStateData);
    }
  };

  handleClick = (buttonName: string) => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.data, buttonName);
    }
  };

  shouldShow = (condition: Condition) => {
    if (condition.expression) {
      return evaluate(condition.expression, { data: this.state.data });
    }

    if (condition.dependency) {
      let show = false;
      switch (condition.dependency.op) {
        // could be comparing a string to a number too, which is ok
        // eslint-disable-next-line eqeqeq
        case 'eq':
          show = this.state.data[condition.dependency.field] === condition.dependency.value;
          break;
        // could be comparing a string to a number too, which is ok
        // eslint-disable-next-line eqeqeq
        case 'neq':
          show = this.state.data[condition.dependency.field] !== condition.dependency.value;
          break;
      }

      return show;
    }

    return true;
  };

  setValidationErrorForField = (fieldName: string, errorMsg?: string) => {
    const validationErrors = cloneDeep(this.state.validationErrors);
    const fieldErrorIdx = validationErrors.findIndex(x => x.fieldName === fieldName);

    if (fieldErrorIdx === -1) {
      if (errorMsg === undefined || errorMsg.length === 0) {
        // no change needed.
        return;
      }

      validationErrors.push({
        fieldName,
        error: errorMsg,
      });
    } else if (errorMsg === undefined || errorMsg.length === 0) {
      validationErrors.splice(fieldErrorIdx, 1);
    } else {
      // don't update state if already that error is set
      if (validationErrors[fieldErrorIdx].error === errorMsg) {
        return;
      }

      validationErrors[fieldErrorIdx].error = errorMsg;
    }

    this.setState({ validationErrors });
  };

  public renderComponent(component: ComponentSchema, parentPath?: string): JSX.Element {
    const condition = component.display?.condition;
    if (condition && !this.shouldShow(condition)) {
      return <Fragment />;
    }

    // if path overridden, use that
    const componentPath = getRelativeComponentPath(component.name, parentPath, component.data?.path);

    // check for logic
    const logicResult = EvaluateLogic(component, this.state.data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (logicResult.value && logicResult.value !== this.state.data[componentPath]) {
      this.handleChange(componentPath, logicResult.value);
    }

    const componentSchema = { ...component, ...logicResult.schema };

    const value = _.get(this.state.data, componentPath);

    const commonProperties = {
      className: 'appitsy-component',
      key: componentPath,
      path: componentPath,
    };

    const commonPropertiesWithValue = {
      ...commonProperties,
      value,
      onValidationError: this.setValidationErrorForField,
      onValueChange: (val: any) => this.handleChange(componentPath, val),
    };

    const componentType = component.type.toLowerCase();
    switch (componentType) {
      case Types.TextField:
        return (
          <TextField
            {...commonPropertiesWithValue}
            {...(componentSchema as TextFieldProps)}
          />
        );
      case Types.TextArea:
        return (
          <TextArea
            {...commonPropertiesWithValue}
            {...(componentSchema as TextAreaProps)}
          />
        );
      case Types.Email:
        return (
          <Email
            {...commonPropertiesWithValue}
            {...(componentSchema as EmailProps)}
          />
        );
      case Types.Number:
        return (
          <Number
            {...commonPropertiesWithValue}
            {...(componentSchema as NumberProps)}
          />
        );
      case Types.Button:
        return (
          // eslint-disable-next-line prettier/prettier
          <Button
            {...commonProperties}
            onClick={this.handleClick}
            disabled={this.state.validationErrors.length > 0}
            {...(componentSchema as ButtonProps)}
          />
        );
      case Types.Password:
        return (
          <Password
            {...commonPropertiesWithValue}
            {...(componentSchema as PasswordProps)}
          />
        );

      case Types.Checkbox:
        return (
          <Checkbox
            {...commonPropertiesWithValue}
            {...(componentSchema as CheckboxProps)}
          />
        );

      case Types.MultiCheckbox:
        return (
          <MultiCheckbox
            {...commonPropertiesWithValue}
            {...(componentSchema as CheckboxProps)}
          />
        );

      case Types.Radio:
        return (
          <Radio
            {...commonPropertiesWithValue}
            {...(componentSchema as RadioProps)}
          />
        );

      case Types.Select:
        return (
          <Select
            {...commonPropertiesWithValue}
            {...(componentSchema as SelectProps)}
          />
        );

      case Types.Panel: {
        return (
          <Panel
            {...commonProperties}
            renderChildComponents={this.renderChildComponents.bind(this)}
            {...(componentSchema as PanelProps)}
          />
        );
      }

      case Types.Columns: {
        return (
          <Columns
            {...commonProperties}
            renderChildComponents={this.renderChildComponents.bind(this)}
            {...(componentSchema as ColumnsProps)}
          />
        );
      }

      case Types.Tabs: {
        return (
          <Tabs
            {...commonProperties}
            renderChildComponents={this.renderChildComponents.bind(this)}
            {...(componentSchema as TabsProps)}
          />
        );
      }

      case Types.Table: {
        return (
          <Table
            {...commonPropertiesWithValue}
            renderChildComponents={this.renderChildComponents.bind(this)}
            {...(componentSchema as TableProps)}
          />
        );
      }

      case Types.ObjectComponent: {
        return (
          <ObjectComponent
            {...commonProperties}
            renderChildComponents={this.renderChildComponents.bind(this)}
            {...(componentSchema as ObjectComponentProps)}
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
      <StyledPage id={this.formId}>
        {this.renderChildren()}
      </StyledPage>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public renderChildComponents(childComponents?: ComponentSchema[], parentPath?: string, _parentComponent?: ComponentSchema): JSX.Element[] {
    return childComponents?.map(c => this.renderComponent(c, parentPath)) || [];
  }

  public render(): JSX.Element {
    this.props.schema.forEach((component) => {
      this.validateComponentName(component.name);
    });

    return this.renderRoot();
  }
}
