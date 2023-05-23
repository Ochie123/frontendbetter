import { useQuery, useQueryClient } from "react-query";
import { loadImage } from '../../../src/data/api/api'
import useCurrentImage from "./useCurrentImage";

function useThatImage() {
  const id = useCurrentImage((state) => state.currentId);
  const seeAllImages = useCurrentImage((state) => state.seeAllImages);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("images");
  const partialImage = data.images.find((i) => i.id === id);
  const placeholderData = {
    ...partialImage,
    overview: "...",

  };
  const { data: image } = useQuery(
    ["currentImage", { id }],
    () => loadImage(id),
    { placeholderData }
  );

  return {
    image,
    seeAllImages,
  };
}

export default useThatImage;
