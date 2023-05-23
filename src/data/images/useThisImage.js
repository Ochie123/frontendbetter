import { useQuery, useQueryClient } from "react-query";
import { loadImages } from '../../../src/data/api/api'

import useCurrentImage from "./useCurrentImage";


function useThisImage(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadImages);
  const onSuccess = ({ image }) =>
    queryClient.setQueryData("results", (oldImages) =>
      oldImages.map((oldImage) =>
        oldImage.id !== id ? oldImage : {id, image}
      )
    );

  const seeImage = useCurrentImage((state) => state.seeImage);
  return {
    result: data?.results.find((i) => i.id === id),
    seeImage: () => seeImage(id),
  };
}

export default useThisImage;

