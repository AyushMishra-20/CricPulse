// src/App.js
import React from 'react';
import './App.css';
import LiveScorecard from './components/LiveScorecard';
import RecentMatches from './components/RecentMatches';
import NewsFeed from './components/NewsFeed'; 
import ScoreSummary from './components/ScoreSummary'; // ✔️


function App() {
  return (
    <div className="App">

      {/* 🟢 Top Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">cricbuzz</span>
          <span className="nav-item">Live Scores</span>
          <span className="nav-item">Schedule</span>
          <span className="nav-item">News</span>
          <span className="nav-item">Series</span>
          <span className="nav-item">Teams</span>
        </div>
        <div className="navbar-right">
          <input className="search-box" placeholder="Search Cricbuzz" />
          <span className="icon">🔍</span>
        </div>
      </nav>

      {/* 🔴 Title */}
      <h1>Cricbuzz Clone</h1>

      {/* 🟡 Live Scorecards */}
      <LiveScorecard />
      <RecentMatches />
      <NewsFeed />

      {/* 🟣 Quick Access Panel */}
      <div className="quick-access">
        <button>Fantasy Handbook</button>
        <button>IND vs AUS</button>
        <button>World Cup</button>
        <button>Teams</button>
        <button>Cricbuzz Plus</button>
      </div>

      {/* 🔵 Main Content Section */}
      <div className="main-content">
        <div className="latest-news">
          <h3>LATEST NEWS</h3>
          <ul>
            <li>Rohit Sharma scores historic double century...</li>
            <li>Australia announces squad for India tour</li>
            <li>Moeen Ali to retire after England series</li>
            <li><a href="#">More News →</a></li>
          </ul>
        </div>
        <div className="main-story">
          <h4>FEATURED STORY</h4>
          <img
            src="https://images.unsplash.com/photo-1616097212395-14ad8ef0c5ed?auto=format&fit=crop&w=800&q=50"
            alt="Featured"
            className="featured-img"
          />
          <p><strong>India wins thriller in Mumbai</strong></p>
          <p>In a high-scoring final match, India edged past Australia to clinch the series 3–2. Captain Rohit led from the front...</p>
          <a href="#">Read Full Story →</a>
        </div>
      </div>
    </div>
  );
}

export default App;
