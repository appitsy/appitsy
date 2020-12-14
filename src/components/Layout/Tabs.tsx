import React from 'react';
import classNames from 'classnames';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';

import { AppComponent } from '../../types/AppComponent';
import { TabsProps, TabsTypeName } from '../../types/LayoutComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';
import { appendComponentPath, getParentComponentPath } from '../../utilities/ComponentPath';

interface TabsComponentProps extends TabsProps {
  className?: string;
  path?: string;
  renderChildComponents: (component?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
}

const TabsComponent: AppComponent<TabsComponentProps> = (props) => (
  <Tabs className={classNames(['appitsy-tabs', props.className])}>
    <TabList>
      { props.tabs?.map((tab) => <Tab>{tab.display?.label}</Tab>) }
    </TabList>

    {
      props.tabs?.map((tab) => {
        let tabPath: string;
        if (props.path) {
          const parentPath = props.data?.flattenDataWithParent === true ? getParentComponentPath(props.path) : props.path;
          tabPath = appendComponentPath(parentPath, tab.name);
        } else {
          tabPath = tab.name;
        }

        return (
          <TabPanel>
            { props.renderChildComponents(tab.components, tabPath, { ...props, type: TabsTypeName } as ComponentSchema) }
          </TabPanel>
        );
      })
    }

  </Tabs>
);

TabsComponent.validateSchema = (_component: any) => true;

TabsComponent.checkRerender = (_prevProps, _nextProps) => false;

TabsComponent.defaultProps = {
};

export default React.memo<TabsComponentProps>((props) => <TabsComponent {...props} />, TabsComponent.checkRerender);
