# React Weather App

Современное погодное приложение на React.js с использованием API OpenWeather, DaDATA и Яндекс.Карт.

## 🛠️ Технологии

- **React 19** - основная библиотека
- **Axios** - HTTP запросы к API
- **React Icons** - иконки погоды
- **OpenWeather API** - данные о погоде
- **DaDATA API** - подсказки городов
- **Яндекс.Карты API** - интерактивные карты

## 🚀 Быстрый старт

### Требования
- Node.js (версия 16.0+)
- npm или yarn

### Установка и запуск

1. **Клонирование репозитория**
```bash
git clone https://github.com/SxnchZi/AngularCourse_WeatherAPP.git
cd AngularCourse_WeatherAPP
```

2. **Установка зависимостей**
```bash
npm install
```

3. **Настройка API ключей** (по имдее можно использовать и мои ключи)
   
В файле .env:
```env
REACT_APP_OPENWEATHER_API_KEY=ваш_api_key_openweathermap
REACT_APP_DADATA_API_KEY=ваш_api_key_dadata
REACT_APP_YANDEX_MAPS_API_KEY=ваш_api_key_yandex_maps
```

4. **Обновление API ключа в HTML**

В файле `public/index.html` замените мой ключ на ваш ключ:
```html
<script src="https://api-maps.yandex.ru/2.1/?apikey=ВАШ_КЛЮЧ&lang=ru_RU"></script>
```

5. **Запуск приложения**
```bash
npm start
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

<img width="1920" height="922" alt="image" src="https://github.com/user-attachments/assets/be9266e5-110c-4859-a644-d33012f95e40" />


## 📁 Структура проекта

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
├── assets/             # Статические ресурсы
│   └── weather-icons/  # Иконки погоды
└── styles/            # CSS стили
```

## 🎯 Основные функции

### Поиск погоды
- Введите название города в поле поиска
- Используйте автодополнение для быстрого выбора
- Получите актуальную информацию о погоде

### Автоопределение местоположения
- Нажмите кнопку "Определить мое местоположение"
- Разрешите доступ к геолокации
- Получите погоду для вашего текущего местоположения

### Сохранение мест
- Сохраняйте избранные города
- Быстрый доступ к сохраненным местоположениям
- Удаление ненужных мест

### Интерактивная карта
- Автоматическое отображение карты для выбранного города
- Масштабирование и навигация
- Отметка местоположения на карте

## 🔧 Команды разработки

```bash
# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build

# Запуск тестов
npm test

# Извлечение конфигурации
npm run eject
```

**Примечание**: Для работы приложения необходимо настроить API ключи в файле `.env` и обновить ключ Яндекс.Карт в `public/index.html`.
