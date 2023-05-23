import { useQuery, useQueryClient } from "react-query";
import { loadMake } from '../../../src/data/api/api'
import useCurrentMake from "./useCurrentMake";

function useThatMake() {
  const id = useCurrentMake((state) => state.currentId);
  const seeAllMakes = useCurrentMake((state) => state.seeAllMakes);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("makes");
  const partialMake = data.makes.find((m) => m.id === id);
  const placeholderData = {
    ...partialMake,
    overview: "...",

  };
  const { data: make } = useQuery(
    ["currentMake", { id }],
    () => loadMake(id),
    { placeholderData }
  );

  return {
    make,
    seeAllMakes,
  };
}

export default useThatMake;
