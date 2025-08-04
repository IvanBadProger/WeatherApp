import type { Coordinates } from "@/entities/weather/model/types"
import { useEffect } from "react"

export const useGeolocation = (setCoords: (coords: Coordinates) => void) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (error) => {
          console.error(error)
        }
      )
    } else {
      alert("Геолокация не поддерживается")
    }
  }, [])
}
