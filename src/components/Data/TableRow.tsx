import React, { useState } from 'react';

import { IconButton } from '..';
import Styled from '../../Styled';
import { ComponentSchema } from '../../types/ComponentSchema';

const StyledTableRow = Styled.tr<any>`
  border-style: solid;
  border-color: #dddddd;
  border-width: ${({ isExpanded }) => (isExpanded ? '1px 1px 0px 1px' : '1px')};
`;

const TableExpandedRow = Styled(StyledTableRow)`
  border-top-width: 0px;
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
  padding: 0px 8px;

  &:nth-last-of-type(2) {
    padding: 0px 4px 0px 8px;
  }

  &:last-of-type {
    padding: 0px 8px 0px 4px;
  }
`;

const TableRowActionButton = Styled(IconButton)`
  line-height: 0;
`;

const TableRowSortActionButton = Styled(TableRowActionButton)`
  font-size: 24px;
`;

const TableRowDeleteActionButton = Styled(TableRowActionButton)`
  color: red;
  font-size: 18px;
`;

export type TableRowExpandedType = 'table-row-expand';
export const TableRowExpandedTypeName = 'table-row-expand';

export interface TableRowExpandedSchema {
  type: TableRowExpandedType,
  components?: ComponentSchema[];
}

interface TableRowProps {
  path: string;
  key: string;

  isExpandable: boolean;

  allowAddRemove: boolean;
  allowSorting: boolean;

  showUpButton: boolean;
  showDownButton: boolean;

  columns: ComponentSchema[];
  expandablePanel: TableRowExpandedSchema | undefined;
  parentComponent: ComponentSchema;

  moveUp: () => void;
  moveDown: () => void;
  deleteRow: () => void;

  renderChildComponents: (components?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
}

const TableRow = (props: TableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let moveUpButton;
  let moveDownButton;
  let deleteButton;

  if (props.allowSorting !== false) {
    moveUpButton = <TableRowSortActionButton key={`${props.key}-moveup`} icon='caret-up' onClick={() => props.moveUp()} />;
    moveDownButton = <TableRowSortActionButton key={`${props.key}-movedown`} icon='caret-down' onClick={() => props.moveDown()} />;
  }

  if (props.allowAddRemove !== false) {
    deleteButton = <TableRowDeleteActionButton key={`${props.key}-delete`} icon='times' onClick={() => props.deleteRow()} />;
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

  const expandedRowElements: JSX.Element[] = props.renderChildComponents(props.expandablePanel?.components, props.path, props.expandablePanel as ComponentSchema).map(c => (
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
      <StyledTableRow key={props.key}>
        { rowElements }
      </StyledTableRow>
    );
  }

  return (
    <>
      <StyledTableRow isExpanded key={props.key}>
        { rowElements }
      </StyledTableRow>
      <TableExpandedRow key={`${props.key}-expanded`}>
        { expandedRowElements }
      </TableExpandedRow>
    </>
  );
};


export default TableRow;
