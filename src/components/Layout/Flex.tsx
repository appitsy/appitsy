import Styled from '../../Styled';

interface FlexRowProps {
    flexDirection: 'row' | 'column';
}

export const Flex = Styled.div<FlexRowProps>`
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection};
`;
