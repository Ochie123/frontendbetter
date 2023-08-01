import {create} from "zustand";

const useCurrentEnded = create((set) => ({
  currentId: null,
  seeEnded: (uuid) => set(() => ({ currentId: uuid })),
  seeAllEndeds: () => set(() => ({ currentId: null })),
}));

export default useCurrentEnded;
