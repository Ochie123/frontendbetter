import { useQuery, useQueryClient } from "react-query";
import { loadAlls } from '../../../src/data/api/api'
import useCurrentAll from "./useCurrentAll";


function useThisAll(uuid) {
  const queryClient = useQueryClient();
  const { data } = useQuery("", loadAlls);
  const onSuccess = ({ username}) =>
    queryClient.setQueryData("", (oldAlls) =>
      oldAlls.map((oldAll) =>
        oldAll.uuid !== uuid ? oldAll : { uuid, username}
      )
    );

  const seeAll = useCurrentAll((state) => state.seeAll);
  return {
    ended: data?.find((e) => e.uuid === uuid),
    seeAll: () => seeAll(uuid),
  };
}

export default useThisAll;

