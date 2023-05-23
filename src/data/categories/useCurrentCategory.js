import {create} from "zustand";

const useCurrentCategory = create((set) => ({
  currentId: null,
  seeCategory: (id) => set(() => ({ currentId: id })),
  seeAllCategories: () => set(() => ({ currentId: null })),
}));

export default useCurrentCategory;
