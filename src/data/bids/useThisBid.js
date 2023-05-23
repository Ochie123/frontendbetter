import { useQuery, useQueryClient } from "react-query";
import { loadBids } from '../../../src/data/api/api'
//import useDoThing from "./api/useDoThing";
//import useUndoThing from "./api/useUndoThing";
import useCurrentBid from "./useCurrentBid";


function useThisBid(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadBids);
  const onSuccess = ({ name, images=[]}) =>
    queryClient.setQueryData("results", (oldBids) =>
      oldBids.map((oldBid) =>
        oldBid.id !== id ? oldBid : { id, name, images}
      )
    );

  const seeBid = useCurrentBid((state) => state.seeBid);
  return {
    result: data?.results.find((b) => b.id === id),
    seeBid: () => seeBid(id),
  };
}

export default useThisBid;

