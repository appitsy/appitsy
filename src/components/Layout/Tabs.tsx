import React from 'react';
import classNames from 'classnames';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';

import { AppComponent } from '../../types/AppComponent';
import { TabsProps } from '../../types/LayoutComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';
import { appendComponentPath, getParentComponentPath } from '../../utilities/ComponentPath';

interface TabsComponentProps extends TabsProps {
  className?: string;
  path?: string;
  renderChildComponent: (component: ComponentSchema, parentPath?: string) => JSX.Element;
}

const TabsComponent: AppComponent<TabsComponentProps> = (props) => (
  <Tabs className={classNames(['appitsy-tabs', props.className])}>
    <TabList>
      { props.components?.map((tab) => <Tab>{tab.display?.label}</Tab>) }
    </TabList>

    {
      props.components?.map((tab) => (
        <TabPanel>
          {
            tab.components?.map(c => {
              let tabPath;
              if (props.path) {
                const parentPath = props.data?.flattenDataWithParent === true ? getParentComponentPath(props.path) : props.path;
                tabPath = appendComponentPath(parentPath, tab.name);
              } else {
                tabPath = tab.name;
              }

              return props.renderChildComponent(c, tabPath);
            })
          }
        </TabPanel>
      ))
    }

  </Tabs>
);

TabsComponent.validateSchema = (_component: any) => true;

TabsComponent.checkRerender = (_prevProps, _nextProps) => false;

TabsComponent.defaultProps = {
};

export default React.memo<TabsComponentProps>((props) => <TabsComponent {...props} />, TabsComponent.checkRerender);
