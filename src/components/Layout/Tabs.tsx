import React from 'react';
import classNames from 'classnames';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';

import { AppComponent } from '../../types/AppComponent';
import { TabsProps } from '../../types/LayoutComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';
import { appendComponentPath } from '../../utilities/ComponentPath';

interface TabsComponentProps extends TabsProps {
  className?: string;
  path?: string;
  renderChildComponents: (component?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
}

const TabsComponent: AppComponent<TabsComponentProps> = (props) => (
  <Tabs className={classNames(['appitsy-tabs', props.className])}>
    <TabList>
      { props.components?.map((tab) => <Tab>{tab.display?.label}</Tab>) }
    </TabList>

    {
      props.components?.map((tab) => {
        let tabPath: string;
        if (props.path) {
          tabPath = appendComponentPath(props.path, tab.name);
        } else {
          tabPath = tab.name;
        }

        return (
          <TabPanel>
            { props.renderChildComponents(tab.components, tabPath, { ...tab } as ComponentSchema) }
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
