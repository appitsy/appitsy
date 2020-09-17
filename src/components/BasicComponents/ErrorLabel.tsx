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
    props.error ?
    <StyledErrorLabel className={'thora-error ' + (props.className || '')}>
        { props.error }
    </StyledErrorLabel>: null);

export default ErrorLabel;