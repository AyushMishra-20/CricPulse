// src/components/RecentMatches.js
import React, { useEffect, useState } from 'react';
import { Box, Stack, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import MatchCard from './MatchCard';

const API_KEY = '47e7b79ef2msh2fe5a7a5a313d87p12174ejsn141d3d6ce008';
const API_HOST = 'cricbuzz-cricket.p.rapidapi.com';

function RecentMatches({ search, onMatchClick }) {
  const [matches, setMatches] = useState([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent', {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    })
    .then(res => {
      const matches = [];
      (res.data.typeMatches || []).forEach(typeMatch => {
        (typeMatch.seriesMatches || []).forEach(series => {
          if (series.seriesAdWrapper && series.seriesAdWrapper.matches) {
            series.seriesAdWrapper.matches.forEach(match => {
              matches.push({
                matchInfo: {
                  matchId: match.matchInfo.matchId,
                  team1: {
                    teamCode: match.matchInfo.team1?.teamSName,
                    flagCode: match.matchInfo.team1?.imageId || ''
                  },
                  team2: {
                    teamCode: match.matchInfo.team2?.teamSName,
                    flagCode: match.matchInfo.team2?.imageId || ''
                  },
                  team1Score: match.matchScore?.team1Score?.inngs1?.runs
                    ? `${match.matchScore.team1Score.inngs1.runs}/${match.matchScore.team1Score.inngs1.wickets} (${match.matchScore.team1Score.inngs1.overs})`
                    : '',
                  team2Score: match.matchScore?.team2Score?.inngs1?.runs
                    ? `${match.matchScore.team2Score.inngs1.runs}/${match.matchScore.team2Score.inngs1.wickets} (${match.matchScore.team2Score.inngs1.overs})`
                    : '',
                  status: match.matchInfo.status,
                  result: match.matchInfo.status,
                  matchType: match.matchInfo.matchFormat,
                  venue: match.matchInfo.venueInfo?.ground,
                  overs: match.matchScore?.team1Score?.inngs1?.overs || match.matchScore?.team2Score?.inngs1?.overs || '',
                }
              });
            });
          }
        });
      });
      setMatches(matches);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to load matches.');
      setLoading(false);
    });
  }, []);

  let filteredMatches = matches;
  if (tab === 1) {
    filteredMatches = matches.filter(m => m.matchInfo.status.toLowerCase().includes('live'));
  } else if (tab === 2) {
    filteredMatches = matches; // 'ALL' tab, same as MATCHES for now
  }
  if (search && search.trim() !== "") {
    const s = search.trim().toLowerCase();
    filteredMatches = filteredMatches.filter(m =>
      m.matchInfo.team1.teamCode?.toLowerCase().includes(s) ||
      m.matchInfo.team2.teamCode?.toLowerCase().includes(s) ||
      (m.matchInfo.result && m.matchInfo.result.toLowerCase().includes(s))
    );
  }
  const handleMatchClick = (match) => {
    if (onMatchClick) onMatchClick(match.matchInfo.matchId);
  };
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider', pb: 0.5 }}>
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        sx={{ pl: 8, mb: 0.5 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="MATCHES" sx={{ fontWeight: 700 }} />
        <Tab label="LIVE" sx={{ fontWeight: 700 }} />
        <Tab label="ALL" sx={{ fontWeight: 700 }} />
      </Tabs>
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ width: '100%', overflowX: 'auto', py: 1, px: 0 }}>
        <Stack direction="row" spacing={3} sx={{ minWidth: 1280, maxWidth: 1280, mx: 'auto' }}>
          {!loading && !error && filteredMatches.slice(0, 20).map((match) => (
            <div key={match.matchInfo.matchId} style={{ cursor: 'pointer', flex: '0 0 300px', maxWidth: 300 }} onClick={() => handleMatchClick(match)}>
              <MatchCard match={match} />
            </div>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default RecentMatches;
