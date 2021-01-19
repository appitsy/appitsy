/* eslint-disable react/no-array-index-key */
import React from 'react';

import classNames from 'classnames';
import _ from 'lodash';

import Styled from '../../Styled';
import { AppComponent } from '../../types/AppComponent';
import { ComponentSchema } from '../../types/ComponentSchema';
import {
  TableProps,
  TableRowExpandedTypeName,
  TableTypeName,
} from '../../types/DataComponentSchema';
import evaluate from '../../utilities/Evaluator';
import { getBooleanOrDefault } from '../../utilities/Utilities';
import { Button } from '../Basic';
import TableRow from './TableRow';

interface TableComponentProps extends TableProps {
  className?: string;
  path?: string;
  renderChildComponents: (components?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
  value: any[];
  onValueChange(value: any[]): void;
}

const StyledTableRow = Styled.tr<any>`
  border-style: solid;
  border-color: #dddddd;
  border-width: ${({ isExpanded }) => (isExpanded ? '1px 1px 0px 1px' : '1px')};
`;

const TableHeader = Styled(StyledTableRow)``;
const TableHeaderColumn = Styled.th`
  text-align: left;
  padding: 5px 8px;
`;

const AddButtonRow = Styled.div`
  margin-top: 6px;

  button {
    width: 100px !important;
  }
`;



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

  const expandablePanelIndex = _.findIndex(props.components, x => x.type === TableRowExpandedTypeName);
  const expandablePanel = expandablePanelIndex !== -1 ? props.components[expandablePanelIndex] : undefined;
  const areRowsExpandable = expandablePanel !== undefined;

  const columns = props.components.map((column) => {
    const component = _.cloneDeep(column);
    component.display = component.display === undefined ? {} : component.display;
    component.display.hideLabel = true;
    return component;
  });

  if (areRowsExpandable) {
    columns.splice(expandablePanelIndex, 1);
  }

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
              columns?.map((column) => (
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
              <TableRow
                path={props.path ? `${props.path}[${rIdx}]` : `[${rIdx}]`}
                key={`${props.name}[${rIdx}]`}
                allowSorting={getBooleanOrDefault(props.display?.allowSorting, true)}
                allowAddRemove={getBooleanOrDefault(props.display?.allowAddRemove, true)}
                showUpButton={(rIdx > 0)}
                showDownButton={(rIdx < value.length - 1)}
                isExpandable={areRowsExpandable}
                moveUp={() => moveUp(rIdx)}
                moveDown={() => moveDown(rIdx)}
                deleteRow={() => deleteRow(rIdx)}
                columns={columns}
                expandablePanel={expandablePanel as any}
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
