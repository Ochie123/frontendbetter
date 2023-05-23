import { useQuery, useQueryClient } from "react-query";
import { loadComment } from '../../../src/data/api/api'
import useCurrentComment from "./useCurrentComment";

function useThatComment() {
  const id = useCurrentComment((state) => state.currentId);
  const seeAllComments = useCurrentComment((state) => state.seeAllComments);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("comments");
  const partialComment = data.comments.find((c) => c.id === id);
  const placeholderData = {
    ...partialComment,
    overview: "...",

  };
  const { data: comment } = useQuery(
    ["currentComment", { id }],
    () => loadComment(id),
    { placeholderData }
  );

  return {
    comment,
    seeAllComments,
  };
}

export default useThatComment;
