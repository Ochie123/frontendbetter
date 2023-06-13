import { useQuery } from "react-query";
import { loadWatchlists } from '../../../src/data/api/api'

function useAllWatchlists() {
  const { data = { results: [] }} = useQuery("watchlists", loadWatchlists);
  
  //console.log(data)
 
  return (data.results ?? []).map(({ id }) => id);
}

export default useAllWatchlists;
