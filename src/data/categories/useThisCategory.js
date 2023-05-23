import { useQuery, useQueryClient } from "react-query";
import { loadCategories } from '../../../src/data/api/api'
//import useDoThing from "./api/useDoThing";
//import useUndoThing from "./api/useUndoThing";
import useCurrentCategory from "./useCurrentCategory";


function useThisCategory(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadCategories);
  const onSuccess = ({ title}) =>
    queryClient.setQueryData("results", (oldCategories) =>
      oldCategories.map((oldCategory) =>
        oldCategory.id !== id ? oldCategory : { id, title }
      )
    );

  const seeCategory = useCurrentCategory((state) => state.seeCategory);
  return {
    category: data?.results?.find((c) => c.id === id),
    seeCategory: () => seeCategory(id),
  };
}

export default useThisCategory;

