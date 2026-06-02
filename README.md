# Weather Dashboard

## Overview

Weather Dashboard is a full-stack weather application that allows users to search for any city and view real-time weather
information along with forecast data. The application uses the OpenWeather API to fetch weather details and displays them 
through a clean and responsive user interface.

## Live Demo

Frontend: https://weather-app-fullstack-git-main-subhasri-projects.vercel.app/

Backend: https://weather-app-fullstack-ljz3.onrender.com

## GitHub Repository

https://github.com/Subhasriiii/weather-app-fullstack

## Features

* Search weather by city name
* Display current weather conditions
* Show temperature, humidity, wind speed, and weather description
* Display "Feels Like" temperature
* Show sunrise and sunset times
* Display forecast data
* Loading state while fetching data
* Error handling for invalid city names
* Responsive user interface
* Enter key support for quick searches

## Tech Stack

### Frontend

* React
* JavaScript
* CSS (Inline Styling)

### Backend

* Node.js
* Express.js

### API

* OpenWeather API

### Deployment

* Vercel (Frontend)
* Render (Backend)

## Project Structure

```text
Weather_app_fullstack/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── server.js
│   ├── routes/
│   └── package.json
│
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/Subhasriiii/weather-app-fullstack.git
```

### Navigate to the Project

```bash
cd weather-app-fullstack
```

### Install Backend Dependencies

```bash
cd Backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

## Environment Variables

Create a `.env` file inside the Backend folder and add:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

## Running the Application Locally

### Start Backend

```bash
cd Backend
npm start
```

### Start Frontend

```bash
cd Frontend
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

The backend will run on:

```text
http://localhost:5000
```

## API Endpoints

### Get Current Weather

```http
GET /weather/:city
```

Example:

```http
GET /weather/Hyderabad
```

### Get Forecast

```http
GET /forecast/:city
```

Example:

```http
GET /forecast/Hyderabad
```

## Challenges Faced

* Handling invalid city searches
* Managing loading and error states
* Connecting frontend and backend services
* Deploying the application on Vercel and Render
* Resolving HTTPS and mixed-content issues after deployment
* Configuring environment variables securely

## Future Improvements

* Dark mode support
* Geolocation-based weather search
* Recent search history
* Improved forecast visualization
* Weather charts and analytics

## Author

Subhasri
B.Tech (AI & ML)
This project was developed as part of a full-stack web development assignment to gain practical experience with React,
Node.js, APIs, deployment, and full-stack application development.

