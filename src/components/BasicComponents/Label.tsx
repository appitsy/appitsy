import React from 'react';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import Styled from '../../Styled';

type LabelProps = {
    text: string;
    for: string;
    tooltip?: string;
    className?: string;
}

const StyledLabel = Styled.label`
    margin: auto 0px;
`;

const Label: React.FC<LabelProps> = (props) => {
    return (
    <StyledLabel htmlFor={props.for} className={classNames(['thora-label', props.className])}>
        {props.text}
        { props.tooltip ? <span data-tip={props.tooltip} >?</span> : null }
        <ReactTooltip />
    </StyledLabel>
    )
}

export default Label;