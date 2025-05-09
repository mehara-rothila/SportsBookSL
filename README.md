# SportsBookSL Frontend

Sports Facility Booking Platform for Sri Lanka

🌐 **Live Site**: [https://spiritx.mehara.io/](https://spiritx.mehara.io/)

## 📋 Overview

SportsBookSL is a comprehensive sports facility booking platform for Sri Lanka, allowing users to book sports facilities, equipment, and trainers across the country.

## ✨ Features

- **User Authentication**: Secure login, registration, and password recovery
- **Facility Bookings**: Search, view, and book sports facilities
- **Trainer Booking**: Find and book sessions with sports trainers
- **Financial Aid Applications**: Apply for financial assistance for sports activities
- **Donations**: Support talented athletes through donations
- **AI-Powered Weather Integration**: Real-time weather data and intelligent recommendations for outdoor facilities
- **Equipment Rental**: Book sports equipment alongside facilities
- **Transportation Booking**: Arrange transportation to facilities
- **Notifications**: Real-time notification system for booking updates
- **Admin Dashboard**: Comprehensive management interface for administrators
- **User Profiles**: Manage bookings, applications, and personal information

## 🛠️ Tech Stack

- **Framework**: Next.js 
- **UI Library**: React
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API Communication**: Axios
- **Animation**: Framer Motion
- **UI Components**: Headless UI

## 📁 Project Structure

```
SportsBookSL-front/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── (auth)/         # Authentication pages
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── bookings/       # Booking pages
│   │   ├── donations/      # Donation pages
│   │   ├── facilities/     # Facility pages
│   │   ├── financial-aid/  # Financial aid pages
│   │   ├── notifications/  # Notification pages
│   │   ├── profile/        # User profile pages
│   │   ├── trainers/       # Trainer pages
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable components
│   │   ├── admin/          # Admin dashboard components
│   │   ├── bookings/       # Booking-related components
│   │   ├── donations/      # Donation-related components
│   │   ├── equipment/      # Equipment rental components
│   │   ├── facilities/     # Facility-related components
│   │   ├── home/           # Home page components
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── notifications/  # Notification components
│   │   ├── profile/        # Profile components
│   │   ├── reviews/        # Review components
│   │   ├── transportation/ # Transportation booking components
│   │   ├── ui/             # Base UI components
│   │   └── weather/        # Weather components
│   ├── context/            # Context providers
│   │   └── NotificationContext.tsx # Notification state management
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.tsx     # Authentication hook
│   ├── services/           # API services
│   │   ├── api.ts          # Base API configuration
│   │   ├── authService.ts  # Authentication service
│   │   ├── facilityService.ts # Facility service
│   │   ├── bookingService.ts # Booking service
│   │   └── ...             # Other API services
│   └── utils/              # Utility functions
│       └── weatherUtils.ts # Weather-related utilities
├── .env                    # Environment variables
├── next.config.js          # Next.js configuration
├── postcss.config.js       # PostCSS configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mehara-rothila/SportsBookSL.git
   cd SportsBookSL
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5001/api
   NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:5001
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

### Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🔄 Frontend-Backend Communication

The frontend communicates with the backend through RESTful API endpoints defined in the service files:

```javascript
// Example from src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

## 📝 API Services

- **authService**: Handles user authentication, registration, and profile management
- **facilityService**: Manages facility data and bookings
- **trainerService**: Handles trainer profiles and bookings
- **bookingService**: Processes facility and trainer bookings
- **donationService**: Manages donations to athletes
- **financialAidService**: Handles financial aid applications
- **notificationService**: Manages user notifications
- **weatherService**: Integrates with OpenWeather API and Google's Gemini AI to provide intelligent weather analysis for facilities

## 🌦️ AI-Powered Weather Assistant

SportsBookSL features an innovative AI-powered weather assistant that revolutionizes how users plan their sports activities:

- **Real-time Weather Intelligence**: Combines OpenWeather API data with Google's Gemini AI to provide smart weather analysis
- **Sport-Specific Recommendations**: Analyzes weather conditions based on specific sport requirements (e.g., wind conditions for cricket vs. tennis)
- **Predictive Booking Advice**: Suggests optimal booking times based on weather forecasts and historical patterns
- **Facility Compatibility Analysis**: Evaluates weather conditions against facility specifications
- **Intelligent Alternatives**: When conditions are unfavorable, automatically suggests indoor facilities or better time slots
- **Visual Weather Insights**: Presents weather data with intuitive visualizations and clear recommendations
- **Natural Language Explanations**: Uses AI to explain weather conditions and their impact in plain language

The weather assistant enhances the user experience by reducing weather-related booking disruptions and helping athletes make informed decisions about their sports activities.

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API base URL | http://localhost:5001/api |
| NEXT_PUBLIC_BACKEND_BASE_URL | Backend base URL for media/assets | http://localhost:5001 |
| NEXT_PUBLIC_OPENWEATHER_API_KEY | API key for OpenWeather integration | [Your OpenWeather API Key] |
| NEXT_PUBLIC_GEMINI_API_KEY | API key for Google Gemini AI integration | [Your Gemini API Key] |

## 👥 Team Members

**Team Name: Xforce**

- **Mehara Rothila** - Team Leader
- **Aditha Buwaneka**
- **Dinith Edirisinghe**
- **Piyumi Imasha**

## 📄 License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
