import { useNavigate } from 'react-router-dom';
import useStartSinglePlayer from "./useStartSinglePlayer";
import { useState, useEffect } from "react";
import Option from "./Option";
import { t } from "../../common/translation";
import Error from "../../common/Error";
import PageContainer from "../../common/PageContainer";

/**
 * Component for rendering options for single player mode.
 * Handles selection of game difficulty and initiates game start.
 * Navigates to the game page upon successful initiation of game session.
 * @returns {JSX.Element} SinglePlayerOptions component
 */
const SinglePlayerOptions = () => {
    const navigate = useNavigate();

    /* Custom hook for starting single player game session **/
    const { errorStartSP, dataStartSP, getSinglePlayerStart } = useStartSinglePlayer();

    /* State for storing selected number of pairs and time limit **/
    const [pairsAndTime, setPairsAndTime] = useState({pairs: null, time: null});

    /* Effect to navigate to game page upon successful initiation of game session **/
    useEffect(() => {
        if (errorStartSP === null && dataStartSP) {
            const { sessionId } = dataStartSP;
            navigate(`${pairsAndTime.pairs}/${pairsAndTime.time}/${sessionId}`);
        }
    }, [errorStartSP, dataStartSP, pairsAndTime, navigate]);

    /* Function to handle selection of game difficulty **/
    const handleOptionSelect = (newPairs, newTime) => {
        setPairsAndTime(prevState => ({
            ...prevState,
            pairs: newPairs,
            time: newTime
        }));
        getSinglePlayerStart(newPairs, newTime);
    };

    return (
        <PageContainer>
            <h1 className="text-center">{t('singlePlayerModesPage/title')}</h1>
                <div className="d-flex flex-wrap justify-content-evenly">
                    <Option 
                        title={t('singlePlayerModesPage/beginner/title')} 
                        pairs={8} min={2} 
                        handleOptionSelect={handleOptionSelect}
                        description={t('singlePlayerModesPage/beginner/description')}
                    />
                    <Option 
                        title={t('singlePlayerModesPage/novice/title')} 
                        pairs={16} min={5} 
                        handleOptionSelect={handleOptionSelect}
                        description={t('singlePlayerModesPage/novice/description')}
                    />
                    <Option 
                        title={t('singlePlayerModesPage/intermediate/title')} 
                        pairs={8} min={1} 
                        handleOptionSelect={handleOptionSelect}
                        description={t('singlePlayerModesPage/intermediate/description')}
                    />
                    <Option 
                        title={t('singlePlayerModesPage/advanced/title')} 
                        pairs={24} min={7} 
                        handleOptionSelect={handleOptionSelect}
                        description={t('singlePlayerModesPage/advanced/description')}
                    />
                    <Option 
                        title={t('singlePlayerModesPage/expert/title')} 
                        pairs={16} min={2} 
                        handleOptionSelect={handleOptionSelect}
                        description={t('singlePlayerModesPage/expert/description')}
                    />
                    <Option 
                        title={t('singlePlayerModesPage/master/title')} 
                        pairs={24} min={5} 
                        handleOptionSelect={handleOptionSelect}
                        description={t('singlePlayerModesPage/master/description')}
                    />
                    <Error>{errorStartSP}</Error>
                </div>
        </PageContainer>
    );
}

export default SinglePlayerOptions;