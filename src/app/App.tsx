import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import "./App.css"
import { Home } from "../pages/Home"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@chakra-ui/react/preset"

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 60 * 1000,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <Home />
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
