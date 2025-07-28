
import { productsApi } from ".."
import { Product } from "..";
import { sleep } from "../../utils/sleep";


interface GetProductsOptions {
  filterKey?: string
}

export const getProducts = async ({ filterKey }:GetProductsOptions):Promise<Product[]> => {

  //TODO Simulate a delay to mimic real-world API call latency
  // await sleep(2)

  const filterURL = filterKey ? `category=${filterKey}` : '';

  const { data } = await productsApi.get<Product[]>(`/products?${filterURL}`);
  return data;
}


