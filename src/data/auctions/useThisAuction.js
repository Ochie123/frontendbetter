import { useQuery, useQueryClient } from "react-query";
import { loadAuctions } from '../../../src/data/api/api'
//import useDoThing from "./api/useDoThing";
//import useUndoThing from "./api/useUndoThing";
import useCurrentAuction from "./useCurrentAuction";


function useThisAuction(uuid) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadAuctions);
  const onSuccess = ({ username}) =>
    queryClient.setQueryData("results", (oldAuctions) =>
      oldAuctions.map((oldAuction) =>
        oldAuction.uuid !== uuid ? oldAuction : { uuid, username}
      )
    );

  const seeAuction = useCurrentAuction((state) => state.seeAuction);
  return {
    auction: data?.results.find((p) => p.uuid === uuid),
    seeAuction: () => seeAuction(uuid),
  };
}

export default useThisAuction;

