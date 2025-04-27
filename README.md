# 🌦️ Indian Weather App

<<<<<<< HEAD
<p align="center">

</p>

<p align="center">

  <a href="https://v0-weatherapp-update-qyxkqr.vercel.app/">Live Demo</a> •
 
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

Check out the live demo: [Indian Weather App](https://v0-weatherapp-update-qyxkqr.vercel.app/)

## 🛠️ Installation

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn
- Git

### Clone and Setup

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/gagan-k454545/Weather-app.git
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
=======
A modern, responsive weather application that provides real-time weather information for cities across India and worldwide.

## 🌟 Live Demo

[View Live Demo](https://v0-weatherapp-update-qyxkqr.vercel.app/)

## ✨ Features

* **Current Weather Display**: Real-time weather information including temperature, humidity, wind speed, and more
* **Location Detection**: Automatically detects user's location for immediate local weather
* **City Search**: Search for weather in any city worldwide
* **5-Day Forecast**: Detailed 5-day weather forecast
* **Hourly Forecast**: Hour-by-hour weather predictions
* **Weather Maps**: Interactive maps showing the location's geography
* **Search History**: Track and revisit previous searches
* **Responsive Design**: Optimized for all devices from mobile to desktop
* **Dark Mode**: Toggle between light and dark themes
* **Weather Alerts**: Display important weather warnings and alerts
* **Air Quality Index**: Simulated AQI information
* **Detailed Weather Metrics**: Comprehensive weather data including sunrise/sunset times, pressure, visibility, etc.
* **City Suggestions**: Smart suggestions when city names are misspelled

## 🔌 APIs Used

* **Weather API**: Primary data source for weather information
   * Current Weather Data
   * 5-day Forecast
   * Geocoding for location data
* **OpenStreetMap**: For displaying location maps

## 🛠️ Tech Stack

### Frontend
* **Next.js**: React framework for server-rendered applications
* **React**: JavaScript library for building user interfaces
* **TypeScript**: Typed JavaScript for better code quality
* **Tailwind CSS**: Utility-first CSS framework for styling
* **shadcn/ui**: Reusable UI components
* **Framer Motion**: Animation library for smooth transitions
* **Lucide React**: Icon library

### Backend
* **Express.js**: Node.js framework for building the API
* **Next.js API Routes**: Serverless functions for frontend-backend communication
* **Supabase**: Database for storing search history (with localStorage fallback)

## 🌐 Backend Requirements

The application includes an Express.js server with the following endpoints:

* **GET /api/weather?city=XYZ** - Returns weather data for a given city
* **GET /api/weather/current** - Returns weather data based on coordinates
* **POST /api/search** - Logs the searched city
* **GET /api/searches** - Retrieves previous searches (stored in database)

## 🚀 Getting Started

### Prerequisites
* Node.js (v14 or later)
* npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/gagan-k454545/Weather-app.git
cd Weather-app
```

2. Install dependencies
```
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
# Weather API Key
WEATHER_API_KEY=your_api_key_here

# Optional: Supabase credentials for search history
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## 📱 Usage

- **Home Page**: View current weather for your detected location or default city
- **Search**: Enter a city name in the search bar to get weather information
- **Details Page**: Click on a weather card to view detailed information
- **Settings**: Customize your experience by toggling dark mode and other preferences

## 🧩 Project Structure

```
/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions
│   └── page.tsx          # Home page
├── server/               # Express.js backend
│   ├── routes/           # API endpoint routes
│   ├── controllers/      # Business logic
│   └── index.js          # Server entry point
├── public/               # Static assets
│   └── images/           # Weather icons and backgrounds
└── styles/               # Global styles
```

## 📬 Submission Checklist

- ✅ GitHub repository with organized and documented code: [https://github.com/gagan-k454545/Weather-app.git](https://github.com/gagan-k454545/Weather-app.git)
- ✅ Live demo link: [https://v0-weatherapp-update-qyxkqr.vercel.app/](https://v0-weatherapp-update-qyxkqr.vercel.app/)
- ✅ README.md file including:
  - Project name and description
  - Features implemented
  - API(s) used
  - Tech stack
  - Instructions to run locally
  - Backend requirements and endpoints

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Weather API](https://www.weatherapi.com/) for providing the weather data
- [OpenStreetMap](https://www.openstreetmap.org/) for the map integration
- [Vercel](https://vercel.com/) for hosting the application
- All contributors who help improve this project
>>>>>>> c29d9d943287dfdb713afe258aa692dae21406bc
