import { useQuery, useQueryClient } from "react-query";
import { loadModel } from '../../../src/data/api/api'
import useCurrentModel from "./useCurrentModel";

function useThatModel() {
  const id = useCurrentModel((state) => state.currentId);
  const seeAllModels = useCurrentModel((state) => state.seeAllModels);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("models");
  const partialModel = data.models.find((d) => d.id === id);
  const placeholderData = {
    ...partialModel,
    overview: "...",

  };
  const { data: model } = useQuery(
    ["currentModel", { id }],
    () => loadModel(id),
    { placeholderData }
  );

  return {
    model,
    seeAllModels,
  };
}

export default useThatModel;
