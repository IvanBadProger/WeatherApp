import { weatherService } from "@/entities/weather/api/WeatherService"
import type { Coordinates } from "@/entities/weather/model/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const useWeatherByCoord = () => {
  const [coords, setCoords] = useState<Coordinates>()

  const parameters = useQuery({
    queryKey: ["weather", coords],
    queryFn: (meta) => weatherService.getWeatherByCoords(coords as Coordinates, meta),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
    enabled: !!(coords?.lat || coords?.lon),
  })

  return {
    ...parameters,
    coords,
    setCoords,
  }
}
