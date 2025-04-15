# 🌦️ Indian Weather App

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
