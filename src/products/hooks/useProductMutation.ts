import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from ".."
import { Product } from "..";

export const useProductMutation = () => {

  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn: createProduct,
      onSuccess:(data) => {

        //? Invalidate the products query to refetch the data
        // queryClient.invalidateQueries({
        //   queryKey: ["products",{"filterKey": data.category}]
        // })

        queryClient.setQueryData<Product[]>(
          ["products",{"filterKey": data.category}],(oldProducts) => {
          if (!oldProducts) return [data]
          return [...oldProducts, data]
        })
      }
    })
  return mutation
}
