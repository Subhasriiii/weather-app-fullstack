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
        setForecast([]);
        setLoading(false);
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
      setWeather(null);
      setForecast([]);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "linear-gradient(135deg, #74b9ff, #dfe6e9)"
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getWeather();
          }
        }}
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
          padding: "12px 24px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          marginTop: "10px",
          boxShadow: "0 4px 10px rgba(37,99,235,0.3)"
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
            width: "380px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
            backgroundColor: "#ffffff",
            border: "none",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
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
            <strong>Country: </strong> {weather.sys.country}
          </p>
          <p>
            <strong>Temperature: </strong> {Math.round(weather.main.temp)} °C,
          </p>
          <p>
            <strong>Weather: </strong> {weather.weather[0].description}
          </p>
          <p>
            <strong>Humidity: </strong> {weather.main.humidity}%
          </p>

          <p>
            <strong>Wind Speed: </strong> {weather.wind.speed} m/s
          </p>
          <p><strong>Feels Like: </strong>{Math.round(weather.main.feels_like)} °C</p>
          <p><strong>Sunrise: </strong> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p><strong>Sunset: </strong> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
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
                  width: "130px",
                  fontSize: "14px",
                  backgroundColor: "#E0F2FE",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="forecast icon"
                />

                <p style={{ fontWeight: "bold" }}>
                  🕒 {new Date(item.dt_txt).toLocaleString("en-US", {
                    weekday: "short",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>

                <p>🌡 {Math.round(item.main.temp)} °C</p>

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