export class NetworkError extends Error {
  constructor() {
    super("Проблемы с сетью. Проверьте подключение к интернету")
    this.name = "NetworkError"
  }
}
