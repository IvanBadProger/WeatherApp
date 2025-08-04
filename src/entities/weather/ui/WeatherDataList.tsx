import { Box, DataList, Heading } from "@chakra-ui/react"
import type { OpenWeatherAPIResponse } from "../model/types"

type WeatherDataListProps = { weatherData: OpenWeatherAPIResponse }

export const WeatherDataList = (props: WeatherDataListProps) => {
  const { weatherData } = props

  const {
    main,
    wind,
    rain,
    snow,
    clouds,
    visibility,
    name,
    weather,
  } = weatherData

  const weatherInfo = [
    {
      label: "Температура",
      value: `${main.temp} °C`,
    },
    {
      label: "Ощущается как",
      value: `${main.feels_like} °C`,
    },
    {
      label: "Описание",
      value: weather[0]?.description ?? "",
    },
    { label: "Давление", value: `${main.pressure} гПа` },
    { label: "Влажность", value: `${main.humidity}%` },
    { label: "Видимость", value: `${visibility} м` },
    { label: "Облачность", value: `${clouds.all}%` },
    {
      label: "Скорость ветра",
      value: `${wind.speed.toFixed(1)} м/с`,
    },
    { label: "Направление ветра", value: `${wind.deg}°` },
    {
      label: "Порывы ветра",
      value: wind.gust ? `${wind.gust.toFixed(1)} м/с` : "-",
    },
    {
      label: "Осадки",
      value: rain?.["1h"]
        ? `${rain["1h"].toFixed(1)} мм/ч`
        : snow?.["1h"]
        ? `${snow["1h"].toFixed(1)} мм/ч`
        : "-",
    },
  ]

  return (
    <Box rounded={"md"} shadow={"sm"} marginY={4} padding={4}>
      <Heading as="h2" size="lg" mb={4}>
        Погода в городе {name}
      </Heading>

      <DataList.Root orientation={"horizontal"}>
        {weatherInfo.map((info) => (
          <DataList.Item key={info.label}>
            <DataList.ItemLabel>{info.label}</DataList.ItemLabel>
            <DataList.ItemValue>{info.value}</DataList.ItemValue>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Box>
  )
}
