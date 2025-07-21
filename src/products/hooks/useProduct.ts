import { useQuery } from "@tanstack/react-query"
import { getProductById } from ".."

interface Props {
  id: number
}

export const useProduct = ({ id }:Props) => {

  const { data: product , isLoading, isError, error, isFetching  } = useQuery({
    queryKey: ['product',{ id }],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 5, // 15 minutes
  })

  return { product , isLoading, isError, isFetching, error }
}
