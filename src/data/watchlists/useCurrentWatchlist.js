import {create} from "zustand";

const useCurrentWatchlist = create((set) => ({
  currentId: null,
  seeWatchlist: (id) => set(() => ({ currentId: id })),
  seeAllWatchlists: () => set(() => ({ currentId: null })),
}));

export default useCurrentWatchlist;
