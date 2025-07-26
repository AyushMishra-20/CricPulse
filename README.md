# CricPulse - Cricket Live Scores & News

A modern React application for live cricket scores, match updates, and cricket news built with Material-UI.

## Features

- 🏏 Live cricket scores and match updates
- 📰 Latest cricket news feed
- 🎨 Modern Material-UI design with dark/light mode
- 📱 Responsive design for all devices
- ⚡ Fast loading with fallback data
- 🔍 Search functionality for matches and news

## Tech Stack

- React 19.1.0
- Material-UI v7.2.0
- React Router for navigation
- Axios for API calls
- Framer Motion for animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd CricPulse
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect it as a React app
4. The `vercel.json` file is already configured for proper routing

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to your hosting service

## Troubleshooting

### Blank Page Issues

If you see a blank page after deployment:

1. **Check Browser Console**: Open developer tools and look for JavaScript errors
2. **API Issues**: The app uses fallback data if APIs fail, so it should still work
3. **Routing Issues**: Make sure your hosting service supports client-side routing
4. **Build Issues**: Ensure the build completed successfully

### Common Issues

1. **API Rate Limits**: The app uses RapidAPI for live data. If you hit rate limits, it will use fallback data
2. **CORS Issues**: APIs are called from the client side, so CORS should be handled by the API providers
3. **Material-UI Styling**: If styles don't load, check if all Material-UI dependencies are installed

## Project Structure

```
src/
├── components/          # React components
│   ├── LiveScorecard.js
│   ├── RecentMatches.js
│   ├── NewsFeed.js
│   ├── MatchCard.js
│   └── ScoreSummary.js
├── api/                # API integration
│   └── cricket.js
├── App.js              # Main app component
├── index.js            # App entry point
└── index.css           # Global styles
```

## API Configuration

The app uses RapidAPI for live cricket data. If you want to use your own API keys:

1. Sign up at [RapidAPI](https://rapidapi.com)
2. Subscribe to cricket APIs
3. Update the API keys in the component files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure you're using a compatible Node.js version
4. Check the deployment logs in Vercel dashboard
