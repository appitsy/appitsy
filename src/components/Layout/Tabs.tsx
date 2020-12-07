import React from 'react';
import classNames from 'classnames';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';

import { AppComponent } from '../../types/AppComponent';
import { TabsProps } from '../../types/LayoutComponentSchema';
import { ComponentSchema } from '../../types/ComponentSchema';

interface TabsComponentProps extends TabsProps {
  className?: string;
  renderChildComponent: (component: ComponentSchema, key: string) => JSX.Element;
}

const TabsComponent: AppComponent<TabsComponentProps> = (props) => (
  <Tabs className={classNames(['appitsy-tabs', props.className])}>
    <TabList>
      { props.components?.map((tab) => <Tab>{tab.display?.label}</Tab>) }
    </TabList>

    { props.components?.map((tab) => <TabPanel>{tab.components?.map((c) => props.renderChildComponent(c, `${props.name}-${c.name}`))}</TabPanel>) }

  </Tabs>
);

TabsComponent.validateSchema = (_component: any) => true;

TabsComponent.checkRerender = (_prevProps, _nextProps) => false;

TabsComponent.defaultProps = {
};

export default React.memo<TabsComponentProps>((props) => <TabsComponent {...props} />, TabsComponent.checkRerender);
