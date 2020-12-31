import React from 'react';

import classNames from 'classnames';

import Styled from '../../Styled';

type LabelProps = {
  text: string;
  for: string;
  tooltip?: string;
  className?: string;
};

const StyledLabel = Styled.label`
    margin: auto 0px;
`;

const LabelTypeName = 'label';

const Label: React.FC<LabelProps> = (props) => (
  <StyledLabel htmlFor={props.for} className={classNames([`appitsy-${LabelTypeName}`, props.className])}>
    {props.text}
    { props.tooltip ? <span data-tip={props.tooltip}>?</span> : null }
  </StyledLabel>
);

export default Label;
