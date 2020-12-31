import React, { Fragment } from 'react';

import classNames from 'classnames';

import styled from '../../Styled';
import { AppComponent } from '../../types/AppComponent';
import { ButtonProps } from '../../types/InputComponentSchema';
import Icon from './Icon';

const StyledButton = styled.button`
    width: fit-content !important;
`;

interface ButtonComponentProps extends ButtonProps {
  className?: string;
  path?: string;
  onClick(): any;
}

const Button: AppComponent<ButtonComponentProps> = (props) => {
  const onClick = () => {
    props.onClick();
  };

  const buttonTypeClass = () => (props.style === undefined ? '' : `appitsy-button-${props.style}`);

  const leftIcon = props.display?.leftIcon ? <Fragment><Icon icon={props.display.leftIcon} />&nbsp;</Fragment> : null;
  const rightIcon = props.display?.rightIcon ? <Fragment>&nbsp;<Icon icon={props.display.rightIcon} /></Fragment> : null;

  return (
    <StyledButton name={props.name} onClick={onClick} className={classNames(['appitsy-button', buttonTypeClass(), props.className])}>
      { leftIcon }
      { props.text }
      { rightIcon }
    </StyledButton>
  );
};

Button.validateSchema = (_component: any) => true;

Button.checkRerender = (prevProps, nextProps) => (
  prevProps.text === nextProps.text
  && prevProps.display === nextProps.display
  && prevProps.onClick === nextProps.onClick
);

// Update Button when onClick also changes.
// Needed because we get stale closure if we don't
export default React.memo<ButtonComponentProps>(props => <Button {...props} />, Button.checkRerender);
