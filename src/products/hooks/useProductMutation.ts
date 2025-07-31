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
        console.log({optimisticProduct})
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

      onSuccess:(data, _variables, context) => {

        //? Invalidate the products query to refetch the data
        // queryClient.invalidateQueries({
        //   queryKey: ["products",{"filterKey": data.category}]
        // })

        // console.log(data, variables, context)
        
        queryClient.removeQueries({
          queryKey: ["product", context?.optimisticProduct.id ]
        })

        queryClient.setQueryData<Product[]>(
          ["products",{filterKey: data.category}],(oldProducts) => {
          if (!oldProducts) return [data]
          
          return oldProducts.map(cacheProduct => {
            return cacheProduct.id === context.optimisticProduct.id ? data : cacheProduct
          })

        })
      },

      onError: (error, _variables, context) => {
        console.log(error, _variables, context)

        queryClient.removeQueries({
          queryKey: ["product", context?.optimisticProduct.id ]
        })
        queryClient.setQueryData<Product[]>(
          ["products",{filterKey: _variables.category}],(oldProducts) => {
          if (!oldProducts) return []

          return oldProducts.filter(product => {
            return product.id !== context?.optimisticProduct.id
            }
          )
        })
      }
    })
  return mutation
}
