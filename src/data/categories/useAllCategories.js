import { useQuery } from "react-query";
import { loadCategories } from '../../../src/data/api/api'

function useAllCategories() {
  const { data = { results: [] }} = useQuery("categories", loadCategories);

  console.log(data)

 
  return (data.results ?? []).map(({ id }) => id);
}

export default useAllCategories;
