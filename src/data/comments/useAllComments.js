import { useQuery } from "react-query";
import { loadComments } from '../../../src/data/api/api'

function useAllComments() {
  const { data = { results: [] }} = useQuery("results", loadComments);
  console.log(data)
 
  return (data.results ?? []).map(({ id }) => id);
}

export default useAllComments;
