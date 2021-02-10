import React from 'react';

import classNames from 'classnames';

type LabelProps = {
  error: string;
  className?: string;
};

const ErrorLabel = (props: LabelProps) => (
  props.error
    ? (
      <span className={classNames(['appitsy-error', props.className])} data-testid='errorLabel'>
        { props.error }
      </span>
    ) : null);

export default ErrorLabel;
