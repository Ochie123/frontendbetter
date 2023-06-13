import { useQuery, useQueryClient } from "react-query";
import { loadWatchlists } from '../../../src/data/api/api'
//import useDoThing from "./api/useDoThing";
//import useUndoThing from "./api/useUndoThing";
import useCurrentWatchlist from "./useCurrentWatchlist";


function useThisWatchlist(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadWatchlists);
  const onSuccess = ({ id, images=[]}) =>
    queryClient.setQueryData("results", (oldWatchlists) =>
      oldWatchlists.map((oldWatchlist) =>
        oldWatchlist.id !== id ? oldWatchlist : { id}
      )
    );

  const seeWatchlist = useCurrentWatchlist((state) => state.seeWatchlist);
  return {
    result: data?.results.find((w) => w.id === id),
    seeWatchlist: () => seeWatchlist(id),
  };
}

export default useThisWatchlist;

