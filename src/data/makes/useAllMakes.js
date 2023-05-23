import { useQuery } from "react-query";
import { loadMakes } from '../../../src/data/api/api'

function useAllMakes() {
  const { data = { results: [] }} = useQuery("makes", loadMakes);
  console.log(data)
 
  return (data.results ?? []).map(({ id }) => id);
}

export default useAllMakes;
