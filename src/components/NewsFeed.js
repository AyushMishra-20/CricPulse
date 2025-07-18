// src/components/NewsFeed.js
import React, { useEffect, useState } from 'react';

const NewsFeed = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Replace with actual API call
    setNews([
      { id: 1, title: 'India seals series win over Australia', time: '1h ago' },
      { id: 2, title: 'Bumrah returns with a bang in T20 opener', time: '2h ago' },
      { id: 3, title: 'Kohli on top form ahead of World Cup', time: '5h ago' },
    ]);
  }, []);

  return (
    <div className="news-sidebar">
      <h3>Latest Cricket News</h3>
      <ul>
        {news.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong>
            <br /><small>{article.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
