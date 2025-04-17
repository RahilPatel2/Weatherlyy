import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ComparePage.css";

export default function ComparePage() {
  const [weather1, setWeather1] = useState(null);
  const [weather2, setWeather2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityInput1, setCityInput1] = useState("");
  const [cityInput2, setCityInput2] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const apiKey = "f8d49feabcd20b67eefcc3033c659a28";

  const queryParams = new URLSearchParams(location.search);
  const city1 = queryParams.get("city1");
  const city2 = queryParams.get("city2");

  useEffect(() => {
    const fetchWeather = async (city) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!res.ok) throw new Error(`City "${city}" not found.`);
        return await res.json();
      } catch (err) {
        setError((prev) => `${prev ? prev + " | " : ""}${err.message}`);
        return null;
      }
    };

    const loadWeatherData = async () => {
      if (!city1 || !city2) return;

      setLoading(true);
      setError(null);
      setWeather1(null);
      setWeather2(null);

      const [data1, data2] = await Promise.all([
        fetchWeather(city1),
        fetchWeather(city2),
      ]);

      if (data1) setWeather1(data1);
      if (data2) setWeather2(data2);

      setLoading(false);
    };

    loadWeatherData();
  }, [city1, city2]);

  const handleCompare = () => {
    if (!cityInput1 || !cityInput2) {
      alert("Please enter both cities to compare.");
      return;
    }
    navigate(
      `/compare?city1=${encodeURIComponent(cityInput1)}&city2=${encodeURIComponent(cityInput2)}`
    );
  };

  const renderWeatherCard = (data) => (
    <div className="weather-card">
      <h3>{data.name}, {data.sys.country}</h3>
      <p>🌡️ Temp: {data.main.temp}°C</p>
      <p>💧 Humidity: {data.main.humidity}%</p>
      <p>🌥️ Weather: {data.weather[0].description}</p>
      <p>💨 Wind: {data.wind.speed} m/s</p>
    </div>
  );

  return (
    <div className="weather-container">
      <h1>Compare Weather</h1>

      <div className="compare-form">
        <input
          type="text"
          placeholder="Enter first city..."
          value={cityInput1}
          onChange={(e) => setCityInput1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter second city..."
          value={cityInput2}
          onChange={(e) => setCityInput2(e.target.value)}
        />
        <button onClick={handleCompare}>Compare</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather1 || weather2 ? (
        <>
          <div className="comparison-container">
            {weather1 && renderWeatherCard(weather1)}
            {weather2 && renderWeatherCard(weather2)}
          </div>
          <div className="back-button-container">
            <button onClick={() => navigate("/weather")}>⬅ Back to Home</button>
          </div>
        </>
      ) : (
        (!city1 || !city2) && (
          <div className="centered-message">
            <p>Please provide two cities to compare.</p>
            <button onClick={() => navigate("/weather")}>Go to Home</button>
          </div>
        )
      )}
    </div>
  );
}
