// src/components/MatchCard.js
import React from 'react';
import { Paper, Box, Typography, Chip, Stack } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const statusColor = (status) => {
  if (status === 'Live') return 'error';
  if (status === 'Completed') return 'default';
  return 'warning';
};

const statusIcon = (status) => {
  if (status === 'Live') return <FiberManualRecordIcon sx={{ fontSize: 12, mr: 0.5 }} />;
  return null;
};

const MatchCard = ({ match }) => {
  const info = match.matchInfo;
  const isLive = info.status === 'Live';
  const matchType = info.matchType || 'T20'; // fallback if not present

  return (
    <Paper
      elevation={isLive ? 6 : 2}
      sx={{
        minWidth: 230,
        maxWidth: 260,
        px: 2,
        py: 1.5,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: isLive ? 6 : 2,
        borderLeft: isLive ? '5px solid #d32f2f' : '5px solid transparent',
        transition: 'transform 0.15s, box-shadow 0.15s',
        '&:hover': {
          transform: 'scale(1.04)',
          boxShadow: 8,
        },
        position: 'relative',
        bgcolor: isLive ? '#fff8f8' : 'background.paper',
      }}
    >
      {/* Match type label */}
      <Chip
        label={matchType}
        size="small"
        sx={{ position: 'absolute', top: 8, left: 8, fontWeight: 700, bgcolor: '#e0e0e0', color: '#333' }}
      />
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, mt: 1 }}>
        <img src={`https://flagcdn.com/24x18/${info.team1.flagCode}.png`} alt={info.team1.teamCode} style={{ borderRadius: 2 }} />
        <Typography variant="subtitle1" fontWeight={900} sx={{ letterSpacing: 1 }}>
          {info.team1.teamCode}
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} color="primary.main">
          {info.team1Score}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mx: 0.5, fontWeight: 700 }}>
          vs
        </Typography>
        <img src={`https://flagcdn.com/24x18/${info.team2.flagCode}.png`} alt={info.team2.teamCode} style={{ borderRadius: 2 }} />
        <Typography variant="subtitle1" fontWeight={900} sx={{ letterSpacing: 1 }}>
          {info.team2.teamCode}
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} color="primary.main">
          {info.team2Score}
        </Typography>
      </Stack>
      <Chip
        icon={statusIcon(info.status)}
        label={info.status}
        color={statusColor(info.status)}
        size="small"
        sx={{ mb: 1, fontWeight: 700, letterSpacing: 1, bgcolor: isLive ? '#d32f2f' : undefined, color: isLive ? '#fff' : undefined }}
      />
      <Typography variant="caption" align="center" sx={{ mb: 1, minHeight: 32, fontWeight: 500 }}>
        {info.result || 'Match details not available'}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 700 }}>
          Fantasy
        </Typography>
        <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 700 }}>
          Table
        </Typography>
        <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 700 }}>
          Schedule
        </Typography>
      </Stack>
    </Paper>
  );
};

export default MatchCard;
