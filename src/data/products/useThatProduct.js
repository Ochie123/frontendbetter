import { useQuery, useQueryClient } from "react-query";
import { loadProduct } from '../../../src/data/api/api'
import useCurrent from "./useCurrent";

function useThatProduct() {
  const id = useCurrent((state) => state.currentId);
  const seeAllProducts = useCurrent((state) => state.seeAllProducts);

  // Find what we already know about this thing
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("products");
  const partialProduct = data.products.find((p) => p.id === id);
  const placeholderData = {
    ...partialProduct,
    overview: "...",

  };
  const { data: product } = useQuery(
    ["currentProduct", { id }],
    () => loadProduct(id),
    { placeholderData }
  );

  return {
    product,
    seeAllProducts,
  };
}

export default useThatProduct;
