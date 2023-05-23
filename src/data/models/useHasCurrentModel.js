import useCurrentModel from "./useCurrentModel";

function useHasCurrentModel() {
  return useCurrentModel((state) => !!state.currentId);
}

export default useHasCurrentModel;
