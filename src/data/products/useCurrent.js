import {create} from "zustand";

const useCurrent = create((set) => ({
  currentId: null,
  seeProduct: (uuid) => set(() => ({ currentId: uuid })),
  seeAllProducts: () => set(() => ({ currentId: null })),
}));

export default useCurrent;
