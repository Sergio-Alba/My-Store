import { useQuery } from "@tanstack/react-query"
import { getProducts } from ".."

interface Options {
  filterKey?: string
}

export const useProducts = ({filterKey}:Options) => {

  const { data: product = [], isLoading, isError  } = useQuery({
    queryKey: ['products',{ filterKey }],
    queryFn: () => getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  return { product , isLoading, isError }
}
