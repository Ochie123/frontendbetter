import useCurrentImage from "./useCurrentImage";

function useHasCurrentImage() {
  return useCurrentImage((state) => !!state.currentId);
}

export default useHasCurrentImage;
