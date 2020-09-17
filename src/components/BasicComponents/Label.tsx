import React from 'react';

type LabelProps = {
    text: string;
    tooltip?: string;
    className?: string;
}

const Label: React.FC<LabelProps> = (props) => {
    return (
    <span className={props.className}>
        {props.text}
    </span>
    )
}

export default Label;