import React from 'react';

import classNames from 'classnames';

import Styled from '../../Styled';

type LabelProps = {
  text: string;
  for: string;
  tooltip?: string;
  className?: string;
  requiredAsterisk?: boolean;
};

const StyledLabel = Styled.label`
  margin: auto 0px;
`;

const Asterisk = Styled.span`
  color: red;
`;

const LabelTypeName = 'label';

const Label: React.FC<LabelProps> = (props) => (
  <StyledLabel htmlFor={props.for} className={classNames([`appitsy-${LabelTypeName}`, props.className])}>
    { props.text }
    { props.requiredAsterisk === true ? <Asterisk>&nbsp;*</Asterisk> : null }
    { props.tooltip ? <span data-toggle='tooltip' title={props.tooltip}>?</span> : null }
  </StyledLabel>
);

export default Label;
