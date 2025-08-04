export class WeatherApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "WeatherApiError"
  }
}
