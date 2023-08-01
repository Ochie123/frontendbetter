import { useQuery } from "react-query";
import { loadAuctions } from '../../../src/data/api/api'

function useAllAuctions() {
  const { data } = useQuery("", loadAuctions);
  console.log(data)
 
  return (data ?? []).map(({ uuid }) => uuid);
}

export default useAllAuctions;