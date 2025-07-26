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
    
    // Fallback news data
    const fallbackNews = [
      {
        id: 1,
        title: 'India wins thrilling T20 series against Australia',
        time: '2 hours ago',
        img: 'https://images.unsplash.com/photo-1616097212395-14ad8ef0c5ed?auto=format&fit=crop&w=70&q=50',
        link: '#'
      },
      {
        id: 2,
        title: 'England announces squad for upcoming Test series',
        time: '4 hours ago',
        img: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=70&q=50',
        link: '#'
      },
      {
        id: 3,
        title: 'Pakistan vs New Zealand: Live updates from Karachi',
        time: '6 hours ago',
        img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=70&q=50',
        link: '#'
      },
      {
        id: 4,
        title: 'World Cup 2024: Schedule and venues announced',
        time: '8 hours ago',
        img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=70&q=50',
        link: '#'
      }
    ];

    axios.get('https://livescore6.p.rapidapi.com/news/list', {
      params: { category: 'cricket' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
      },
      timeout: 5000
    })
    .then(res => {
      let newsList = res.data.articles || res.data.news || [];
      if (!newsList.length && res.data.news) {
        newsList = res.data.news;
      }
      const mappedNews = newsList.map((item, idx) => ({
        id: item.id || idx,
        title: item.title || item.headline || 'Untitled',
        time: item.date || item.time || '',
        img: item.image || item.img || 'https://via.placeholder.com/70x70?text=News',
        link: item.url || '#'
      }));
      
      // Use API data if available, otherwise use fallback
      setNews(mappedNews.length > 0 ? mappedNews : fallbackNews);
      setLoading(false);
    })
    .catch(err => {
      console.log('News API failed, using fallback data:', err.message);
      setNews(fallbackNews);
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
