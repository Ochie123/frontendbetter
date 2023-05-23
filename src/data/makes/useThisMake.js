import { useQuery, useQueryClient } from "react-query";
import { loadMakes } from '../../../src/data/api/api'

import useCurrentMake from "./useCurrentMake";


function useThisMake(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadMakes);
  const onSuccess = ({ make, date, }) =>
    queryClient.setQueryData("results", (oldMakes) =>
      oldMakes.map((oldMake) =>
        oldMake.id !== id ? oldMake : {id, make}
      )
    );

  const seeMake = useCurrentMake((state) => state.seeMake);
  return {
    result: data?.results.find((m) => m.id === id),
    seeMake: () => seeMake(id),
  };
}

export default useThisMake;

