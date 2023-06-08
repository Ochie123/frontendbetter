import { useQuery } from "react-query";
import { loadAuctions } from '../../../src/data/api/api'

function useAllAuctions() {
  const { data = { results: [] }} = useQuery("results", loadAuctions);
  
  //console.log(data)
 
  return (data.results ?? []).map(({ uuid }) => uuid);
}

export default useAllAuctions;