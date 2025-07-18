// src/components/MatchCard.js
import React from 'react';

const MatchCard = ({ match }) => {
  const info = match.matchInfo;

  return (
    <div className="match-card">
      <div className="match-teams">
        <img src={`https://flagcdn.com/24x18/${info.team1.flagCode}.png`} alt={info.team1.teamCode} />
        <span><b>{info.team1.teamCode}</b></span>
        <span className="score">{info.team1Score}</span>
        <span className="vs">vs</span>
        <img src={`https://flagcdn.com/24x18/${info.team2.flagCode}.png`} alt={info.team2.teamCode} />
        <span><b>{info.team2.teamCode}</b></span>
        <span className="score">{info.team2Score}</span>
      </div>
      <div className={`match-status ${
        info.status === 'Live'
          ? 'status-live'
          : info.status === 'Completed'
          ? 'status-completed'
          : 'status-upcoming'
      }`}>
        {info.result || 'Match details not available'}
      </div>
      <div className="match-links">
        <a href="#">Fantasy</a>
        <a href="#">Table</a>
        <a href="#">Schedule</a>
      </div>
    </div>
  );
};

export default MatchCard;
