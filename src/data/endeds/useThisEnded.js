import { useQuery, useQueryClient } from "react-query";
import { loadEndeds } from '../../../src/data/api/api'
import useCurrentEnded from "./useCurrentEnded";


function useThisEnded(uuid) {
  const queryClient = useQueryClient();
  const { data } = useQuery("", loadEndeds);
  const onSuccess = ({ username}) =>
    queryClient.setQueryData("", (oldEndeds) =>
      oldEndeds.map((oldEnded) =>
        oldEnded.uuid !== uuid ? oldEnded : { uuid, username}
      )
    );

  const seeEnded = useCurrentEnded((state) => state.seeEnded);
  return {
    ended: data?.find((e) => e.uuid === uuid),
    seeEnded: () => seeEnded(uuid),
  };
}

export default useThisEnded;

