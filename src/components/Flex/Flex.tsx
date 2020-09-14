import Styled from '../../Styled';

interface FlexRowProps {
    flexDirection: 'row' | 'column';
    margin?: boolean;
}

export const Flex = Styled.div<FlexRowProps> `
    display: flex;
    flex-direction: ${({ flexDirection }) => flexDirection};
    &>:nth-child(n+2) {
        ${({ theme, flexDirection, margin }) => { 
            if (margin) {
                return (flexDirection === 'column' ? 'margin-top' : 'margin-left') + ':' + theme.layout.componentInternalMargin
            }
        }};
    }
`;
