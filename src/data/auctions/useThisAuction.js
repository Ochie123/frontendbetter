import { useQuery, useQueryClient } from "react-query";
import { loadAuctions } from '../../../src/data/api/api';
import useCurrentAuction from "./useCurrentAuction";

function useThisAuction(uuid) {
  const queryClient = useQueryClient();
  const { data = { results: [] } } = useQuery("auctions", loadAuctions);

  const onSuccess = ({ username }) =>
    queryClient.setQueryData("auctions", (oldData) => ({
      ...oldData,
      results: oldData.results.map((oldAuction) =>
        oldAuction.uuid !== uuid ? oldAuction : { ...oldAuction, uuid, username }
      ),
    }));

  const seeAuction = useCurrentAuction((state) => state.seeAuction);
  return {
    auction: data.results.find((p) => p.uuid === uuid),
    seeAuction: () => seeAuction(uuid),
  };
}

export default useThisAuction;
