import { Button, Field, Input, Stack } from "@chakra-ui/react"

type WeatherFormProps = {
  setCity: (city: string) => void
  isDisabled?: boolean
}

export const WeatherForm = ({
  setCity,
  isDisabled,
}: WeatherFormProps) => {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault()

    const target = event.currentTarget
    const formData = new FormData(target)
    const fields = Object.fromEntries(formData) as { city: string }

    setCity(fields.city)

    target.reset()
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack spaceY={4}>
        <Field.Root required disabled={isDisabled}>
          <Field.Label>Город</Field.Label>
          <Input type="text" placeholder="Город" name="city" />
        </Field.Root>
        <Button type="submit" disabled={isDisabled}>
          Проверить погоду
        </Button>
      </Stack>
    </form>
  )
}
