import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    try {
      setError("");
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/weather/${city}`
      );

      const data = await response.json();

      console.log(data);

      if (data.message) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
        const forecastResponse = await fetch(`http://localhost:5000/forecast/${city}`);
        const forecastData = await forecastResponse.json();
        setForecast(forecastData.list.slice(0, 5));
        setCity("");
        setLoading(false);
      }
    } catch (error) {
      console.log("FULL ERROR:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "linear-gradient(to bottom, #87CEEB, #E0F6FF)",
    }}>
      <h1 style={{
        fontSize: "3rem",
        marginBottom: "20px"
      }}>
        🌤 Weather Dashboard</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "250px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      />

      <button onClick={getWeather}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "10px",
        }}
      >
        🔍 Get Weather
      </button>

      {loading && <p>Loading weather...</p>}

      {error && (
        <p>{error}</p>
      )}

      {weather && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            width: "350px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <h2>{weather.name}</h2>
          </div>
          <p>
            Temperature: {weather.main.temp} °C,
          </p>
          <p>
            Weather: {weather.weather[0].description}
          </p>

          <p>
            Humidity: {weather.main.humidity}%
          </p>

          <p>
            Wind Speed: {weather.wind.speed} m/s
          </p>
        </div>
      )}

      {forecast.length > 0 && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <h2>Forecast</h2>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {forecast.map((item, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "8px",
                  width: "140px",
                  backgroundColor: "white",
                }}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="forecast icon"
                />

                <p>
                  {new Date(item.dt_txt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "numeric",
                    day: "numeric",
                  })}
                </p>

                <p>🌡 {item.main.temp} °C</p>

                <p>{item.weather[0].description}</p>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;      