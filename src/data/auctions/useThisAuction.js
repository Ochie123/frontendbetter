import { useQuery, useQueryClient } from "react-query";
import { loadAuctions } from '../../../src/data/api/api'
//import useDoThing from "./api/useDoThing";
//import useUndoThing from "./api/useUndoThing";
import useCurrentAuction from "./useCurrentAuction";


function useThisAuction(uuid) {
  const queryClient = useQueryClient();
  const { data } = useQuery("", loadAuctions);
  const onSuccess = ({ username}) =>
    queryClient.setQueryData("", (oldAuctions) =>
      oldAuctions.map((oldAuction) =>
        oldAuction.uuid !== uuid ? oldAuction : { uuid, username}
      )
    );

  const seeAuction = useCurrentAuction((state) => state.seeAuction);
  return {
    auction: data?.find((p) => p.uuid === uuid),
    seeAuction: () => seeAuction(uuid),
  };
}

export default useThisAuction;

