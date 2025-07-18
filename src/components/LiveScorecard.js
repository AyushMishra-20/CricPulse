import React, { useEffect, useState } from 'react';
import { fetchLiveScoreData } from '../api/cricket';
import ScoreSummary from './ScoreSummary';

const LiveScorecard = () => {
  const [matchInfo, setMatchInfo] = useState(null);

  useEffect(() => {
    fetchLiveScoreData().then(setMatchInfo);
  }, []);

  if (!matchInfo) return <p>Loading live score...</p>;

  return (
    <div className="live-scorecard">
      <ScoreSummary match={matchInfo} />
      {/* Add more components: PlayerStats, BallByBall, etc. */}
    </div>
  );
};

export default LiveScorecard;
