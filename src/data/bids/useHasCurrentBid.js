import useCurrentBid from "./useCurrentBid";

function useHasCurrentBid() {
  return useCurrentBid((state) => !!state.currentId);
}

export default useHasCurrentBid;
