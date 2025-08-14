import React from 'react';
import { getWeatherIcon } from '../services/weatherService';

function WeatherDisplay({ weather }) {
    // Отладочная информация
    console.log('WeatherDisplay получил данные:', weather);
    
    // Проверяем, что данные о погоде существуют и имеют нужную структуру
    if (!weather || !weather.weather || !weather.weather[0]) {
        console.error('Неверная структура данных о погоде:', weather);
        return <div className="weather-container">Нет данных о погоде</div>;
    }

    const weatherIcon = getWeatherIcon(weather.weather[0].main);
    console.log('Выбранная иконка:', weatherIcon);

    return (
    <div className="weather-container">
        <h2>{weather.name || 'Неизвестный город'}, {weather.sys?.country || ''}</h2>
        <div className="weather-main">
        <img src={weatherIcon} alt="Weather icon" className="weather-icon" />
        <div className="weather-temp">{Math.round(weather.main?.temp || 0)}°C</div>
        </div>
        <div className="weather-details">
        <p>Ощущается как: {Math.round(weather.main?.feels_like || 0)}°C</p>
        <p>Влажность: {weather.main?.humidity || 0}%</p>
        <p>Ветер: {Math.round(weather.wind?.speed || 0)} м/с</p>
        <p>Давление: {Math.round((weather.main?.pressure || 0) * 0.75)} мм рт. ст.</p>
        <p className="weather-description">{weather.weather[0]?.description || 'Нет описания'}</p>
        </div>
    </div>
    );
}

export default WeatherDisplay;