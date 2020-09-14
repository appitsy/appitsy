import Label from './Label';
import Styled from '../../Styled';

export default Styled(Label)`
    color: ${({ theme }) => theme.colors.errors.foreground};
    font-size: ${({ theme }) => theme.colors.errors.fontSize};
    margin: 0px;
`;
