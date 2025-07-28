import { useQueryClient } from "@tanstack/react-query"
import { getProductById } from "..";

export const usePrefetchProduct = () => {

  const queryClient = useQueryClient();
  const prefetchProduct = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ['product', id],
      queryFn: () => getProductById(id)
    })
  }
  return { prefetchProduct }
}
