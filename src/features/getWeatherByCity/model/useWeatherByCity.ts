import { weatherService } from "@/entities/weather/api/WeatherService"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const useWeatherByCity = () => {
  const [city, setCity] = useState<string>("")

  const parameters = useQuery({
    queryKey: ["weather", city],
    queryFn: (meta) => weatherService.getWeatherByCity(city, meta),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
    enabled: !!city,
  })

  return {
    ...parameters,
    city,
    setCity,
  }
}
