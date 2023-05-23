import { useQuery } from "react-query";
import { loadModels } from '../../../src/data/api/api'

function useAllModels() {
  const { data = { results: [] }} = useQuery("models", loadModels);
  console.log(data)
 
  return (data.results ?? []).map(({ id }) => id);
}

export default useAllModels;
