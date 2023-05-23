import { useQueryClient, useMutation } from "react-query";
import * as API from "./api";

function useAddProduct() {
  const queryClient = useQueryClient();
  const { mutate: addProduct } = useMutation(API.addProduct, {
    onMutate: (newData) => {
      queryClient.cancelQueries("products").then(() => {
        const oldValue = queryClient.getQueryData("products");
        const newProduct = { ...newData, count: 0 };
        queryClient.setQueryData(["products"], (old) => [...old, newProduct]);
        return { oldValue };
      });
    },
    onError: (error, data, { oldValue }) =>
      queryClient.setQueriesData("products", oldValue),
    onSettled: () => queryClient.invalidateQueries("products"),
  });
  return addProduct;
}

export default useAddProduct;
