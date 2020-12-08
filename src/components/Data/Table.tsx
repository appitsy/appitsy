import React from 'react';
import _ from 'lodash';

import { AppComponent } from '../../types/AppComponent';
import { TableProps } from '../../types/DataComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';
import { Button } from '../BasicComponents';

interface TableComponentProps extends TableProps {
  className?: string;
  path?: string;
  renderChildComponent: (component: ComponentSchema, parentPath?: string) => JSX.Element;
  value: any[];
  onValueChange(value: any[]): void;
}

const Table: AppComponent<TableComponentProps> = (props) => {
  // const [state, setState] = useState({});

  const addRow = () => {
    props.onValueChange([
      ...(props.value || []),
      { },
    ]);
  };

  return (
    <>
      <div>{ props.display?.label }</div>

      <div>
        { props.data?.columns?.map((column) => (
          <div>{ column.display?.label || column.name }</div>
        ))}
      </div>
      <div>
        {
          props.value?.map((_row, rIdx) => {
            const rowPath = props.path ? `${props.path}[${rIdx}]` : `[${rIdx}]`;
            return props.data.columns.map((column) => (
              props.renderChildComponent(column, rowPath)
            ));
          })
        }
      </div>
      <Button name="add" onClick={addRow} text="+ Add" />
    </>
  );
};

Table.validateSchema = (_component: any) => {
  return true;
};

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
