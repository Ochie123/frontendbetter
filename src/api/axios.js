import axios from 'axios';

/*create an instance of axios with a default base URI when sending HTTP requests*/
/*JSON Server has CORS Policy by default*/
const api = axios.create({
  baseURL: 'http://cars-bids.online/api/',
});

export default api;

export const EndPoints = {
  sales: 'sales',
  results: 'http://cars-bids.online/api/auctions/',
  login: 'http://cars-bids.online/apis/auth/login/',
  register: 'http://cars-bids.online/apis/auth/register/',
  users: 'http://cars-bids.online/apis/users/',
  usersDb: 'users-db',
  //usersDb: `http://127.0.0.1:8000/apis/user/${id}`,
};
