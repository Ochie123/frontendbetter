import useCurrentWatchlist from "./useCurrentWatchlist";

function useHasCurrentWatchlist() {
  return useCurrentWatchlist((state) => !!state.currentId);
}

export default useHasCurrentWatchlist;
