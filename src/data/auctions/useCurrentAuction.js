import {create} from "zustand";

const useCurrentAuction = create((set) => ({
  currentId: null,
  seeAuction: (uuid) => set(() => ({ currentId: uuid })),
  seeAllAuctions: () => set(() => ({ currentId: null })),
}));

export default useCurrentAuction;
