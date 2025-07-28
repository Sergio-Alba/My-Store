import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from "../services/createProduct.action"

export const useProductMutation = () => {

  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn: createProduct,
      onSuccess:(data) => {

        //? Invalidate the products query to refetch the data
        queryClient.invalidateQueries({
          queryKey: ["products",{"filterKey": data.category}]
        })
      }
    })
  return mutation
}
