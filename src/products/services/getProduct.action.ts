import { sleep } from "../../utils/sleep";
import { Product, productsApi } from "..";

export const getProduct = async ( id :number):Promise<Product> => {

  // Simulate a delay to mimic real-world API call latency
  await sleep(200);

  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
}