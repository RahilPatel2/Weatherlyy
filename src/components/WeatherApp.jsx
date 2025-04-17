import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  WiThermometer,
  WiHumidity,
  WiDaySunnyOvercast,
  WiStrongWind,
  WiBarometer,
} from "weather-icons-react";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const apiKey = "f8d49feabcd20b67eefcc3033c659a28";

  const getTempClass = (temp) => {
    if (temp >= 35) return "hot";
    if (temp >= 25) return "warm";
    if (temp >= 15) return "cool";
    return "cold";
  };

  const getColor = (tempClass) => {
    switch (tempClass) {
      case "hot":
        return "#ff5733";
      case "warm":
        return "#ffeb3b";
      case "cool":
        return "#4caf50";
      case "cold":
        return "#00bcd4";
      default:
        return "#00bcd4";
    }
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("⚠ Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!res.ok) {
        throw new Error("❌ City not found. Try again.");
      }

      const data = await res.json();
      setWeather(data);
      setCity("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tempClass = weather ? getTempClass(weather.main.temp) : "";

  return (
    <div className="weather-container">
      <h1>🌤️ WeatherLy</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <>
          <div className="info-box">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>

            <div className={`info-row ${tempClass}`}>
              <WiThermometer size={55} color={getColor(tempClass)} />
              <div className={`temp ${tempClass}`}>
                {weather.main.temp}°C
              </div>
            </div>

            <div className="info-row">
              <WiDaySunnyOvercast size={55} color="#00bcd4" />
              <div className="min-max">
                <p>Min: {weather.main.temp_min}°C</p>
                <p>Max: {weather.main.temp_max}°C</p>
              </div>
            </div>

            <div className="info-row">
              <WiHumidity size={55} color="#00bcd4" />
              <p>Humidity: {weather.main.humidity}%</p>
            </div>

            <div className="info-row">
              <WiStrongWind size={55} color="#00bcd4" />
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>

            <div className="info-row">
              <WiBarometer size={55} color="#00bcd4" />
              <p>Condition: {weather.weather[0].description}</p>
            </div>
          </div>

          <div className="button-box">
            <button onClick={() => navigate("/insights")}>🔍 Get Insights</button>
            <button onClick={() => navigate("/compare")}>⚖ Compare Cities</button>
          </div>
        </>
      )}
    </div>
  );
}
