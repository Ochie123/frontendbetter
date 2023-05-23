import {create} from "zustand";

const useCurrentImage = create((set) => ({
  currentId: null,
  seeImage: (id) => set(() => ({ currentId: id })),
  seeAllImages: () => set(() => ({ currentId: null })),
}));

export default useCurrentImage;
