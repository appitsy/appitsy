import React from 'react';

import classNames from 'classnames';

import Icon from './Icon';

interface IconProps {
  icon: string;
  className?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconProps> = (props) => (
  <div className={classNames('appitsy-icon-button', props.className)} onClick={props.onClick}>
    <Icon icon={props.icon} />
  </div>
);

export default IconButton;
