import React from "react";

interface DescriptionProps {
    text?: string;
}

const Description = (props: DescriptionProps) => (props.text ? <span className='thora-description'>{ props.text }</span> : null)

export default Description;