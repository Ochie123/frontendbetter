import useCurrentCategory from "./useCurrentCategory";

function useHasCurrentCategory() {
  return useCurrentCategory((state) => !!state.currentId);
}

export default useHasCurrentCategory;
