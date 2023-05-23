import {create} from "zustand";

const useCurrentMake = create((set) => ({
  currentId: null,
  seeMake: (id) => set(() => ({ currentId: id })),
  seeAllMakes: () => set(() => ({ currentId: null })),
}));

export default useCurrentMake;
