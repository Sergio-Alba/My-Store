
import { productsApi } from ".."
import { Product } from "..";
import { sleep } from "../../utils/sleep";


interface GetProductsOptions {
  filterKey?: string
}

export const getProducts = async ({ filterKey }:GetProductsOptions) => {

  // Simulate a delay to mimic real-world API call latency
  // This is useful for testing loading states in your UI
  await sleep(2) // Simulate a delay for demonstration purposes

  const filterURL = filterKey ? `category=${filterKey}` : '';

  const { data } = await productsApi.get<Product[]>(`/products?${filterURL}`);
  return data;
}