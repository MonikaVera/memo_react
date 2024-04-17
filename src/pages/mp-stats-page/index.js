import PageContainer from '../../common/PageContainer';
import useLeaderboard from './useLeaderboard';
import { useCallback, useEffect } from 'react';
import { t } from "../../common/translation";
import Error from '../../common/Error';

const MultiPlayerStats = () => {
    const {data, error, getLeaderboard} = useLeaderboard();

    const fetchLeaderboard = useCallback(() => {
        getLeaderboard();
    }, [getLeaderboard]);

    useEffect(() => {
        fetchLeaderboard();
    }, [fetchLeaderboard]);

    return (
        <PageContainer>
            <h1>{t('singlePlayerStatsPage/title')}</h1>
            <div className="table-responsive">
                <table className="table table-bordered border-dark table-striped">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Wins</th>
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