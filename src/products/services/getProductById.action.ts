import { sleep } from "../../utils/sleep";
import { Product, productsApi } from "..";

export const getProductById = async ( id :number):Promise<Product> => {

  // Simulate a delay to mimic real-world API call latency
  await sleep(2);

  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
}