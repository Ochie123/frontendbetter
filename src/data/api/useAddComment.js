import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

function useAddComment() {
  const queryClient = useQueryClient();
  const { mutate: addComment } = useMutation(API.addComment, {
    onMutate: (newData) => {
      queryClient.cancelQueries("comments").then(() => {
        const oldValue = queryClient.getQueryData("comments");
        const newComment = { ...newData, count: 0 };
        queryClient.setQueryData(["comments"], (old) => [...old, newComment]);
        return { oldValue };
      });
    },
    onError: (error, data, { oldValue }) =>
      queryClient.setQueriesData("comments", oldValue),
    onSettled: () => queryClient.invalidateQueries("comments"),
  });
  return addComment;
}

export default useAddComment;
