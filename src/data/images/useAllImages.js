import { useQuery } from "react-query";
import { loadImages } from '../../../src/data/api/api'

function useAllImages() {
  const { data = { results: [] }} = useQuery("results", loadImages);
  console.log(data)
 
  return (data.results ?? []).map(({ id }) => id);
}

export default useAllImages;
