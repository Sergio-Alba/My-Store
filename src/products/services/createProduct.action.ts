import { sleep } from "../../utils/sleep"
import { Product, productsApi } from ".."

interface ProductLike {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const createProduct = async(product: ProductLike) => {
    // await sleep(2)

  const { data } = await productsApi.post<Product>('/products', product)

  return data 
}
