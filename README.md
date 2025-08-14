# Погодное приложение

React приложение для просмотра погоды с использованием API OpenWeather, DaDATA и Яндекс.Карт.

## Возможности

- Поиск погоды по городу
- Автоопределение местоположения
- Сохранение избранных мест
- Отображение карты с местоположением
- Автодополнение при вводе города

## Настройка

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка API ключей

Создайте файл `.env` в корне проекта:

```env
REACT_APP_OPENWEATHER_API_KEY=ваш_api_key_openweathermap
REACT_APP_DADATA_API_KEY=ваш_api_key_dadata
REACT_APP_YANDEX_MAPS_API_KEY=ваш_api_key_yandex_maps
```

#### Получение API ключей:

1. **OpenWeather API**: 
   - Зарегистрируйтесь на [openweathermap.org](https://openweathermap.org/api)
   - Получите бесплатный API ключ

2. **DaDATA API**:
   - Зарегистрируйтесь на [dadata.ru](https://dadata.ru/api/suggest/)
   - Получите API ключ для подсказок адресов

3. **Яндекс.Карты API**:
   - Зарегистрируйтесь на [yandex.ru/dev/maps](https://yandex.ru/dev/maps/)
   - Получите API ключ для карт

### 3. Обновление API ключа в HTML

В файле `public/index.html` замените `ваш_api_key_yandex_maps` на ваш реальный ключ Яндекс.Карт:

```html
<script src="https://api-maps.yandex.ru/2.1/?apikey=ВАШ_РЕАЛЬНЫЙ_КЛЮЧ&lang=ru_RU" type="text/javascript"></script>
```

## Запуск

```bash
npm start
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
src/
├── components/          # React компоненты
│   ├── App.js          # Главный компонент
│   ├── CityInput.js    # Ввод города с автодополнением
│   ├── WeatherDisplay.js # Отображение погоды
│   ├── MapDisplay.js   # Отображение карты
│   └── SavedLocations.js # Сохраненные места
├── services/           # API сервисы
│   ├── weatherService.js # OpenWeather API
│   └── locationService.js # Геолокация
└── styles/            # CSS стили
```

## Используемые технологии

- React 19
- Axios для HTTP запросов
- React Icons для иконок погоды
- Яндекс.Карты API
- OpenWeather API
- DaDATA API для подсказок
