import React from 'react';
import _ from 'lodash';

import { AppComponent } from '../../types/AppComponent';
import { TableProps, TableTypeName } from '../../types/DataComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';
import { Button } from '../BasicComponents';
import Styled from '../../Styled';
import classNames from 'classnames';
import evaluate from '../../utilities/Evaluator';

interface TableComponentProps extends TableProps {
  className?: string;
  path?: string;
  renderChildComponents: (components?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
  value: any[];
  onValueChange(value: any[]): void;
}

const TableHeader = Styled.tr``;
const TableRow = Styled.tr``;
const TableHeaderColumn = Styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 5px 8px;
`;
const TableRowColumn = Styled.td`
  border: 1px solid #dddddd;
  text-align: left;

  .appitsy-input {
    margin: 0px;
    width: 100%;

    * {
      border: none;
      box-shadow: none;
    }
  }
`;

const Table: AppComponent<TableComponentProps> = (props: TableComponentProps) => {
  // const [state, setState] = useState({});

  const addNewDefault = () => {
    if (props.data.addNewDefault) {
      return evaluate(props.data.addNewDefault);
    }

    return {};
  };

  const addRow = () => {
    props.onValueChange([...(props.value || []), addNewDefault()]);
  };

  const columns = props.data.columns.map((column) => {
    const component = _.cloneDeep(column);
    component.display = component.display === undefined ? {} : component.display;
    component.display.hideLabel = true;
    return component;
  });

  return (
    <div className={classNames(['appitsy-table', props.className])}>
      <div>{props.display?.label}</div>

      <table style={{ width: '100%' }}>
        <TableHeader>
          {props.data?.columns?.map((column) => (
            <TableHeaderColumn>
              {column.display?.label || column.name}
            </TableHeaderColumn>
          ))}
        </TableHeader>

        {
        props.value?.map((_row, rIdx) => {
          const rowPath = props.path ? `${props.path}[${rIdx}]` : `[${rIdx}]`;

          return (
            <TableRow>
              {
                props.renderChildComponents(columns, rowPath, { ...props, type: TableTypeName } as ComponentSchema).map(c => (
                  <TableRowColumn>
                    { c }
                  </TableRowColumn>
                ))
              }
            </TableRow>
          );
        })}
      </table>
      <Button name='add' onClick={addRow} text='+ Add' />
    </div>
  );
};

Table.validateSchema = (_component: any) => true;

Table.checkRerender = (_prevProps, _nextProps) => {
  // return _.isEqual(prevProps.value, nextProps.value);
  return false;
};

Table.defaultProps = {
  display: {
    label: '',
  },
};

// eslint-disable-next-line @typescript-eslint/unbound-method
export default React.memo<TableComponentProps>((props) => <Table {...props} />, Table.checkRerender);
