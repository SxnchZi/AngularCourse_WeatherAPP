import axios from 'axios';
import clearIcon from '../assets/weather-icons/clear.png';
import cloudIcon from '../assets/weather-icons/cloud.png';
import rainIcon from '../assets/weather-icons/rain.png';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || 'dd510ee7b9b960117596a4df3cf88e4a';
const DADATA_API_KEY = process.env.REACT_APP_DADATA_API_KEY || 'd57e6641637e833dc3c39382d1bebb567a9d0d7c';

export const fetchWeather = async (city) => {
    try {
        console.log('Запрос погоды для города:', city);
        console.log('Используемый API ключ:', API_KEY);
        
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=ru`
        );
        
        console.log('Ответ от OpenWeather API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении погоды:', error);
        
        if (error.response) {
            // Сервер ответил с кодом ошибки
            const status = error.response.status;
            const data = error.response.data;
            
            console.error('Статус ошибки:', status);
            console.error('Данные ошибки:', data);
            
            switch (status) {
                case 401:
                    throw new Error('Неверный API ключ OpenWeather. Проверьте ключ в настройках.');
                case 404:
                    throw new Error(`Город "${city}" не найден. Проверьте правильность написания.`);
                case 429:
                    throw new Error('Превышен лимит запросов к API. Попробуйте позже.');
                case 500:
                    throw new Error('Ошибка сервера OpenWeather. Попробуйте позже.');
                default:
                    throw new Error(`Ошибка API (${status}): ${data.message || 'Неизвестная ошибка'}`);
            }
        } else if (error.request) {
            // Запрос был отправлен, но ответ не получен
            console.error('Нет ответа от сервера:', error.request);
            throw new Error('Нет соединения с сервером. Проверьте интернет-соединение.');
        } else {
            // Ошибка при настройке запроса
            console.error('Ошибка настройки запроса:', error.message);
            throw new Error(`Ошибка запроса: ${error.message}`);
        }
    }
};

export const fetchCitySuggestions = async (query) => {
    try {
    const response = await axios.post(
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        { query, count: 5 },
        {
        headers: {
            'Authorization': `Token ${DADATA_API_KEY}`,
            'Content-Type': 'application/json'
        }
        }
    );
    return response.data.suggestions.map(suggestion => suggestion.value);
    } catch (error) {
    throw new Error('Ошибка при получении подсказок');
    }
};

export const getWeatherIcon = (weatherMain) => {
    const icons = {
        Clear: clearIcon,
        Clouds: cloudIcon,
        Rain: rainIcon,
        Snow: rainIcon, // Используем rain.png как fallback
        Thunderstorm: rainIcon, // Используем rain.png как fallback
        Drizzle: rainIcon, // Используем rain.png как fallback
        Mist: cloudIcon, // Используем cloud.png как fallback
        Fog: cloudIcon, // Используем cloud.png как fallback
    };

    return icons[weatherMain] || clearIcon;
};