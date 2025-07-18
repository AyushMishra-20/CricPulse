// src/components/RecentMatches.js
import React, { useEffect, useState } from 'react';
import { fetchRecentMatches } from '../api/RecentMatches';
import MatchCard from './MatchCard';

function RecentMatches() {
  const [matches, setMatches] = useState([]); 

  useEffect(() => {
    // For live API, use this:
    // fetchRecentMatches().then(setMatches).catch(console.error);

    // For mock/testing:
    setMatches([
      {
        matchInfo: {
          matchId: '1',
          team1: { teamCode: 'IND', flagCode: 'in' },
          team2: { teamCode: 'AUS', flagCode: 'au' },
          team1Score: '212/4 (20)',
          team2Score: '204/6 (20)',
          status: 'Completed',
          result: 'India won by 8 runs',
        },
      },
      {
        matchInfo: {
          matchId: '2',
          team1: { teamCode: 'ENG', flagCode: 'gb' },
          team2: { teamCode: 'PAK', flagCode: 'pk' },
          team1Score: '178/7 (20)',
          team2Score: '180/4 (19.3)',
          status: 'Completed',
          result: 'Pakistan won by 6 wkts',
        },
      },
    ]);
  }, []);

  return (
    <div className="match-carousel">
      {matches.map((match) => (
        <MatchCard key={match.matchInfo.matchId} match={match} />
      ))}
    </div>
  );
}

export default RecentMatches;
