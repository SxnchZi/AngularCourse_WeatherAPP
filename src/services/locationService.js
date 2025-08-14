import axios from 'axios';
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
        reject(new Error('Геолокация не поддерживается вашим браузером'));
        }
        navigator.geolocation.getCurrentPosition(
        (position) => {
            resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
            });
        },
        (error) => {
            let errorMessage;
            switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = "Доступ к геолокации запрещен пользователем";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = "Информация о местоположении недоступна";
                break;
            case error.TIMEOUT:
                errorMessage = "Время ожидания запроса геолокации истекло";
                break;
            default:
                errorMessage = "Произошла неизвестная ошибка геолокации";
            }
            reject(new Error(errorMessage));
        }
        );
    });
};

export const getCityFromCoords = async (lat, lon) => {
    try {
        const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
        );
        return response.data[0]?.name || 'Неизвестный город';
    } catch (error) {
        throw new Error('Не удалось определить город');
    }
};