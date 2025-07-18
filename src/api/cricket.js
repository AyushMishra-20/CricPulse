// src/api/cricket.js
export const fetchLiveScoreData = async () => {
    // Replace with actual API call if you're using RapidAPI or similar
    return Promise.resolve({
      matchId: '123',
      team1: 'India',
      team2: 'Australia',
      team1Score: '185/5 (20)',
      team2Score: '174/9 (19.3)',
      overs: 19.3,
      result: 'India won by 11 runs',
      status: 'Completed',
      topBatsman: 'Suryakumar Yadav - 61 (38)',
      topBowler: 'Jasprit Bumrah - 4/23',
      recentBalls: ['4', '1', 'W', '0', '2', '6'],
    });
  };
  