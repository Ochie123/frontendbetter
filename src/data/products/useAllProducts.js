import { useQuery } from "react-query";
import { loadProducts } from '../../../src/data/api/api'

function useAllProducts() {
  const { data = { results: [] }} = useQuery("results", loadProducts);
  //console.log(data)
 
  return (data.results ?? []).map(({ uuid }) => uuid);
}

export default useAllProducts;
