// src/components/RecentMatches.js
import React, { useEffect, useState } from 'react';
import { Box, Stack, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import MatchCard from './MatchCard';

const API_KEY = '47e7b79ef2msh2fe5a7a5a313d87p12174ejsn141d3d6ce008';

function RecentMatches({ search, onMatchClick }) {
  const [matches, setMatches] = useState([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    


    // Use API data only - no fallback matches
    console.log('Fetching matches from API...');
    
    // Try multiple API endpoints to get live cricket data
    const apiEndpoints = [
      {
        url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
        host: 'cricbuzz-cricket.p.rapidapi.com'
      },
      {
        url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live',
        host: 'cricbuzz-cricket.p.rapidapi.com'
      },
      {
        url: 'https://cricket-live-data.p.rapidapi.com/matches',
        host: 'cricket-live-data.p.rapidapi.com'
      }
    ];

    const tryApiEndpoint = async (endpoint) => {
      try {
        const response = await axios.get(endpoint.url, {
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': endpoint.host
          },
          timeout: 10000
        });
        return response.data;
      } catch (error) {
        console.log(`API endpoint ${endpoint.url} failed:`, error.message);
        return null;
      }
    };

    // Try each endpoint until one works
    const fetchData = async () => {
      for (const endpoint of apiEndpoints) {
        const data = await tryApiEndpoint(endpoint);
        if (data) {
          console.log('Successfully fetched data from:', endpoint.url);
          console.log('API response:', data);
          
          // Parse the data based on the endpoint
          let matches = [];
          
          if (endpoint.url.includes('cricbuzz')) {
            // Cricbuzz API format
            (data.typeMatches || []).forEach(typeMatch => {
              (typeMatch.seriesMatches || []).forEach(series => {
                if (series.seriesAdWrapper && series.seriesAdWrapper.matches) {
                  series.seriesAdWrapper.matches.forEach(match => {
                    matches.push({
                      matchInfo: {
                        matchId: match.matchInfo.matchId,
                        team1: {
                          teamCode: match.matchInfo.team1?.teamSName || match.matchInfo.team1?.name,
                          flagCode: match.matchInfo.team1?.imageId || ''
                        },
                        team2: {
                          teamCode: match.matchInfo.team2?.teamSName || match.matchInfo.team2?.name,
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
          } else {
            // Generic API format
            matches = (data.matches || data.data || []).map(match => ({
              matchInfo: {
                matchId: match.id || match.matchId,
                team1: {
                  teamCode: match.team1?.shortName || match.team1?.name,
                  flagCode: ''
                },
                team2: {
                  teamCode: match.team2?.shortName || match.team2?.name,
                  flagCode: ''
                },
                team1Score: match.team1Score || '',
                team2Score: match.team2Score || '',
                status: match.status || 'Live',
                result: match.result || match.status,
                matchType: match.format || 'T20I',
                venue: match.venue || '',
                overs: match.overs || '',
              }
            }));
          }
          
          if (matches.length > 0) {
            setMatches(matches);
            setLoading(false);
            return;
          }
        }
      }
      
      // If no API worked, show error
      console.log('All API endpoints failed');
      setError('Unable to fetch live matches. Please try again later.');
      setMatches([]);
      setLoading(false);
    };

    fetchData();
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
