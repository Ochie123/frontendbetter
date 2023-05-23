import useCurrentComment from "./useCurrentComment";

function useHasCurrentComment() {
  return useCurrentComment((state) => !!state.currentId);
}

export default useHasCurrentComment;
