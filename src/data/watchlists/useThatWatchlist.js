import { useQuery, useQueryClient } from "react-query";
import { loadWatchlist } from '../../../src/data/api/api'
import useCurrentWatchlist from "./useCurrentWatchlist";

function useThatWatchlist() {
  const id = useCurrentWatchlist((state) => state.currentId);
  const seeAllWatchlists = useCurrentWatchlist((state) => state.seeAllWatchlists);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("watchlists");
  const partialWatchlist = data.watchlists.find((w) => w.id === id);
  const placeholderData = {
    ...partialWatchlist,
   

  };
  const { data: watchlist } = useQuery(
    ["currentWatchlist", { id }],
    () => loadWatchlist(id),
    { placeholderData }
  );

  return {
    watchlist,
    seeAllWatchlists,
  };
}

export default useThatWatchlist;
