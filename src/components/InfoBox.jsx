import PropTypes from "prop-types";
import "./InfoBox.css";
import {
  WiThermometer,
  WiHumidity,
  WiCloud,
  WiStrongWind,
  WiBarometer,
} from "weather-icons-react";

export default function InfoBox({ info }) {
  const getTempClass = (temp) => {
    if (temp >= 30) return "hot";
    if (temp >= 20) return "warm";
    if (temp >= 10) return "cool";
    return "cold";
  };

  return (
    <div className="info-box">
      <h2 className="city-name">{info.city || "Unknown City"}</h2>

      <div className="info-details">
        {/* Temperature */}
        <div className="info-row">
          <WiThermometer size={50} color="#ff9800" />
          <p>
            Temperature:{" "}
            <span className={`temp ${getTempClass(info.temp)}`}>
              {info.temp?.toFixed(1) || "N/A"}°C
            </span>
          </p>
        </div>

        {/* Feels Like */}
        <div className="info-row">
          <WiStrongWind size={50} color="#f44336" />
          <p>
            Feels Like: <span>{info.feelsLike?.toFixed(1) || "N/A"}°C</span>
          </p>
        </div>

        {/* Min & Max Temperature */}
        <div className="info-row">
          <WiBarometer size={50} color="#4caf50" />
          <div className="min-max">
            <p>
              Max: <span>{info.tempMax?.toFixed(1) || "N/A"}°C</span>
            </p>
            <p>
              Min: <span>{info.tempMin?.toFixed(1) || "N/A"}°C</span>
            </p>
          </div>
        </div>

        {/* Humidity */}
        <div className="info-row">
          <WiHumidity size={50} color="#2196f3" />
          <p>
            Humidity: <span>{info.humidity || "N/A"}%</span>
          </p>
        </div>

        {/* Weather Condition */}
        <div className="info-row">
          <WiCloud size={50} color="#607d8b" />
          <p>
            Weather: <span className={`weather ${info.weather?.toLowerCase()}`}>{info.weather || "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

InfoBox.propTypes = {
  info: PropTypes.shape({
    city: PropTypes.string,
    temp: PropTypes.number,
    feelsLike: PropTypes.number,
    tempMax: PropTypes.number,
    tempMin: PropTypes.number,
    humidity: PropTypes.number,
    weather: PropTypes.string,
  }).isRequired,
};
