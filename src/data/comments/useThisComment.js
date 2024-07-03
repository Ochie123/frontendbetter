import { useQuery, useQueryClient } from "react-query";
import { loadComments } from '../../../src/data/api/api'

import useCurrentComment from "./useCurrentComment";


function useThisComment(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadComments);
  const onSuccess = ({ comment, user_comment, date, }) =>
    queryClient.setQueryData("results", (oldComments) =>
      oldComments.map((oldComment) =>
        oldComment.id !== id ? oldComment : {id, comment, user_comment, date,}
      )
    );

  const seeComment = useCurrentComment((state) => state.seeComment);
  return {
    result: data?.results?.find((c) => c.id === id),
    seeComment: () => seeComment(id),
  };
}

export default useThisComment;

