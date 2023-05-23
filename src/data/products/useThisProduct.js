import { useQuery, useQueryClient } from "react-query";
import { loadProducts } from '../../../src/data/api/api'
//import useDoThing from "./api/useDoThing";
//import useUndoThing from "./api/useUndoThing";
import useCurrent from "./useCurrent";


function useThisProduct(uuid) {
  const queryClient = useQueryClient();
  const { data } = useQuery("results", loadProducts);
  const onSuccess = ({ name, images=[]}) =>
    queryClient.setQueryData("results", (oldProducts) =>
      oldProducts.map((oldProduct) =>
        oldProduct.uuid !== uuid ? oldProduct : { uuid, name, images}
      )
    );

  const seeProduct = useCurrent((state) => state.seeProduct);
  return {
    result: data?.results.find((p) => p.uuid === uuid),
    seeProduct: () => seeProduct(uuid),
  };
}

export default useThisProduct;

