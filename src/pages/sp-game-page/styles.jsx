import styled from "styled-components";
import { colors } from "../../colors";

export const CardContainer2 = styled.div`
    padding: 1em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(6em, 1fr));
    background-color: ${colors.gunmetal};
    width: 55em;
    border: 1em solid ${colors.pigment_green};
    margin: 1em;
    position: relative;
`;

export const CardContainer = styled.div`
    display: grid;
    width: fit-content;
    padding: 1em;
    position: relative;
    margin: 1em;
    border: 1em solid ${colors.gunmetal};
    border-radius: 10px;
    background-color: ${colors.silver};
    overflow-y: auto;
    margin-top: 4.5em;

    @media (max-width: 375px) {
        grid-template-columns: repeat(2, 1fr);
    } 

    @media (min-width: 375px) {
        grid-template-columns: ${({ $pairs }) => {
            if ($pairs === 24) {
                return 'repeat(3, 1fr)';
            } else {
                return 'repeat(2, 1fr)';
            }
        }};
    }

    @media (min-width: 500px) {
        grid-template-columns: repeat(4, 1fr); 
    }

    @media (min-width: 675px) {
        grid-template-columns: ${({ $pairs }) => {
            if ($pairs === 24) {
                return 'repeat(6, 1fr)';
            } else {
                return 'repeat(4, 1fr)';
            }
        }};
    }

    @media (min-width: 875px) {
        grid-template-columns: repeat(8, 1fr); // 4 columns on large devices
    }

    @media (min-width: 1250px) {
        grid-template-columns: ${({ $pairs }) => {
            if($pairs === 24) {
            return 'repeat(12, 1fr)';
            } else {
                return 'repeat(8, 1fr)';
            }
        }};
    }
`;

const getBackgroundImage = ({num, pairs}) => {
    if (!num || !pairs) {
        return null;
    }
    if(pairs===8 || pairs===24) {
        switch (num) {
            case 1:
                return 'url(/img/apple.jpg)';
            case 2:
                return 'url(/img/avocado.jpg)';
            case 3:
                return 'url(/img/gooseberry.jpg)';
            case 4:
                return 'url(/img/grapes.jpg)';
            case 5:
                return 'url(/img/kiwi.jpg)';
            case 6:
                return 'url(/img/lime.jpg)';
            case 7:
                return 'url(/img/pear.jpg)';
            case 8:
                return 'url(/img/watermelon.jpg)';
            default:;
        }
    }

    let x;
    if(pairs===16) {
        x = 1;
    }
    if(pairs===24) {
        x = 9;
    }

    if(pairs===16 || pairs===24) {
        switch(num) {
            case x:
                return 'url(/img/artichoke.jpg)';
            case x+1:
                return 'url(/img/asparagus.jpg)';
            case x+2:
                return 'url(/img/broccoli.jpg)';
            case x+3:
                return 'url(/img/brussel_sprouts.jpg)';
            case x+4:
                return 'url(/img/cabbage.jpg)';
            case x+5:
                return 'url(/img/courgette.jpg)';
            case x+6:
                return 'url(/img/green_onion.jpg)';
            case x+7:
                return 'url(/img/kohlrabi.jpg)';
            case x+8:
                return 'url(/img/lettuce.jpg)';
            case x+9:
                return 'url(/img/paprika.jpg)';
            case x+10:
                return 'url(/img/peas.jpg)';
            case x+11:
                return 'url(/img/pepper.jpg)';
            case x+12:
                return 'url(/img/sorrel.jpg)';
            case x+13:
                return 'url(/img/cucumber.jpg)';
            case x+14:
                return 'url(/img/spinach.jpg)';
            case x+15:
                return 'url(/img/string_beans.jpg)';
            default:;
        }     
    }

    return null;
};

export const StyledCard = styled.div`
    background-image: ${({ $num, $pairs }) => getBackgroundImage({num: $num, pairs: $pairs})};
    background-size: cover;
    background-position: center;
    background-color: ${colors.pigment_green};
    margin: 0.5em;
    border-radius: 5px;
    height: 5em;
    width: 5em;
    text-align: center;
    border: ${({ $isFound, $isActive }) => $isActive ? '3px solid ' + colors.forest_green : ($isFound ? '3px solid ' + colors.rich_black : '3px solid ' + colors.gunmetal)};
    font-size: 1em;
    cursor: ${({ $isActive, $isFound}) => (!$isActive && !$isFound) ? 'pointer' : 'default'};
`;

export const TimerContainer = styled.div`
    color: ${colors.rich_black};
    width: 5em;
    margin-top: 0.85em;
    padding: 0, 0.25em;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, -50%);
`;