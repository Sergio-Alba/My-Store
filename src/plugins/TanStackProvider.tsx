import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const TanStackProvider = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient} >

    </QueryClientProvider>
  )
}
