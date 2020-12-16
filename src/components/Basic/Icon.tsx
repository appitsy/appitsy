import classNames from 'classnames';
import React from 'react';

interface IconProps {
  icon: string;
  className?: string;
}

const Icon: React.FC<IconProps> = (props) => (
  <i className={classNames('appitsy-icon', props.className, 'fas', `fa-${props.icon}`)} />
);

export default Icon;
