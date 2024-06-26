import useGetSinglePlayerAllGames from "./useGetSinglePlayerAllGames";
import { IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useGetSinglePlayerSummary from "./useGetSinglePlayerSummary";
import { t } from "../../common/translation";
import Error from "../../common/Error";
import PageContainer from "../../common/PageContainer";


/**
 * Component for displaying statistics of single player games.
 * Fetches data for summary and all games of single player.
 * Provides navigation for viewing multiple pages of game history.
 * @returns {JSX.Element} SPStats component
 */
const SPStats = () => {
    /** Custom hooks for fetching summary and all games of single player */
    const { errorSPAll, dataSPAll, getSinglePlayerAllGames } = useGetSinglePlayerAllGames();
    const { errorSPSummary, dataSPSummary, getSinglePlayerSummary } = useGetSinglePlayerSummary();

    /** Refs to track pagination */ 
    const [page, setPage] = useState(1);
    const size = useRef(10);

    /** Effect to fetch data when component mounts */ 
    useEffect(() => {
        if(dataSPSummary==null) {
            getSinglePlayerSummary();
        }
        if(dataSPAll==null) {
            getSinglePlayerAllGames(page, size.current);
        }
    }, [page, getSinglePlayerAllGames, getSinglePlayerSummary, dataSPAll, dataSPSummary]);

    /** Function to handle clicking right arrow for pagination */
    const handleOnRightArrowClick = () => {
        getSinglePlayerAllGames(page+1, size.current);
        setPage(prev => prev+1);
    }

    /** Function to handle clicking left arrow for pagination */
    const handleOnLeftArrowClick = () => {
        getSinglePlayerAllGames(page-1, size.current);
        setPage(prev => prev-1);
    }

    /** Function to format seconds to minutes and seconds */
    function toMinAndSecFromat(secondsToConvert) {
        const minutes = Math.floor(secondsToConvert / 60);
        const seconds = secondsToConvert % 60;
        return (`${minutes} ${t('singlePlayerStatsPage/min')} ${seconds} ${t('singlePlayerStatsPage/sec')}`)
    }
    
    return (
        <PageContainer>
            <h1 className="text-center">{t('singlePlayerStatsPage/title')}</h1>
            <div className="table-responsive">
                <table className="table table-bordered border-dark caption-top table-striped">
                    <caption className="table-title">{t('singlePlayerStatsPage/overviewTable/title')}</caption>
                    <thead>
                        <tr>
                            <th>{t('singlePlayerStatsPage/overviewTable/pairs')}</th>
                            <th>{t('singlePlayerStatsPage/overviewTable/time')}</th>
                            <th>{t('singlePlayerStatsPage/overviewTable/numOfGames')}</th>
                            <th>{t('singlePlayerStatsPage/overviewTable/wins')}</th>
                            <th>{t('singlePlayerStatsPage/overviewTable/losses')}</th>
                            <th>{t('singlePlayerStatsPage/overviewTable/winningRate')}</th>
                            <th>{t('singlePlayerStatsPage/overviewTable/avgRemTime')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSPSummary && dataSPSummary.map((item, index) => (
                            <tr key={index}>
                                <td>{item.pairs}</td>
                                <td>{item.time/60} {t('singlePlayerStatsPage/min')}</td>
                                <td>{item.numOfGames}</td>
                                <td>{item.wins}</td>
                                <td>{item.losses}</td>
                                <td>{item.winningRate} {t('singlePlayerStatsPage/overviewTable/%')}</td>
                                <td>{toMinAndSecFromat(item.avgRemainingTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Error>{errorSPSummary}</Error>
            <div className="table-responsive">
                <table className="table caption-top border-dark table-striped">
                    <caption>{t('singlePlayerStatsPage/gamesTable/title')}</caption>
                    <thead>
                        <tr>
                            <th>{t('singlePlayerStatsPage/gamesTable/when')}</th>
                            <th>{t('singlePlayerStatsPage/gamesTable/pairs')}</th>
                            <th>{t('singlePlayerStatsPage/gamesTable/time')}</th>
                            <th>{t('singlePlayerStatsPage/gamesTable/won')}</th>
                            <th>{t('singlePlayerStatsPage/gamesTable/remTime')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataSPAll && ((dataSPAll.data).map((item, index) => (
                            <tr key={index}>
                                <td>{item.updatedAt}</td>
                                <td>{item.pairs}</td>
                                <td>{item.timeMax/60} {t('singlePlayerStatsPage/min')}</td>
                                <td>{item.won ? (
                                        <i className="bi bi-check-square text-success">
                                            {t('singlePlayerStatsPage/gamesTable/yes')}
                                        </i> 
                                    ) : (
                                        <i className="bi bi-x-square text-danger">
                                            {t('singlePlayerStatsPage/gamesTable/no')}
                                        </i>
                                    )}</td>
                                <td>{item.won ? (
                                        toMinAndSecFromat(item.remainingTime)
                                    ) : ( 
                                        t('singlePlayerStatsPage/gamesTable/-'))}</td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center fs-8">
                <div className="d-flex flex-wrap align-items-center">
                    <IconButton 
                        onClick={handleOnLeftArrowClick} 
                        disabled={page===1}
                    >
                        <i className="bi bi-caret-left-fill"/>
                    </IconButton>
                    {dataSPAll && dataSPAll.currentPage}
                    <IconButton  
                        onClick={handleOnRightArrowClick} 
                        disabled={dataSPAll && dataSPAll.currentPage===dataSPAll.totalPages}
                    >
                        <i className="bi bi-caret-right-fill"/>
                    </IconButton>
                </div>
                {dataSPAll && <div>{t('singlePlayerStatsPage/numOfGames')} {dataSPAll.totalItems}</div>}
            </div>
            <Error>{errorSPAll}</Error>
        </PageContainer>
    );
}

export default SPStats;