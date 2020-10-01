import React from 'react';
import classNames from 'classnames';

type LabelProps = {
    error: string;
    className?: string;
}

const ErrorLabel = (props: LabelProps) => (
    props.error ?
    <span className={classNames(['thora-error', props.className])}>
        { props.error }
    </span>: null);

export default ErrorLabel;