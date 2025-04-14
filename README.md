# 🌦️ Indian Weather App

<p align="center">
  <img src="public/img/weather-app-banner.jpg" alt="Weather App Banner" width="800">
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-live-demo">Live Demo</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-technologies">Technologies</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

A beautiful, responsive weather application focused on Indian cities with real-time weather updates, forecasts, and detailed weather information. The app is optimized for mobile devices with a smooth, intuitive interface.

## ✨ Features

- **🔍 Smart Location Detection** - Automatically detects and displays weather for your current location
- **🔎 Intelligent Search** - Search for any city with smart suggestions for misspelled names
- **📱 Mobile-First Design** - Optimized for mobile devices with touch-friendly controls
- **🌙 Dark/Light Mode** - Toggle between themes for comfortable viewing in any lighting
- **📊 Detailed Weather Data** - Comprehensive information including:
  - Current temperature and conditions
  - "Feels like" temperature
  - Humidity, wind speed, and pressure
  - Visibility and cloudiness
  - Sunrise and sunset times
- **📈 Weather Forecasts**:
  - Hourly forecast for the next 24 hours
  - 5-day forecast with detailed daily information
- **🗺️ Interactive Maps** - View the location's geography with OpenStreetMap integration
- **💨 Air Quality Index** - Simulated AQI information for health awareness
- **📜 Search History** - Track and revisit your previous searches
- **⚡ Smooth Animations** - Beautiful transitions and micro-interactions for a polished feel

## 🌐 Live Demo

Check out the live demo: [Indian Weather App](https://indian-weather-app.vercel.app)

## 🛠️ Installation

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn
- Git

### Clone and Setup

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/indian-weather-app.git
   cd indian-weather-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Current Location Weather

When you first open the app, it will request permission to access your location. If granted, it will display the weather for your current location.

### Searching for Cities

1. Use the search bar at the top of the page to search for any city
2. If you misspell a city name, the app will suggest corrections
3. Click on a suggestion to view weather for that city

### Viewing Weather Details

- The main page shows current weather conditions
- Scroll down to see hourly forecast, detailed weather information, and 5-day forecast
- Toggle between light and dark mode using the button in the top-right corner

### Search History

- Click on "History" in the navigation menu to view your search history
- Click on any city in your history to quickly view its weather again

## 📊 API Endpoints

The app uses the following API endpoints:

- `GET /api/weather?city=CityName`: Get current weather for a specific city
- `GET /api/weather/current?lat=XX&lon=YY`: Get weather based on coordinates
- `GET /api/weather/forecast?city=CityName`: Get 5-day forecast for a city
- `POST /api/search`: Log a city search to the database
- `GET /api/searches`: Retrieve search history

## 🚀 Technologies

- **Frontend**:
  - [Next.js](https://nextjs.org/) - React framework for server-rendered applications
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [shadcn/ui](https://ui.shadcn.com/) - Reusable UI components
  - [Framer Motion](https://www.framer.com/motion/) - Animation library
  - [Lucide React](https://lucide.dev/) - Beautiful icons

- **Backend**:
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Serverless functions
  - [Supabase](https://supabase.io/) - Database for storing search history
  - [OpenWeatherMap API](https://openweathermap.org/) - Weather data provider

## 📷 Screenshots

<div align="center">
  <img src="public/img/screenshot-home.jpg" alt="Home Page" width="300">
  <img src="public/img/screenshot-details.jpg" alt="Weather Details" width="300">
  <img src="public/img/screenshot-history.jpg" alt="Search History" width="300">
</div>

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather data API
- [OpenStreetMap](https://www.openstreetmap.org/) for the mapping service
- [Vercel](https://vercel.com/) for hosting the application
- [Supabase](https://supabase.io/) for the database service

## 👨‍💻 Author

Created with ❤️ for the Web Development Internship Coding Round
\`\`\`

Now, let's enhance the UI to make it smoother and more visually appealing:

First, let's add a custom CSS file for animations and transitions:
