import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

function useAddAuction() {
  const queryClient = useQueryClient();
  const { mutate: addAuction } = useMutation(API.addAuction, {
    onMutate: (newData) => {
      queryClient.cancelQueries("auctions").then(() => {
        const oldValue = queryClient.getQueryData("auctions");
        const newAuction = { ...newData, count: 0 };
        queryClient.setQueryData(["auctions"], (old) => [...old, newAuction]);
        return { oldValue };
      });
    },
    onError: (error, data, { oldValue }) =>
      queryClient.setQueriesData("auctions", oldValue),
    onSettled: () => queryClient.invalidateQueries("auctions"),
  });
  return addAuction;
}

export default useAddAuction;
