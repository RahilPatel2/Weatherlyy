import { useState } from "react";
import PropTypes from "prop-types";

const SearchBox = ({ updateInfo }) => {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const apiKey = "bd5e378503939ddaee76f12ad7a97608";

    const handleSearch = async () => {
        if (!city.trim() || loading) return;

        setLoading(true);
        setError("");

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("City not found! Please enter a valid city.");
            }

            const data = await response.json();
            updateInfo({
                city: data.name || "Unknown",
                temp: data.main?.temp || 0,
                feelsLike: data.main?.feels_like || 0,
                tempMax: data.main?.temp_max || 0,
                tempMin: data.main?.temp_min || 0,
                humidity: data.main?.humidity || 0,
                weather: data.weather?.[0]?.description || "Unknown",
            });
            setCity("");
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError(error.message || "Failed to fetch weather data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="search-box">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name..."
                disabled={loading}
                aria-label="City name input"
            />

            <button onClick={handleSearch} disabled={loading}>
                {loading ? "Loading..." : "Search"}
            </button>

            {error && <p className="error">{error}</p>}
        </div>
    );
};

SearchBox.propTypes = {
    updateInfo: PropTypes.func.isRequired,
};

export default SearchBox;
