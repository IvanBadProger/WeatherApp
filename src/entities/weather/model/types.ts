export interface Coordinates {
  lon: number // Долгота
  lat: number // Широта
}

// Объекты погоды
interface WeatherCondition {
  id: number // Идентификатор состояния погоды
  main: string // Основная группа погодных условий (например, "Rain")
  description: string // Детальное описание (например, "light rain")
  icon: string // Код иконки
}

// Основной блок основных метеорологических данных
interface MainWeather {
  temp: number // Текущая температура (Кельвин/C/F)
  feels_like: number // Ощущаемая температура
  pressure: number // Атмосферное давление (гПа)
  humidity: number // Относительная влажность (%)
  temp_min: number // Минимальная наблюдаемая температура
  temp_max: number // Максимальная наблюдаемая температура
  sea_level?: number // Атмосферное давление на уровне моря (гПа)
  grnd_level?: number // Атмосферное давление на уровне поверхности Земли (гПа)
}

// Ветровой блок
interface WindData {
  speed: number // Скорость ветра (метры/секунду)
  deg: number // Направление ветра (градусы)
  gust?: number // Порча ветра (метры/секунду)
}

// Блок облаков
interface CloudCoverage {
  all: number // Процент покрытия облаками (%)
}

// Блок осадков
interface RainOrSnow {
  ["1h"]?: number // Количество осадков за последние часы (мм/ч)
}

// Время суток и внутренняя информация
interface SystemInformation {
  type: number // Внутренний параметр
  id: number // Внутренний параметр
  message?: number // Внутренний параметр
  country: string // Страна (код страны, например GB, RU и др.)
  sunrise: number // Время восхода солнца (Unix-время)
  sunset: number // Время заката солнца (Unix-время)
}

// Полностью типизированный ответ API
export interface OpenWeatherAPIResponse {
  coord: Coordinates // Географические координаты
  weather: WeatherCondition[] // Список текущих состояний погоды
  base: string // Внутренняя переменная сервиса
  main: MainWeather // Метеоданные
  visibility: number // Видимость (метры)
  wind: WindData // Данных о ветре
  clouds: CloudCoverage // Данные о покрытии облаками
  rain?: RainOrSnow // Дождевые осадки
  snow?: RainOrSnow // Снежные осадки
  dt: number // Unix-время расчета данных
  sys: SystemInformation // Дополнительная служебная информация
  timezone: number // Смещение временной зоны относительно UTC
  id: number // Городской ID
  name: string // Имя города
  cod: number // Внутренний статус-код
}
