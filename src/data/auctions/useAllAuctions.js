import { useQuery } from "react-query";
import { loadAuctions } from '../../../src/data/api/api';

function useAllAuctions() {
  const { data } = useQuery("auctions", loadAuctions);
  console.log(data);
  
  // Check if data is not null and has results key
  const auctionResults = data?.results ?? [];
  
  return auctionResults.map(({ uuid }) => uuid);
}

export default useAllAuctions;
