import React, { useEffect, useRef, useState } from 'react';

function MapDisplay({ city }) {
    const mapRef = useRef(null);
    const [mapError, setMapError] = useState('');
    const [apiStatus, setApiStatus] = useState('Проверка API...');

    useEffect(() => {
        if (!city || !mapRef.current) return;

        setMapError('');
        setApiStatus('Проверка API...');

        // Проверяем, загружен ли API Яндекс.Карт
        if (!window.ymaps) {
            console.log('Ожидание загрузки Яндекс.Карт API...');
            setApiStatus('Загрузка Яндекс.Карт API...');
            
            const timer = setInterval(() => {
                if (window.ymaps) {
                    console.log('Яндекс.Карт API загружен');
                    setApiStatus('API загружен, инициализация карты...');
                    clearInterval(timer);
                    initMap();
                }
            }, 100);
            
            // Таймаут на случай, если API не загрузится
            setTimeout(() => {
                clearInterval(timer);
                if (!window.ymaps) {
                    setMapError('Не удалось загрузить Яндекс.Карты. Проверьте API ключ и интернет-соединение.');
                    setApiStatus('Ошибка загрузки API');
                    console.error('Яндекс.Карт API не загружен');
                }
            }, 10000);
            
            return;
        }

        setApiStatus('API уже загружен, инициализация карты...');
        initMap();

        function initMap() {
            try {
                window.ymaps.ready(() => {
                    console.log('Инициализация карты для города:', city);
                    setApiStatus('Поиск координат города...');
                    
                    window.ymaps.geocode(city, { results: 1 }).then((res) => {
                        if (res.geoObjects.getLength() === 0) {
                            setMapError(`Не удалось найти координаты для города: ${city}`);
                            setApiStatus('Город не найден');
                            return;
                        }
                        
                        const firstGeoObject = res.geoObjects.get(0);
                        const coordinates = firstGeoObject.geometry.getCoordinates();
                        
                        console.log('Координаты города:', coordinates);
                        setApiStatus('Создание карты...');

                        const map = new window.ymaps.Map(mapRef.current, {
                            center: coordinates,
                            zoom: 10,
                            controls: ['zoomControl']
                        });
                        
                        map.geoObjects.add(firstGeoObject);
                        console.log('Карта успешно инициализирована');
                        setApiStatus('Карта готова');
                    }).catch((error) => {
                        console.error('Ошибка геокодирования:', error);
                        setMapError('Ошибка при поиске города на карте');
                        setApiStatus('Ошибка геокодирования');
                    });
                });
            } catch (error) {
                console.error('Ошибка инициализации карты:', error);
                setMapError('Ошибка при создании карты');
                setApiStatus('Ошибка инициализации');
            }
        }
    }, [city]);

    return (
        <div className="map-section">
            <h3>Карта местоположения</h3>
            <p className="api-status">{apiStatus}</p>
            {mapError && <p className="map-error">{mapError}</p>}
            <div ref={mapRef} className="map-container" />
        </div>
    );
}

export default MapDisplay;