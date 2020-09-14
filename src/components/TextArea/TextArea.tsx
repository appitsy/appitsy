import React, { useEffect, useState } from 'react';
import { TextAreaSchema, ThoraComponent } from '../../types/ComponentSchema';
import Label from '../Labels/Label';
import ErrorLabel from '../Labels/ErrorLabel';
import { Flex } from '../Flex/Flex';
import { ValidateRequired, ValidateMinMaxLength } from '../../utilities/Validations';
import { errorPositionToFlexDirection, labelPositionToFlexDirection } from '../../utilities/FlexPositions';

interface ThoraTextAreaProps extends TextAreaSchema {
    className: string;
    value: string;
    onValueChange(value: string): void;
}

interface TextAreaState {
    touched?: boolean;
}

const TextArea: ThoraComponent<ThoraTextAreaProps> = (props) => {
    const [state, setState] = useState<TextAreaState>({});
    let validationError = '';

    const onChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState((prevState: any) => ({
            ...prevState,
            touched: true,
        }));

        return props.onValueChange(evt.target.value);
    }

    useEffect(() => {
        props.onValueChange(props.value || props.data?.defaultValue || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (props.validations && state.touched) {
        validationError = 
            ValidateRequired(props.validations, props.value) ||
            ValidateMinMaxLength(props.validations, props.value) ||
            '';
    }

    return (
        <Flex className={props.className} flexDirection={labelPositionToFlexDirection(props.display?.labelPosition)}>
            <Label text={props.name} />
            <Flex flexDirection={errorPositionToFlexDirection(props.display?.errorPosition)}>
            <textarea name={props.name} value={ props.value } onChange={onChange} />   
                { validationError.length > 0 ? <ErrorLabel text={validationError} /> : null }
            </Flex>
        </Flex>
    );
}

TextArea.validateSchema = (_component: any) => {
    return true;
};

export default React.memo<ThoraTextAreaProps>(
    props => <TextArea {...props}/>, 
    (prevProps, nextProps) => prevProps.value === nextProps.value && prevProps.display === nextProps.display
);