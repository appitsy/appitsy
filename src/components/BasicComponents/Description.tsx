import Styled from "../../Styled";
import React from "react";

const StyledDescription = Styled.span`
    color: grey
`;

interface DescriptionProps {
    text?: string;
}

const Description = (props: DescriptionProps) => (props.text ? <StyledDescription>{ props.text }</StyledDescription> : null)

export default Description;