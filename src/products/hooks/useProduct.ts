import { useQuery } from "@tanstack/react-query"
import { getProduct } from ".."

interface Props {
  id: number
}

export const useProduct = ({ id }:Props) => {

  const { data: product , isLoading, isError, error, isFetching  } = useQuery({
    queryKey: ['product',{ id }],
    queryFn: () => getProduct(id),
    staleTime: 1000 * 60 * 5, // 15 minutes
  })

  return { product , isLoading, isError, isFetching, error }
}
