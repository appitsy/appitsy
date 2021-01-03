import React, { useState } from 'react';

import classNames from 'classnames';

import styled from '@emotion/styled';

import { AppComponent } from '../../types/AppComponent';
import { ComponentSchema } from '../../types/ComponentSchema';
import { TabsProps } from '../../types/LayoutComponentSchema';
import { appendComponentPath } from '../../utilities/ComponentPath';

const Header = styled.div`
  padding: 0.7rem 0.75rem 0rem 0.75rem;
`;

const HeaderTitle = styled.div`
  margin-bottom: 0px;
`;

const NavTabsList = styled.div`
  border: none;
`;

const TabBody = styled.div`
  padding: 0.75rem 0.5rem;
`;

interface TabsComponentProps extends TabsProps {
  className?: string;
  path?: string;
  renderChildComponents: (component?: ComponentSchema[], parentPath?: string, parentComponent?: ComponentSchema) => JSX.Element[];
}

const TabsComponent: AppComponent<TabsComponentProps> = (props) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(props.activeTabOnLoad);
  return (
    <div className={classNames(['appitsy-tabs card', props.className])}>
      <Header className='card-header'>
        <HeaderTitle className='card-title'>
          <NavTabsList className='nav nav-tabs'>
            {props.components?.map((tab, idx) => (
              <li className={activeTabIndex === idx ? 'active' : undefined} onClick={() => setActiveTabIndex(idx)}>
                <a className={classNames('nav-item nav-link', activeTabIndex === idx ? 'active show' : undefined)} id={tab.name} data-toggle='tab' href={`#${tab.name}`}>
                  {tab.display?.label}
                </a>
              </li>
            ))}
          </NavTabsList>
        </HeaderTitle>
      </Header>

      <TabBody className='card-body'>
        <div className='tab-content'>
          {props.components?.map((tab, idx) => {
            let tabPath: string;
            if (props.path) {
              tabPath = appendComponentPath(props.path, tab.name);
            } else {
              tabPath = tab.name;
            }

            return (
              <div className={classNames('tab-pane', activeTabIndex === idx ? 'active' : undefined)} id={tab.name}>
                {props.renderChildComponents(tab.components, tabPath, { ...tab } as ComponentSchema)}
              </div>
            );
          })}
        </div>
      </TabBody>
    </div>
  );
};

TabsComponent.validateSchema = (_component: any) => true;

TabsComponent.checkRerender = (_prevProps, _nextProps) => false;

TabsComponent.defaultProps = {
  activeTabOnLoad: 0,
};

export default React.memo<TabsComponentProps>((props) => <TabsComponent {...props} />, TabsComponent.checkRerender);
