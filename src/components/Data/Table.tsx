/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import classNames from 'classnames';
import _ from 'lodash';

import Styled from '../../Styled';
import { AppComponent } from '../../types/AppComponent';
import { ComponentSchema } from '../../types/ComponentSchema';
import {
  TableProps,
  TableTypeName,
} from '../../types/DataComponentSchema';
import evaluate from '../../utilities/Evaluator';
import {
  Button,
  IconButton,
} from '../Basic';

interface TableComponentProps extends TableProps {
  className?: string;
  path?: string;
  renderChildComponents: (components?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
  value: any[];
  onValueChange(value: any[]): void;
}

const TableRow = Styled.tr<any>`
  border-style: solid;
  border-color: #dddddd;
  border-width: ${({ isExpanded }) => (isExpanded ? '1px 1px 0px 1px' : '1px')};
`;

const TableHeader = Styled(TableRow)``;
const TableExpandedRow = Styled(TableRow)`
  border-top-width: 0px;
`;

const TableHeaderColumn = Styled.th`
  text-align: left;
  padding: 5px 8px;
`;

const TableRowColumn = Styled.td`
  text-align: left;
`;

const ExpandRowButtonColumn = Styled(TableRowColumn)`
  width: 30px;
  text-align: center;
`;

const TableRowActions = Styled(TableRowColumn)`
  width: 16px;
  padding: 0px 4px;
`;

const TableRowActionButton = Styled(IconButton)`
  line-height: 0;
`;

const AddButtonRow = Styled.div`
  margin-top: 6px;

  button {
    width: 100px !important;
  }
`;

interface TableRowProps {
  path: string;
  key: string;

  isExpandable: boolean;

  allowAddRemove: boolean;
  allowSorting: boolean;

  showUpButton: boolean;
  showDownButton: boolean;

  columns: ComponentSchema[];
  expandablePanel: ComponentSchema[];
  parentComponent: ComponentSchema;

  moveUp: () => void;
  moveDown: () => void;
  deleteRow: () => void;

  renderChildComponents: (components?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
}

const TR = (props: TableRowProps) => {
  let [isExpanded, setIsExpanded] = useState(false);

  let moveUpButton;
  let moveDownButton;
  let deleteButton;

  if (props.allowSorting !== false) {
    moveUpButton = <TableRowActionButton key={`${props.key}-moveup`} icon='caret-up' onClick={() => props.moveUp()} />;
    moveDownButton = <TableRowActionButton key={`${props.key}-movedown`} icon='caret-down' onClick={() => props.moveDown()} />;
  }

  if (props.allowAddRemove !== false) {
    deleteButton = <TableRowActionButton key={`${props.key}-delete`} icon='trash-alt' onClick={() => props.deleteRow()} />;
  }

  const rowActions = [
    (
      <TableRowActions>
        { props.showUpButton ? moveUpButton : null }
        { props.showDownButton ? moveDownButton : null }
      </TableRowActions>
    ),
    (
      <TableRowActions>
        { deleteButton }
      </TableRowActions>
    ),
  ];

  const expandableButton = (
    <ExpandRowButtonColumn>
      <IconButton icon={isExpanded ? 'chevron-down' : 'chevron-right'} onClick={() => setIsExpanded(!isExpanded)} />
    </ExpandRowButtonColumn>
  );

  const rowColumns = props.renderChildComponents(props.columns, props.path, props.parentComponent).map(c => (
    <TableRowColumn>
      { c }
    </TableRowColumn>
  ));

  const rowElements: JSX.Element[] = [
    ...(props.isExpandable ? [expandableButton] : []),
    ...rowColumns,
    ...rowActions,
  ];

  const expandedRowElements: JSX.Element[] = props.renderChildComponents(props.expandablePanel, props.path, props.parentComponent).map(c => (
    <>
      {/* Space for our expandable button */}
      <TableRowColumn />
      <TableRowColumn colSpan={rowElements.length - rowActions.length - 1}>
        { c }
      </TableRowColumn>
      {/* Space for our row actions */}
      <TableRowColumn />
      <TableRowColumn />
    </>
  ));

  if (!props.isExpandable || !isExpanded) {
    return (
      <TableRow key={props.key}>
        { rowElements }
      </TableRow>
    );
  }

  return (
    <>
      <TableRow isExpanded={true} key={props.key}>
        { rowElements }
      </TableRow>
      <TableExpandedRow key={`${props.key}-expanded`}>
        { expandedRowElements }
      </TableExpandedRow>
    </>
  );
};

const Table: AppComponent<TableComponentProps> = (props: TableComponentProps) => {
  // const [state, setState] = useState({});

  const addNewDefault = () => {
    if (props.data?.addNewDefault) {
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

  const areRowsExpandable = (props.expandablePanel && props.expandablePanel.length > 0) || false;

  const columns = props.columns.map((column) => {
    const component = _.cloneDeep(column);
    component.display = component.display === undefined ? {} : component.display;
    component.display.hideLabel = true;
    return component;
  });

  const value = props.value || (props.display?.atleastOneRow === true ? [{}] : []);

  return (
    <div className={classNames(['appitsy-table', props.className])}>
      <div>{props.display?.label}</div>

      <table style={{ width: '100%' }}>
        <thead>
          <TableHeader>
            {/* for expanding rows */}
            { areRowsExpandable ? <TableHeaderColumn /> : null }
            {
              props.columns?.map((column) => (
                <TableHeaderColumn>
                  {column.display?.label || column.name}
                </TableHeaderColumn>
              ))
            }
            {/* For actions and delete button */}
            <TableHeaderColumn />
            <TableHeaderColumn />
          </TableHeader>
        </thead>

        <tbody>
          {
            value.map((_row, rIdx) => (
              <TR
                path={props.path ? `${props.path}[${rIdx}]` : `[${rIdx}]`}
                key={`${props.name}[${rIdx}]`}
                allowSorting={props.display?.allowSorting || true}
                allowAddRemove={props.display?.allowAddRemove || true}
                showUpButton={(rIdx > 0)}
                showDownButton={(rIdx < value.length - 1)}
                isExpandable={areRowsExpandable}
                moveUp={() => moveUp(rIdx)}
                moveDown={() => moveDown(rIdx)}
                deleteRow={() => deleteRow(rIdx)}
                columns={columns}
                expandablePanel={props.expandablePanel || []}
                parentComponent={{ ...props, type: TableTypeName } as ComponentSchema}
                renderChildComponents={props.renderChildComponents}
              />
            ))
          }
        </tbody>
      </table>
      { props.display?.allowAddRemove !== false ? (<AddButtonRow><Button name='add' onClick={addRow} text='+ Add' /></AddButtonRow>) : null }
    </div>
  );
};

Table.validateSchema = (_component: any) => true;

Table.checkRerender = (_prevProps, _nextProps) => false;

Table.defaultProps = {
  display: {
    label: '',
  },
};

// eslint-disable-next-line @typescript-eslint/unbound-method
export default React.memo<TableComponentProps>((props) => <Table {...props} />, Table.checkRerender);
