import React from 'react';
import { ButtonSchema, ThoraComponent } from '../../types/ComponentSchema';
import styled from '../../Styled';

const StyledButton = styled.button`
    width: 100px;
`;

interface ThoraButtonProps extends ButtonSchema {
    className: string;
    onClick(): any;
}

const Button: ThoraComponent<ThoraButtonProps> = (props) => {
    const onClick = () => {
        props.onClick();
    }

    return (
        <StyledButton className={props.className} name={props.name} onClick={onClick}>
            { props.text }
        </StyledButton>
    );
}

Button.validateSchema = (_component: any) => {
    return true;
};

// Update Button when onClick also changes.
// Needed because we get stale closure if we don't
export default React.memo<ThoraButtonProps>(
    props => <Button {...props} />, 
    (prevProps, nextProps) => prevProps.text === nextProps.text && prevProps.onClick === nextProps.onClick);
