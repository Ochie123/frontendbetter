import { useQuery } from "react-query";
import { loadBids } from '../../../src/data/api/api'

function useAllBids() {
  const { data = { results: [] }} = useQuery("results", loadBids);
  
  console.log(data)
 
  return (data.results ?? []).map(({ id }) => id);
}

export default useAllBids;
