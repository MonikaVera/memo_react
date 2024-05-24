import PageContainer from '../../common/PageContainer';
import useLeaderboard from './useLeaderboard';
import { useEffect, useState } from 'react';
import { t } from "../../common/translation";
import Error from '../../common/Error';
import { useParams } from 'react-router-dom';

/**
 * Component for displaying multiplayer statistics.
 * Fetches leaderboard data for a specified number of pairs.
 * @returns {JSX.Element} MultiPlayerStats component.
 */
const MultiPlayerStats = () => {
    const { pairs } = useParams();
    const {data, error, getLeaderboard} = useLeaderboard();
    const [prevPairs, setPrevPairs] = useState();

    useEffect(( ) => {
        if(data===null || prevPairs!==pairs) {
          getLeaderboard(parseInt(pairs));  
          setPrevPairs(pairs);
        }
    }, [pairs, getLeaderboard, data, prevPairs]);

    return (
        <PageContainer>
            <h1 className="text-center">{t('multiPlayerStatsPage/title')}</h1>
            <div className="table-responsive">
                <table className="table table-bordered border-dark caption-top table-striped">
                    <caption>
                        {pairs === '8' && `${t('multiPlayerStatsPage/links/easy')} (${pairs} ${t('multiPlayerStatsPage/pairs')})`}
                        {pairs === '16' && `${t('multiPlayerStatsPage/links/medium')} (${pairs} ${t('multiPlayerStatsPage/pairs')})`}
                        {pairs === '24' && `${t('multiPlayerStatsPage/links/hard')} (${pairs} ${t('multiPlayerStatsPage/pairs')})`}
                    </caption>
                    <thead>
                        <tr>
                            <th>{t('multiPlayerStatsPage/rank')}</th>
                            <th>{t('multiPlayerStatsPage/name')}</th>
                            <th>{t('multiPlayerStatsPage/wins')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.rank}</td>
                                <td>{item.userName}</td>
                                <td>{item.wins}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Error>{error}</Error>
        </PageContainer>
    );
}

export default MultiPlayerStats;