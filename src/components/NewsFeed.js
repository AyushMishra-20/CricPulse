// src/components/NewsFeed.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Stack, Link, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const API_KEY = '47e7b79ef2msh2fe5a7a5a313d87p12174ejsn141d3d6ce008';
const API_HOST = 'livescore6.p.rapidapi.com';

const NewsFeed = ({ search, onNewsClick }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('https://livescore6.p.rapidapi.com/news/list', {
      params: { category: 'cricket' }, // Try 'cricket' first
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      }
    })
    .then(res => {
      // Try to map cricket news, fallback to soccer if empty
      let newsList = res.data.articles || res.data.news || [];
      if (!newsList.length && res.data.news) {
        newsList = res.data.news;
      }
      // Map to your UI structure
      const mappedNews = newsList.map((item, idx) => ({
        id: item.id || idx,
        title: item.title || item.headline || 'Untitled',
        time: item.date || item.time || '',
        img: item.image || item.img || 'https://via.placeholder.com/70x70?text=News',
        link: item.url || '#'
      }));
      setNews(mappedNews);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to load news.');
      setLoading(false);
    });
  }, []);

  let filteredNews = news;
  if (search && search.trim() !== "") {
    const s = search.trim().toLowerCase();
    filteredNews = news.filter(article => article.title.toLowerCase().includes(s));
  }

  const handleNewsClick = (article) => {
    if (onNewsClick) onNewsClick(article.id);
  };

  return (
    <Box component="section" aria-label="Latest Cricket News">
      <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
        Latest Cricket News
      </Typography>
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}
      {error && <Alert severity="error">{error}</Alert>}
      <Stack spacing={2} role="list">
        {!loading && !error && filteredNews.map(article => (
          <Card key={article.id} sx={{ display: 'flex', alignItems: 'center', boxShadow: 2, borderRadius: 2, p: 1 }} role="listitem">
            <CardMedia
              component="img"
              image={article.img}
              alt={`News: ${article.title}`}
              sx={{ width: 70, height: 70, borderRadius: 1, mr: 2, objectFit: 'cover' }}
            />
            <CardContent sx={{ flex: 1, p: 0 }}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                gutterBottom
                noWrap
                sx={{ cursor: 'pointer' }}
                onClick={() => handleNewsClick(article)}
              >
                {article.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {article.time}
              </Typography>
              <Link href={article.link} underline="hover" variant="body2" color="primary">
                Read More
              </Link>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default NewsFeed;
