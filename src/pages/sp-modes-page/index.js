import { useNavigate } from 'react-router-dom';
import useStartSinglePlayer from "./useStartSinglePlayer";
import { useState, useEffect } from "react";
import Option from "./Option";
import { t } from "../../common/translation";
import Error from "../../common/Error";
import PageContainer from "../../common/PageContainer";

const SinglePlayerOptions = () => {
    const navigate = useNavigate();
    const { errorStartSP, dataStartSP, getSinglePlayerStart } = useStartSinglePlayer();
    const [pairsAndTime, setPairsAndTime] = useState({pairs: null, time: null});

    useEffect(() => {
        if (errorStartSP === null && dataStartSP) {
            const { sessionId } = dataStartSP;
            navigate(`${pairsAndTime.pairs}/${pairsAndTime.time}/${sessionId}`);
        }
    }, [errorStartSP, dataStartSP, pairsAndTime, navigate]);

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
            <h1>{t('singlePlayerModesPage/title')}</h1>
            <div className="row">
                <div class="col">
                    <h2>{t('singlePlayerModesPage/beginner/title')}</h2>
                    <p>{t('singlePlayerModesPage/beginner/description')}</p>
                    <h2>{t('singlePlayerModesPage/novice/title')}</h2>
                    <p>{t('singlePlayerModesPage/novice/description')}</p>
                    <h2>{t('singlePlayerModesPage/intermediate/title')}</h2>
                    <p>{t('singlePlayerModesPage/intermediate/description')}</p>
                    <h2>{t('singlePlayerModesPage/advanced/title')}</h2>
                    <p>{t('singlePlayerModesPage/advanced/description')}</p>
                    <h2>{t('singlePlayerModesPage/expert/title')}</h2>
                    <p>{t('singlePlayerModesPage/expert/description')}</p>
                    <h2>{t('singlePlayerModesPage/master/title')}</h2>
                    <p>{t('singlePlayerModesPage/master/description')}</p>
                </div>
                <div class="col d-flex flex-column align-items-center">
                    <Option 
                        title={t('singlePlayerModesPage/beginner/title')} 
                        pairs={8} min={2} 
                        handleOptionSelect={handleOptionSelect}
                    />
                    <Option 
                        title={t('singlePlayerModesPage/novice/title')} 
                        pairs={16} min={5} 
                        handleOptionSelect={handleOptionSelect}
                    />
                    <Option 
                        title={t('singlePlayerModesPage/intermediate/title')} 
                        pairs={8} min={1} 
                        handleOptionSelect={handleOptionSelect}
                    />
                    <Option 
                        title={t('singlePlayerModesPage/advanced/title')} 
                        pairs={24} min={7} 
                        handleOptionSelect={handleOptionSelect}
                    />
                    <Option 
                        title={t('singlePlayerModesPage/expert/title')} 
                        pairs={16} min={2} 
                        handleOptionSelect={handleOptionSelect}
                    />
                    <Option 
                        title={t('singlePlayerModesPage/master/title')} 
                        pairs={24} min={5} 
                        handleOptionSelect={handleOptionSelect}
                    />
                    <Error>{errorStartSP}</Error>
                </div>
            </div>
        </PageContainer>
    );
}

export default SinglePlayerOptions;