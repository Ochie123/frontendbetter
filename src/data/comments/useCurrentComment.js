import {create} from "zustand";

const useCurrentComment = create((set) => ({
  currentId: null,
  seeComment: (id) => set(() => ({ currentId: id })),
  seeAllComments: () => set(() => ({ currentId: null })),
}));

export default useCurrentComment;
