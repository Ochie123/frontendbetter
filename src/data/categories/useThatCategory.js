import { useQuery, useQueryClient } from "react-query";
import { loadCategory } from '../../../src/data/api/api'
import useCurrentCategory from "./useCurrentCategory";

function useThatCategory() {
  const id = useCurrentCategory((state) => state.currentId);
  const seeAllCategories = useCurrentCategory((state) => state.seeAllCategories);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("categories");
  const partialCategory = data.categories.find((c) => c.id === id);
  const placeholderData = {
    ...partialCategory,
   

  };
  const { data: category } = useQuery(
    ["currentCategory", { id }],
    () => loadCategory(id),
    { placeholderData }
  );

  return {
   category,
    seeAllCategories,
  };
}

export default useThatCategory;
