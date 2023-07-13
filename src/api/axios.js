import axios from 'axios';

/*create an instance of axios with a default base URI when sending HTTP requests*/
/*JSON Server has CORS Policy by default*/
const api = axios.create({
  baseURL: 'https://cars-bids.online/',
});

export default api;

export const EndPoints = {
  sales: 'sales',
  results: 'https://cars-bids.online/api/auctions/',
  login: 'https://cars-bids.online/apis/auth/login/',
  register: 'https://cars-bids.online/apis/auth/register/',
  users: 'https://cars-bids.online/apis/users/',
  usersDb: 'users-db',
  //usersDb: `http://127.0.0.1:8000/apis/user/${id}`,
};
