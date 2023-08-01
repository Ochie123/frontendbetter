import {create} from "zustand";

const useCurrentAll = create((set) => ({
  currentId: null,
  seeAll: (uuid) => set(() => ({ currentId: uuid })),
  seeAllAlls: () => set(() => ({ currentId: null })),
}));

export default useCurrentAll;
