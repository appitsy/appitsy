import React from 'react';
import Styled from '../../Styled';

type LabelProps = {
    error: string;
    className?: string;
}

const StyledErrorLabel = Styled.span`
    color: ${({ theme }) => theme.colors.errors.foreground};
`;

const ErrorLabel = (props: LabelProps) => (
    <StyledErrorLabel className={'thora-error ' + (props.className || '')}>
        { props.error }
    </StyledErrorLabel>
);

export default ErrorLabel;