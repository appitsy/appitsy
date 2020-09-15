import React from 'react';
import Styled from '../../Styled';

type LabelProps = {
    error: string;
    className?: string;
}

const StyledErrorLabel = Styled.span`
    color: ${({ theme }) => theme.colors.errors.foreground};
    font-size: ${({ theme }) => theme.colors.errors.fontSize};
    margin: 0px;
`;

const ErrorLabel = (props: LabelProps) => (
    <StyledErrorLabel className={props.className}>
        { props.error }
    </StyledErrorLabel>
);

export default ErrorLabel;