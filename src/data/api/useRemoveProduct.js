import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

function useRemoveProduct(then) {
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries("products");
    queryClient.invalidateQueries("currentProduct");
    then();
  };
  const { mutate: removeProduct } = useMutation(API.removeProduct, { onSuccess });
  return removeProduct;
}

export default useRemoveProduct;
