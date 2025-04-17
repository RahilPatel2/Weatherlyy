import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Insights.css";

export default function Insights() {
  const [city, setCity] = useState("");
  const [weatherTemp, setWeatherTemp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const apiKey = "f8d49feabcd20b67eefcc3033c659a28";

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a valid city name.");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherTemp(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!res.ok) throw new Error("City not found.");

      const data = await res.json();
      setWeatherTemp(data.main.temp);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInsights = (temp) => {
    if (temp <= -20) return [
      "Very cold! Try not to go outside unless it's important.",
      "Wear many warm clothes like jackets, gloves, and boots.",
      "Cover your face with a scarf to protect your skin.",
      "Keep emergency lights and blankets ready at home.",
      "Let some water drip from taps to stop pipes from freezing.",
      "Check on old people and keep your pets inside."
    ];
    if (temp <= -10) return [
      "Still very cold. Don’t stay outside for long.",
      "Wear warm clothes in layers and cover your hands and ears.",
      "Roads can be icy, so walk and drive carefully.",
      "Use lotion to stop your skin from drying out.",
      "Keep extra food and warm clothes in your car just in case.",
      "Don’t touch metal things with bare hands—they might stick!"
    ];
    if (temp <= 0) return [
      "It’s freezing. Wear warm clothes with gloves and a hat.",
      "Be careful, the ground may be slippery with ice.",
      "Drink warm things like tea or soup to stay warm.",
      "Try not to stay outside too long.",
      "Avoid standing under snow or ice from rooftops.",
      "Keep your phone and battery warm—they drain fast in cold."
    ];
    if (temp <= 10) return [
      "A little cold. You can wear a light jacket or sweater.",
      "Nice weather for walking but carry an umbrella just in case.",
      "Morning and evening can feel colder than the afternoon.",
      "Let some fresh air in by opening windows for a few minutes.",
      "You can go for a jog or walk comfortably.",
      "Drink warm water if you feel a little cold."
    ];
    if (temp <= 20) return [
      "Perfect weather! Not too hot, not too cold.",
      "Wear whatever makes you feel comfortable.",
      "Great time for going out and doing activities.",
      "Drink water regularly, even if you're not thirsty.",
      "Use sunscreen if staying in the sun for long.",
      "Open windows to enjoy fresh air at home."
    ];
    if (temp <= 30) return [
      "Warm weather. Wear light clothes like cotton t-shirts.",
      "Keep a water bottle with you and drink often.",
      "Use sunscreen if going out in the sun.",
      "Eat fresh fruits and light food.",
      "Avoid staying out in the sun for too long.",
      "Wear sunglasses and a cap for extra protection."
    ];
    if (temp <= 40) return [
      "Hot weather. Try to stay indoors during afternoon.",
      "Drink more water than usual.",
      "Wear light and loose clothes.",
      "Eat fruits like watermelon to stay cool.",
      "Use sunscreen and sunglasses when outside.",
      "Don’t exercise outside when the sun is strong."
    ];
    if (temp <= 50) return [
      "Very hot! Stay indoors if possible.",
      "Use a fan or air conditioner to stay cool.",
      "Avoid coffee and tea—they can make you more thirsty.",
      "Keep your windows covered to block heat.",
      "Check on kids and old people—they need extra care.",
      "Eat light and cold foods like salads and fruits."
    ];
    return [
      "Extremely hot! Try not to go outside.",
      "Stay in cool rooms with fans or AC.",
      "Drink lots of water with salt or lemon to stay safe.",
      "Don’t do heavy work or exercise outside.",
      "Watch for signs of heatstroke—like dizziness or fast heartbeat.",
      "Eat cold meals and avoid cooking if possible."
    ];
  };

  return (
    <div className="insights-container">
      <div className="insights-card">
        <h1>Weather Insights</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />
          <button onClick={fetchWeather} disabled={loading}>
            {loading ? "Fetching..." : "Get Insights"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </div>

      {weatherTemp !== null && (
        <div className="weather-container">
          <div className="insights-box">
            <h3>What should you do in this weather?</h3>
            <ul>
              {getInsights(weatherTemp).map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>

          <button className="back-btn" onClick={() => navigate("/weather")}>
            ⬅ Back to Weather
          </button>
        </div>
      )}
    </div>
  );
}
