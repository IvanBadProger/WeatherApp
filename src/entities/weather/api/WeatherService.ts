import { API_KEY, BASE_URL_WEATHER } from "@/shared/api"
import { WeatherApiError } from "@/shared/api/WeatherApiError"
import axios, { type AxiosError, type AxiosInstance } from "axios"
import type { Coordinates, OpenWeatherAPIResponse } from "../model/types"
import { CityNotFoundError } from "./CityNotFoundError"
import { NetworkError } from "./NetworkError"

class WeatherService {
  private axiosInst: AxiosInstance

  constructor(url?: string) {
    this.axiosInst = axios.create({
      baseURL: url ?? BASE_URL_WEATHER,
      params: {
        appid: API_KEY,
        units: "metric",
        lang: "ru",
      },
      timeout: 10000, // 10 секунд таймаут
    })

    // Перехватчик ошибок для централизованной обработки
    this.axiosInst.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return this.handleError(error)
      }
    )
  }

  private handleError(error: AxiosError): never {
    if (error.code === "ECONNABORTED") {
      throw new WeatherApiError("Превышено время ожидания ответа от сервера")
    }

    if (!error.response) {
      throw new NetworkError()
    }

    const { status, data } = error.response

    switch (status) {
      case 400:
        throw new WeatherApiError("Некорректный запрос")
      case 401:
        throw new WeatherApiError("Неверный API ключ")
      case 404:
        if (error?.config?.params?.q) {
          const city = error.config.params.q.split(",")[0]
          throw new CityNotFoundError(city)
        }
        throw new WeatherApiError("Данные для указанных координат не найдены")
      case 429:
        throw new WeatherApiError("Слишком много запросов. Попробуйте позже")
      case 500:
      case 502:
      case 503:
      case 504:
        throw new WeatherApiError("Проблемы на стороне сервера погоды")
      default:
        throw new WeatherApiError(`Неизвестная ошибка: ${status} - ${JSON.stringify(data)}`)
    }
  }

  public async getWeatherByCity(
    name: string,
    { signal }: { signal?: AbortSignal } = {}
  ): Promise<OpenWeatherAPIResponse> {
    if (!name.trim()) {
      throw new WeatherApiError("Название города не может быть пустым")
    }

    const response = await this.axiosInst.get<OpenWeatherAPIResponse>("/", {
      params: {
        q: `${name.trim()},RU`,
      },
      signal,
    })
    return response.data
  }

  public async getWeatherByCoords(
    { lat, lon }: Coordinates,
    { signal }: { signal?: AbortSignal } = {}
  ): Promise<OpenWeatherAPIResponse> {
    if (lat == null || lon == null) {
      throw new WeatherApiError("Координаты не указаны")
    }

    try {
      const response = await this.axiosInst.get<OpenWeatherAPIResponse>("/", {
        params: { lat, lon },
        signal,
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export const weatherService = new WeatherService()
