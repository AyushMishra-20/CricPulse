import React from 'react';


const ScoreSummary = ({ match }) => {
  if (!match) return null;

  const {
    team1,
    team2,
    team1Score,
    team2Score,
    result,
    status,
    overs,
  } = match;

  return (
    <div className="score-summary">
      <h2>{team1} vs {team2}</h2>

      <div className="score-line">
        <span><strong>{team1}:</strong> {team1Score}</span>
        <span><strong>{team2}:</strong> {team2Score}</span>
      </div>

      <div className="match-meta">
        {typeof overs !== 'undefined' && (
          <div><strong>Overs:</strong> {overs}</div>
        )}
        <div className="match-status">
          {result || status || "Status Unavailable"}
        </div>
      </div>
    </div>
  );
};

export default ScoreSummary;
