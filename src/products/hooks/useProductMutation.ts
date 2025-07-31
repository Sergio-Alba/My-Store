import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from ".."
import { Product } from "..";

export const useProductMutation = () => {

  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn: createProduct,

      onMutate: (product) => {
        console.log("Mutando - Optimistic Update", product);
        //? Optimistically update the cache

        //Optimistic product
        const optimisticProduct = {
          id: Math.random(),
          ...product
        }
        // Administrar el producto en el cache del query client
        queryClient.setQueryData<Product[]>(
          ["products", {filterKey: product.category} ],
          (old) => {
            if(!old ) return [optimisticProduct];
            
            return [...old, optimisticProduct]
          }
        )
        return { optimisticProduct }
      },




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
