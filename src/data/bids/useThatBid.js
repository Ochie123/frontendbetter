import { useQuery, useQueryClient } from "react-query";
import { loadBid } from '../../../src/data/api/api'
import useCurrentBid from "./useCurrentBid";

function useThatBid() {
  const id = useCurrentBid((state) => state.currentId);
  const seeAllBids = useCurrentBid((state) => state.seeAllBids);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("bids");
  const partialBid = data.bids.find((b) => b.id === id);
  const placeholderData = {
    ...partialBid,
   

  };
  const { data: bid } = useQuery(
    ["currentBid", { id }],
    () => loadBid(id),
    { placeholderData }
  );

  return {
   bid,
    seeAllBids,
  };
}

export default useThatBid;
