import useCurrentAuction from "./useCurrentAuction";

function useHasCurrentAuction() {
  return useCurrentAuction((state) => !!state.currentId);
}

export default useHasCurrentAuction;
