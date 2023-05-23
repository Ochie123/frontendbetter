import useCurrentMake from "./useCurrentMake";

function useHasCurrentMake() {
  return useCurrentMake((state) => !!state.currentId);
}

export default useHasCurrentMake;
