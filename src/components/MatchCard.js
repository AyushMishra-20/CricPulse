// src/components/MatchCard.js
import React from 'react';
import { Paper, Box, Typography, Divider, Link } from '@mui/material';

const MatchCard = ({ match }) => {
  const info = match.matchInfo;



  return (
    <Paper
      elevation={3}
      sx={{
        width: 320,
        height: 220,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 3,
        bgcolor: '#fff',
        boxShadow: 2,
        border: '1px solid #e0e0e0',
        m: 1,
        p: 2,
      }}
    >
      {/* Teams and Scores */}
      <Box sx={{ width: '100%', mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#222' }}>{info.team1.teamCode}</Typography>
          <Typography variant="h5" fontWeight={700} sx={{ color: '#222' }}>{info.team1Score}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
          <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#222' }}>{info.team2.teamCode}</Typography>
          <Typography variant="h5" fontWeight={700} sx={{ color: '#222' }}>{info.team2Score}</Typography>
        </Box>
      </Box>
      {/* Result/Session Note */}
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          fontWeight: 500,
          mb: 1,
          width: '100%',
        }}
      >
        {info.result && info.result !== info.status ? info.result : info.status}
      </Typography>
      <Divider sx={{ my: 1, width: '100%' }} />
      {/* Links Row */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: '100%' }}>
        {['Schedule', 'Table', 'Report', 'Videos', 'Series'].map((label) => (
          <Link
            key={label}
            href="#"
            underline="hover"
            variant="body2"
            color="primary"
            sx={{
              fontWeight: 500,
              transition: 'color 0.2s',
              '&:hover': { color: '#6c3fc5' },
            }}
          >
            {label}
          </Link>
        ))}
      </Box>
    </Paper>
  );
};

export default MatchCard;
