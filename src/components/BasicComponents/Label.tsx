import React from 'react';
import ReactTooltip from 'react-tooltip';

type LabelProps = {
    text: string;
    tooltip?: string;
    className?: string;
}

const Label: React.FC<LabelProps> = (props) => {
    return (
    <span className={props.className}>
        {props.text}
        { props.tooltip ? <span data-tip={props.tooltip} >?</span> : null }
        <ReactTooltip />
    </span>
    )
}

export default Label;