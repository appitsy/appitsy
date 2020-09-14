import React, { useEffect, useState } from 'react';
import { NumberSchema, ThoraComponent } from '../../types/ComponentSchema';
import Label from '../Labels/Label';
import ErrorLabel from '../Labels/ErrorLabel';
import { Flex } from '../Flex/Flex';
import { ValidateRequired, ValidateMinMaxLength, ValidateMinMaxNumber } from '../../utilities/Validations';
import { errorPositionToFlexDirection, labelPositionToFlexDirection } from '../../utilities/FlexPositions';

interface ThoraNumberProps extends NumberSchema {
    className: string;
    value: number;
    onValueChange(value: number): void;
}

interface NumberState {
    touched?: boolean;
}

const Number: ThoraComponent<ThoraNumberProps> = (props) => {
    const [state, setState] = useState<NumberState>({});
    let validationError = '';

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState: any) => ({
            ...prevState,
            touched: true,
        }));

        return props.onValueChange(+evt.target.value);
    }

    useEffect(() => {
        props.onValueChange(+props.value || props.data?.defaultValue || 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (props.validations && state.touched) {
        validationError = 
            ValidateRequired(props.validations, props.value.toString()) ||
            ValidateMinMaxLength(props.validations, props.value.toString()) ||
            ValidateMinMaxNumber(props.validations, props.value) ||
            '';
    }

    return (
        <Flex className={props.className} flexDirection={labelPositionToFlexDirection(props.display?.labelPosition)}>
            <Label text={props.name} />
            <Flex flexDirection={ errorPositionToFlexDirection (props.display?.errorPosition)} margin={false}>
                <input type='number' name={props.name} value={ props.value || 0 } onChange={onChange} />
                <ErrorLabel text={validationError} />
            </Flex>
        </Flex>
    );
}

Number.validateSchema = (_component: any) => {
    return true;
};

export default React.memo<ThoraNumberProps>(props => <Number {...props}/>, (prevProps, nextProps) => prevProps.value === nextProps.value);