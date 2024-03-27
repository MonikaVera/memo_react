import styled from 'styled-components';
import { colors } from '../../colors';
import { Link } from 'react-router-dom';

export const StyledButton = styled.button`
    text-shadow: 1px 1px ${colors.forest_green};
    width: 10em;
`;

export const StyledLink = styled(Link)`
    width: 10em;
`;

export const StyledDiv = styled.div`
    width: fit-content;
`;

export const StyledOption = styled.button`
    width: 15em;
    box-shadow: 0 0 15px ${colors.forest_green};
    text-shadow: 1px 1px ${colors.forest_green};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0.5em;
`;

export const StyledFrom = styled.form`
    @media (max-width: 800px) {
        width: 100%; 
    }

    @media (min-width: 800px) {
        width: 50%; 
    }
`;


