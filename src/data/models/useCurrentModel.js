import {create} from "zustand";

const useCurrentModel = create((set) => ({
  currentId: null,
  seeModel: (id) => set(() => ({ currentId: id })),
  seeAllModels: () => set(() => ({ currentId: null })),
}));

export default useCurrentModel;
