import { useQuery } from "@tanstack/react-query"
import { getProducts } from ".."

interface Options {
  filterKey?: string
}

export const useProducts = ({filterKey}:Options) => {

  const product = useQuery({
    queryKey: ['products',{ filterKey }],
    queryFn: () => getProducts({ filterKey }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return { product }
}
