// src/api/recentmatches.js
import axios from 'axios';
export const fetchRecentMatches = async () => {
  // Actual API endpoint here
  const response = await axios.get('https://api.example.com/recentmatches');
  return response.data;
};
