import React from 'react';
import { ButtonSchema, ThoraComponent } from '../../types/ComponentSchema';
import styled from '../../Styled';
import classNames from 'classnames';

const StyledButton = styled.button`
    width: fit-content !important;
`;

interface ThoraButtonProps extends ButtonSchema {
    className: string;
    onClick(): any;
}

const Button: ThoraComponent<ThoraButtonProps> = (props) => {
    const onClick = () => {
        props.onClick();
    }

    const buttonTypeClass = () => {
        switch(props.style) {
            case 'primary': return 'thora-button-primary';
            case 'secondary': return 'thora-button-secondary';
            case 'success': return 'thora-button-success';
            case 'danger': return 'thora-button-danger';
            case 'warning': return 'thora-button-warning';
            case 'info': return 'thora-button-info';
            default: 
                if (props.style !== undefined) {
                    console.error(`Bad style name for button - '${props.style!}'`)
                }
                return 'thora-button-primary';
        }
    }

    return (
        <StyledButton name={props.name} onClick={onClick} className={classNames(['thora-button', buttonTypeClass(), props.className])}>
            { props.text }
        </StyledButton>
    );
}

Button.validateSchema = (_component: any) => {
    return true;
};

Button.checkRerender = (prevProps, nextProps) => {
    return prevProps.text === nextProps.text && prevProps.display === nextProps.display;
}

// Update Button when onClick also changes.
// Needed because we get stale closure if we don't
export default React.memo<ThoraButtonProps>(props => <Button {...props} />, Button.checkRerender);
