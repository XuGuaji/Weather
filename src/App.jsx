import React, { useState } from 'react';
import './App.css';

const APIKey = "fd989ae9e52d2bced5896a1180d9bfff";

function App() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = () => {
    if (city === '')
      return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
      .then(response => response.json())
      .then(json => {
        if (json.cod === '404') {
          setError(true);
          setWeather(null);
        } else {
          setError(false);
          setWeather(json);
        }
      });
  };

  const getImage = () => {
    switch (weather.weather[0].main) {
      case 'Clear':
        return 'images/clear.png';

      case 'Rain':
        return 'images/rain.png';

      case 'Snow':
        return 'images/snow.png';

      case 'Clouds':
        return 'images/cloud.png';

      default:
        return 'images/default.png';
    }
  };

  return (
    <div className="container">
      <div className="search-box">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && (
        <div className="not-found fadeIn">
          <img src='images/404.png'/>
          <h1>City not found</h1>
        </div>
      )}
      {weather && (
        <div>
          <div className="weather-box">
            <img src={getImage()} alt="weather icon" />
            <div className="temperature">{Math.round(weather.main.temp)}°C</div>
            <div className="description">{weather.weather[0].description}</div>
          </div>
          <div className="weather-details">
            <div className="humidity">Humidity: <span>{weather.main.humidity}%</span></div>
            <div className="wind">Wind: <span>{weather.wind.speed} m/s</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;