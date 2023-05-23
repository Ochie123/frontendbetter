import api, { EndPoints } from '../api/axios'
//import { ProductType } from 'models/product-type';

export async function getProductsAxios() {
  return await api.get(EndPoints.results);
}

export async function postAuctionAxios(result) {
  return await api.post(EndPoints.results, result);
}
