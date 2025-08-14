import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import CityInput from './components/CityInput';
import WeatherDisplay from './components/WeatherDisplay';
import SavedLocations from './components/SavedLocations';
import MapDisplay from './components/MapDisplay';
import { fetchWeather } from './services/weatherService';
import { getCurrentLocation, getCityFromCoords } from './services/locationService';
import './styles/App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedLocations');
    if (saved) {
      setSavedLocations(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async (selectedCity) => {
    setLoading(true);
    setError('');
    try {
      console.log('Начинаем поиск погоды для города:', selectedCity);
      const weatherData = await fetchWeather(selectedCity);
      console.log('Получены данные о погоде:', weatherData);
      setWeather(weatherData);
      setCity(selectedCity);
    } catch (err) {
      console.error('Ошибка в handleSearch:', err);
      setError(err.message || 'Не удалось получить данные о погоде');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLocation = () => {
    if (city && !savedLocations.includes(city)) {
      const updatedLocations = [...savedLocations, city];
      setSavedLocations(updatedLocations);
      localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
    }
  };

  const handleLocationSelect = (location) => {
    handleSearch(location);
  };

  const handleDetectLocation = async () => {
    setLoading(true);
    try {
      const { lat, lon } = await getCurrentLocation();
      const detectedCity = await getCityFromCoords(lat, lon);
      await handleSearch(detectedCity);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Погодное приложение</h1>
      <CityInput onSearch={handleSearch} />
      <button onClick={handleDetectLocation} className="location-button">
        Определить мое местоположение
      </button>
      
      {loading && <p className="loading">Загрузка...</p>}
      {error && <p className="error">{error}</p>}
      
      {weather && (
        <>
          <WeatherDisplay weather={weather} />
          <button onClick={handleSaveLocation} className="save-button">
            Сохранить местоположение
          </button>
          <MapDisplay city={city} />
        </>
      )}
      
      <SavedLocations 
        locations={savedLocations} 
        onSelect={handleLocationSelect} 
      />
    </div>
  );
}

export default App;

