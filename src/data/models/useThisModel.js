import { useQuery, useQueryClient } from "react-query";
import { loadModels } from '../../../src/data/api/api'

import useCurrentModel from "./useCurrentModel";


function useThisModel(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadModels);
  const onSuccess = ({ model, date, }) =>
    queryClient.setQueryData("results", (oldModels) =>
      oldModels.map((oldModel) =>
        oldModel.id !== id ? oldModel : {id, model}
      )
    );

  const seeModel = useCurrentModel((state) => state.seeModel);
  return {
    result: data?.results.find((d) => d.id === id),
    seeModel: () => seeModel(id),
  };
}

export default useThisModel;

