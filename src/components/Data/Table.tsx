/* eslint-disable react/no-array-index-key */
import React from 'react';
import _ from 'lodash';

import classNames from 'classnames';
import { AppComponent } from '../../types/AppComponent';
import { TableProps, TableTypeName } from '../../types/DataComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';
import { Button, IconButton } from '../Basic';
import Styled from '../../Styled';
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

const TableRowActions = Styled(TableRowColumn)`
  border: 0;
  width: 16px;
  padding: 0px 4px;
`;

const TableRowActionButton = Styled(IconButton)`
  line-height: 0;
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

  const moveUp = (rowIndex: number) => {
    const newValue = [...props.value];
    const removedItem = newValue.splice(rowIndex, 1)[0];
    newValue.splice(rowIndex - 1, 0, removedItem);
    props.onValueChange(newValue);
  };

  const moveDown = (rowIndex: number) => {
    const newValue = [...props.value];
    const removedItem = newValue.splice(rowIndex, 1)[0];
    newValue.splice(rowIndex + 1, 0, removedItem);
    props.onValueChange(newValue);
  };

  const deleteRow = (rowIndex: number) => {
    const newValue = [...props.value];
    newValue.splice(rowIndex, 1);
    props.onValueChange(newValue);
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

            let moveUpButton;
            let moveDownButton;
            let deleteButton;

            if (props.data.allowSorting !== false) {
              moveUpButton = <TableRowActionButton key={`${props.name}[${rIdx}]-moveup`} icon='caret-up' onClick={() => moveUp(rIdx)} />;
              moveDownButton = <TableRowActionButton key={`${props.name}[${rIdx}]-movedown`} icon='caret-down' onClick={() => moveDown(rIdx)} />;
            }

            if (props.data.allowAddRemove !== false) {
              deleteButton = <TableRowActionButton key={`${props.name}[${rIdx}]-delete`} icon='trash-alt' onClick={() => deleteRow(rIdx)} />;
            }

            return (
              <TableRow>
                {
                  props.renderChildComponents(columns, rowPath, { ...props, type: TableTypeName } as ComponentSchema).map(c => (
                    <TableRowColumn>
                      { c }
                    </TableRowColumn>
                  ))
                }
                <TableRowActions>
                  { (rIdx > 0) ? moveUpButton : null }
                  { (rIdx < props.value.length - 1) ? moveDownButton : null }
                </TableRowActions>
                <TableRowActions>
                  { deleteButton }
                </TableRowActions>
              </TableRow>
            );
          })
        }
      </table>
      { props.data.allowAddRemove !== false ? (<Button name='add' onClick={addRow} text='+ Add' />) : null }
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
