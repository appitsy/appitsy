import classNames from 'classnames';
import React from 'react';

interface IconProps {
  icon: string;
  className?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  return <i className={classNames(props.className, 'fas', 'fa-' + props.icon)}></i>
};

export default Icon;
