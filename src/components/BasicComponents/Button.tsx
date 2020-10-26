import React, { Fragment } from 'react';
import classNames from 'classnames';
import styled from '../../Styled';
import Icon from './Icon';
import { AppComponent } from '../../types/AppComponent';
import { ButtonProps } from '../../types/InputComponentSchema';

const StyledButton = styled.button`
    width: fit-content !important;
`;

interface ButtonComponentProps extends ButtonProps {
  className?: string;
  onClick(): any;
}

const Button: AppComponent<ButtonComponentProps> = (props) => {
  const onClick = () => {
    props.onClick();
  };

  const buttonTypeClass = () => {
    switch (props.style) {
      case 'primary': return 'appitsy-button-primary';
      case 'secondary': return 'appitsy-button-secondary';
      case 'success': return 'appitsy-button-success';
      case 'danger': return 'appitsy-button-danger';
      case 'warning': return 'appitsy-button-warning';
      case 'info': return 'appitsy-button-info';
      default:
        if (props.style !== undefined) {
          console.error(`Bad style name for button - '${props.style!}'`);
        }
        return 'appitsy-button-primary';
    }
  };

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

Button.validateSchema = (_component: any) => {
  return true;
};

Button.checkRerender = (prevProps, nextProps) => {
  return prevProps.text === nextProps.text && prevProps.display === nextProps.display;
};

// Update Button when onClick also changes.
// Needed because we get stale closure if we don't
export default React.memo<ButtonComponentProps>(props => <Button {...props} />, Button.checkRerender);
