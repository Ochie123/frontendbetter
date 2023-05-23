import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

function useAddImage() {
  const queryClient = useQueryClient();
  const { mutate: addImage } = useMutation(API.addImage, {
    onMutate: (newData) => {
      queryClient.cancelQueries("images").then(() => {
        const oldValue = queryClient.getQueryData("images");
        const newImage = { ...newData, count: 0 };
        queryClient.setQueryData(["images"], (old) => [...old, newImage]);
        return { oldValue };
      });
    },
    onError: (error, data, { oldValue }) =>
      queryClient.setQueriesData("images", oldValue),
    onSettled: () => queryClient.invalidateQueries("images"),
  });
  return addImage;
}

export default useAddImage;
