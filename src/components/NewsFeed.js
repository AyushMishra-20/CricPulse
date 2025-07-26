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
    


    // Try to fetch from APIs first, then use fallback if needed
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
      },

    ];

    // Fallback news data in case all APIs fail
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

    const tryNewsEndpoint = async (endpoint) => {
      try {
        console.log(`Trying news API: ${endpoint.url}`);
        const response = await axios.get(endpoint.url, {
          params: endpoint.params,
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': endpoint.host
          },
          timeout: 10000
        });
        console.log(`News API ${endpoint.url} response status:`, response.status);
        return response.data;
      } catch (error) {
        console.log(`News API endpoint ${endpoint.url} failed:`, error.message);
        if (error.response) {
          console.log('Error response:', error.response.status, error.response.data);
        }
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
      
      // If no API worked, use fallback data
      console.log('All news API endpoints failed, using fallback data');
      setNews(fallbackNews);
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
