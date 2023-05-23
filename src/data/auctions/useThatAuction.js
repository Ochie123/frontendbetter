import { useQuery, useQueryClient } from "react-query";
import { loadAuction } from '../../../src/data/api/api'
import useCurrentAuction from "./useCurrentAuction";

function useThatAuction() {
  const id = useCurrentAuction((state) => state.currentId);
  const seeAllAuctions = useCurrentAuction((state) => state.seeAllAuctions);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("auctions");
  const partialAuction = data.results.find((a) => a.id === id);
  const placeholderData = {
    ...partialAuction,
    overview: "...",

  };
  const { data: auction } = useQuery(
    ["currentAuction", { id }],
    () => loadAuction(id),
    { placeholderData }
  );

  return {
    auction,
    seeAllAuctions,
  };
}

export default useThatAuction;
