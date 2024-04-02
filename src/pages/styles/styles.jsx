import styled from 'styled-components';
import { colors } from '../../colors';
import { Link } from 'react-router-dom';

export const StyledButton = styled.button`
    width: 10em;
`;

export const StyledLink = styled(Link)`
    width: 10em;
`;

export const StyledDiv = styled.div`
    width: fit-content;
`;

export const StyledOption = styled.button`
    box-shadow: 0 0 15px ${colors.forest_green};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const ContentContainer = styled.div`
    @media (max-width: 800px) {
        width: 100%; 
    }

    @media (min-width: 800px) {
        width: 65%; 
    }

    background-color: ${colors.silver};
    overflow-y: auto;
    padding-top: 4.5em;
`;

export const BackgroundContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: url(/img/green_1.jpg);
    background-size: cover;
    background-position: center;
`;


