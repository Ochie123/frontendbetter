import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

function useAddBid() {
  const queryClient = useQueryClient();
  const { mutate: addBid } = useMutation(API.addBid, {
    onMutate: (newData) => {
      queryClient.cancelQueries("bids").then(() => {
        const oldValue = queryClient.getQueryData("bids");
        const newBid = { ...newData, count: 0 };
        queryClient.setQueryData(["bids"], (old) => [...old, newBid]);
        return { oldValue };
      });
    },
    onError: (error, data, { oldValue }) =>
      queryClient.setQueriesData("bids", oldValue),
    onSettled: () => queryClient.invalidateQueries("bids"),
  });
  return addBid;
}

export default useAddBid;
