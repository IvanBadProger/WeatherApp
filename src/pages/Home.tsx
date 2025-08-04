import { WeatherDataList } from "@/entities/weather/ui/WeatherDataList"
import { useWeatherByCity } from "@/features/getWeatherByCity/model/useWeatherByCity"
import { WeatherForm } from "@/features/getWeatherByCity/ui/WeatherForm"
import { useWeatherByCoord } from "@/features/getWeatherByCoord/model/useWeatherByCoord"
import { useGeolocation } from "@/shared/model/useGeolocation"
import { Box, Card, Container, Spinner, Text } from "@chakra-ui/react"

export const Home = () => {
  const {
    data: cityData,
    isFetching: isCityFetching,
    isError: isCityError,
    error: cityError,
    setCity,
  } = useWeatherByCity()

  const {
    data: coordData,
    isFetching: isCoordFetching,
    isError: isCoordError,
    error: coordError,
    setCoords,
  } = useWeatherByCoord()

  const data = cityData || coordData
  const isFetching = isCityFetching || isCoordFetching
  const isError = isCityError || isCoordError
  const error = cityError || coordError

  useGeolocation(setCoords)

  const isEmptyData = !data || !Object.entries(data).length

  return (
    <Container centerContent>
      <Card.Root variant={isFetching ? "subtle" : "elevated"}>
        <Card.Header>
          <Card.Title textAlign={"center"}>Че там по погоде</Card.Title>
        </Card.Header>

        <Card.Body>
          {isFetching ? (
            <Box textAlign="center" py={4}>
              <Spinner size="xl" />
            </Box>
          ) : isEmptyData ? (
            <Text textAlign="center" py={4}>
              Данных нет
            </Text>
          ) : (
            <WeatherDataList weatherData={data} />
          )}

          <WeatherForm setCity={setCity} isDisabled={isFetching} />
        </Card.Body>

        {isError && (
          <Card.Footer>
            <Text color="red.500" textAlign="center">
              {error?.message || "Произошла ошибка"}
            </Text>
          </Card.Footer>
        )}
      </Card.Root>
    </Container>
  )
}
