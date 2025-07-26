// src/App.js
import React, { useMemo, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Container, Grid, Button, Paper, CssBaseline, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import RecentMatches from './components/RecentMatches';
import NewsFeed from './components/NewsFeed';
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

// Placeholder detail pages
function MatchDetail({ matchId }) {
  return <Box sx={{ p: 4 }}><Typography variant="h4">Match Detail: {matchId}</Typography></Box>;
}
function NewsDetail({ newsId }) {
  return <Box sx={{ p: 4 }}><Typography variant="h4">News Detail: {newsId}</Typography></Box>;
}
function MatchDetailWrapper() {
  const { matchId } = useParams();
  return <MatchDetail matchId={matchId} />;
}
function NewsDetailWrapper() {
  const { newsId } = useParams();
  return <NewsDetail newsId={newsId} />;
}
function CricPulseLogo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
      <SportsCricketIcon sx={{ fontSize: 32, color: '#FF9800', mr: 1 }} />
      <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 1, color: '#fff' }}>CricPulse</Typography>
    </Box>
  );
}
function MainApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: { main: '#3a1c71' }, // deep purple
        secondary: { main: '#FF9800' }, // vibrant orange
        background: {
          default: darkMode ? '#1a1333' : '#f7f5fa',
          paper: darkMode ? '#241a3a' : '#fff',
        },
      },
      typography: { fontFamily: 'Montserrat, Roboto, Arial, sans-serif', fontWeightBold: 700 },
    }),
    [darkMode]
  );
  const navigate = useNavigate();
  // Handlers for navigation
  const handleMatchClick = (matchId) => navigate(`/match/${matchId}`);
  const handleNewsClick = (newsId) => navigate(`/news/${newsId}`);
  // Search handlers
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSearchKeyDown = (e) => { if (e.key === 'Enter') e.preventDefault(); };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static" sx={{ boxShadow: 2, background: 'linear-gradient(90deg, #3a1c71 0%, #d76d77 100%)' }} component="nav" aria-label="Main navigation">
          <Toolbar sx={{ minHeight: 64 }}>
            <CricPulseLogo />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button color="inherit" sx={{ fontWeight: 600 }}>Live Scores</Button>
              <Button color="inherit" sx={{ fontWeight: 600 }}>Schedule</Button>
              <Button color="inherit" sx={{ fontWeight: 600 }}>Archives</Button>
              <Button color="inherit" sx={{ fontWeight: 600 }}>News</Button>
              <Button color="inherit" sx={{ fontWeight: 600 }}>Series</Button>
              <Button color="inherit" sx={{ fontWeight: 600 }}>Teams</Button>
              <Button color="inherit" sx={{ fontWeight: 600 }}>Videos</Button>
              <Button color="inherit" sx={{ fontWeight: 600 }}>Rankings</Button>
              <Button color="inherit" sx={{ fontWeight: 600 }}>More</Button>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 1, px: 1, mr: 2 }}>
              <InputBase placeholder="Search..." sx={{ color: 'inherit', ml: 1, width: 140 }} value={search} onChange={handleSearchChange} onKeyDown={handleSearchKeyDown} aria-label="Search input" />
              <IconButton size="small" color="inherit" aria-label="Search button"><SearchIcon /></IconButton>
            </Box>
            <IconButton sx={{ ml: 1 }} color="inherit" onClick={() => setDarkMode((prev) => !prev)} aria-label="Toggle dark mode">{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton>
            <IconButton sx={{ ml: 1 }} color="inherit" aria-label="Account icon"><AccountCircleIcon /></IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, mb: 4 }}>
                <RecentMatches search={search} onMatchClick={handleMatchClick} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, mb: 4 }}>
                <NewsFeed onNewsClick={handleNewsClick} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Box sx={{ bgcolor: 'background.paper', py: 3, mt: 6, borderTop: 1, borderColor: 'divider' }} component="footer">
          <Container maxWidth="lg">
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
              <IconButton color="primary" aria-label="Twitter link" href="#"><FaTwitter /></IconButton>
              <IconButton color="primary" aria-label="Facebook link" href="#"><FaFacebook /></IconButton>
              <IconButton color="primary" aria-label="Instagram link" href="#"><FaInstagram /></IconButton>
              <IconButton color="primary" aria-label="YouTube link" href="#"><FaYoutube /></IconButton>
            </Stack>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} CricPulse. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/match/:matchId" element={<MatchDetailWrapper />} />
        <Route path="/news/:newsId" element={<NewsDetailWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}
