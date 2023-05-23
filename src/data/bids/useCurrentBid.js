import {create} from "zustand";

const useCurrentBid = create((set) => ({
  currentId: null,
  seeBid: (id) => set(() => ({ currentId: id })),
  seeAllBids: () => set(() => ({ currentId: null })),
}));

export default useCurrentBid;
