// src/App.js
import React, { useMemo, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Container, Grid, Button, Paper, CssBaseline, Avatar, Stack } from '@mui/material';
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

  // SVG logo for Flick of Wrists (new color scheme, new fonts)
  const FlickLogo = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-gradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3a1c71" />
            <stop offset="1" stopColor="#d76d77" />
          </linearGradient>
        </defs>
        <circle cx="22" cy="22" r="22" fill="url(#bg-gradient)"/>
        <ellipse cx="31" cy="20" rx="4" ry="4" fill="#FF9800" stroke="#fff" strokeWidth="1.5"/>
        <path d="M29 18.5c1.5 1 2.5 2.5 2.5 4" stroke="#fff" strokeWidth="0.8" strokeLinecap="round"/>
        <rect x="13" y="18" width="18" height="4" rx="2" fill="#fff"/>
        <rect x="19" y="10" width="4" height="18" rx="2" fill="#fff" transform="rotate(20 22 19)"/>
        <path d="M14 32 Q22 28 30 32" stroke="#FF9800" strokeWidth="2" fill="none"/>
      </svg>
      <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 1, color: '#fff', ml: 1, fontFamily: 'Bangers, Montserrat, Roboto, Arial, sans-serif', textTransform: 'none', fontSize: { xs: 22, sm: 28 } }}>
        Flick{' '}
        <Box component="span" sx={{ color: '#FF9800', fontWeight: 900, fontStyle: 'italic', fontFamily: 'Pacifico, cursive', fontSize: { xs: 22, sm: 28 } }}>
          of Wrists
        </Box>
      </Typography>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static" sx={{ boxShadow: 2, background: 'linear-gradient(90deg, #3a1c71 0%, #d76d77 100%)' }} component="nav" aria-label="Main navigation">
          <Toolbar sx={{ minHeight: 64 }}>
            <FlickLogo />
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
        <RecentMatches search={search} onMatchClick={handleMatchClick} />
        <main>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <NewsFeed search={search} onNewsClick={handleNewsClick} />
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Latest News */}
                <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>LATEST NEWS</Typography>
                  <ul style={{ paddingLeft: 18 }}>
                    <li>Rohit Sharma scores historic double century...</li>
                    <li>Australia announces squad for India tour</li>
                    <li>Moeen Ali to retire after England series</li>
                    <li><a href="#">More News →</a></li>
                  </ul>
                </Paper>
                {/* Featured Story */}
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>FEATURED STORY</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src="https://images.unsplash.com/photo-1616097212395-14ad8ef0c5ed?auto=format&fit=crop&w=800&q=50" alt="Featured" style={{ width: '100%', borderRadius: 8, marginBottom: 8 }} />
                    <Typography variant="h6" align="center" sx={{ fontWeight: 600 }}>India wins thriller in Mumbai</Typography>
                    <Typography align="center" sx={{ mb: 1 }}>In a high-scoring final match, India edged past Australia to clinch the series 3–2. Captain Rohit led from the front...</Typography>
                    <Button href="#" size="small">Read Full Story →</Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
        <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2, mt: 4 }} component="footer" aria-label="Footer">
          <Container maxWidth="lg">
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton color="inherit" href="https://x.com" target="_blank" rel="noopener" size="small"><FaTwitter /></IconButton>
                <IconButton color="inherit" href="https://facebook.com" target="_blank" rel="noopener" size="small"><FaFacebook /></IconButton>
                <IconButton color="inherit" href="https://instagram.com" target="_blank" rel="noopener" size="small"><FaInstagram /></IconButton>
                <IconButton color="inherit" href="https://youtube.com" target="_blank" rel="noopener" size="small"><FaYoutube /></IconButton>
              </Stack>
              <Stack direction="row" spacing={3} alignItems="center">
                <Button color="inherit" size="small">About</Button>
                <Button color="inherit" size="small">Contact</Button>
                <Button color="inherit" size="small">Privacy</Button>
              </Stack>
              <Typography variant="body2" align="center" sx={{ fontSize: 13 }}>
                © {new Date().getFullYear()} Cricbuzz. All rights reserved.
              </Typography>
            </Stack>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/Cricbuzz-Clone">
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/match/:matchId" element={<MatchDetailWrapper />} />
        <Route path="/news/:newsId" element={<NewsDetailWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

// Wrappers to extract params
function MatchDetailWrapper() {
  const { matchId } = useParams();
  return <MatchDetail matchId={matchId} />;
}
function NewsDetailWrapper() {
  const { newsId } = useParams();
  return <NewsDetail newsId={newsId} />;
}
