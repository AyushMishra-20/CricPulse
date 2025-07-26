// src/components/NewsFeed.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Stack, Link, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const API_KEY = '47e7b79ef2msh2fe5a7a5a313d87p12174ejsn141d3d6ce008';

const NewsFeed = ({ search, onNewsClick }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    


    // Use API data only - no fallback news
    console.log('Fetching news from API...');
    
    // Try multiple news API endpoints
    const newsEndpoints = [
      {
        url: 'https://livescore6.p.rapidapi.com/news/list',
        host: 'livescore6.p.rapidapi.com',
        params: { category: 'cricket' }
      },
      {
        url: 'https://cricket-live-data.p.rapidapi.com/news',
        host: 'cricket-live-data.p.rapidapi.com',
        params: {}
      },
      {
        url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index/cricket',
        host: 'cricbuzz-cricket.p.rapidapi.com',
        params: {}
      }
    ];

    const tryNewsEndpoint = async (endpoint) => {
      try {
        const response = await axios.get(endpoint.url, {
          params: endpoint.params,
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': endpoint.host
          },
          timeout: 10000
        });
        return response.data;
      } catch (error) {
        console.log(`News API endpoint ${endpoint.url} failed:`, error.message);
        return null;
      }
    };

    const fetchNewsData = async () => {
      for (const endpoint of newsEndpoints) {
        const data = await tryNewsEndpoint(endpoint);
        if (data) {
          console.log('Successfully fetched news from:', endpoint.url);
          console.log('News API response:', data);
          
          let newsList = data.articles || data.news || data.data || [];
          if (!newsList.length && data.news) {
            newsList = data.news;
          }
          
          const mappedNews = newsList.map((item, idx) => ({
            id: item.id || idx,
            title: item.title || item.headline || item.name || 'Untitled',
            time: item.date || item.time || item.publishedAt || '',
            img: item.image || item.img || item.urlToImage || 'https://via.placeholder.com/70x70?text=News',
            link: item.url || item.link || '#'
          }));
          
          if (mappedNews.length > 0) {
            setNews(mappedNews);
            setLoading(false);
            return;
          }
        }
      }
      
      // If no API worked, show error
      console.log('All news API endpoints failed');
      setError('Unable to fetch cricket news. Please try again later.');
      setNews([]);
      setLoading(false);
    };

    fetchNewsData();
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
