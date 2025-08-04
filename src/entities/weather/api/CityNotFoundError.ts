export class CityNotFoundError extends Error {
  constructor(city: string) {
    super(`Город "${city}" не найден`)
    this.name = "CityNotFoundError"
  }
}
