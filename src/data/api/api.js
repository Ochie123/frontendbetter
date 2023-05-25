const URLS = {
  LOGIN: "http://127.0.0.1:8000/api-auth/login/",
  SIGNUP: "http://127.0.0.1:8000/api/v1/dj-rest-auth/registration/",
  LOGOUT: "http://127.0.0.1:8000/api-auth/logout/",
  //USER: "http://127.0.0.1:8000/api/v1/dj-rest-auth/user/",

  PRODUCTS: "http://127.0.0.1:8000/api/products/",
  PRODUCT: (uuid) => `http://127.0.0.1:8000/api/products/${uuid}`,

  USERS: "http://127.0.0.1:8000/apis/users/",
  USER: (id) => `http://127.0.0.1:8000/apis/users/${id}`,


  AUCTIONS: "http://127.0.0.1:8000/api/auctions/",
  AUCTION: (uuid) => `http://127.0.0.1:8000/api/auctions/${uuid}`,

  BIDS: "http://127.0.0.1:8000/api/bid/",
  BID: (id) => `http://127.0.0.1:8000/api/bid/${id}`,

  MAKES: "http://127.0.0.1:8000/api/make/",
  MAKE: (id) => `http://127.0.0.1:8000/api/make/${id}`,

  MODELS: "http://127.0.0.1:8000/api/model/",
  MODEL: (id) => `http://127.0.0.1:8000/api/model/${id}`,

  CATEGORIES: "http://127.0.0.1:8000/api/categories/",
  CATEGORY: (id) => `http://127.0.0.1:8000/api/categories/${id}`,
  
  COMMENTS: "http://127.0.0.1:8000/api/comment/",
  COMMENT: (id) => `http://127.0.0.1:8000/api/comment/${id}`,

  CARS_SPECIFICATIONS: "http://127.0.0.1:8000/api/car-specifications/",
  CARS_SPECIFICATION: (id) => `http://127.0.0.1:8000/api/car-specifications/${id}`,

  IMAGES: "http://127.0.0.1:8000/api/images/",
  IMAGE: (id) => `http://127.0.0.1:8000/api/images/${id}`,


};

const wrappedFetch = (...args) => {
  return fetch(...args).then((res) => {
    if (!res.ok) {
      throw new Error("Unauthorized");
    }
    return res.json();
  });
};

const get = (url) => wrappedFetch(url);
const post = (url, data) =>
  wrappedFetch(url, { method: "POST", body: data && JSON.stringify(data) });
const remove = (url) => wrappedFetch(url, { method: "DELETE" });

// USER API
//const getUser = () => get(URLS.USER);
const login = (data) => post(URLS.LOGIN, data);
const signup = (data) => post(URLS.SIGNUP, data);
const logout = () => get(URLS.LOGOUT);

// PRODUCT API
const loadProducts = () => get(URLS.PRODUCTS);
const loadProduct = (uuid) => get(URLS.PRODUCT(uuid));
const addProduct = (data) => post(URLS.PRODUCTS, data);
const removeProduct = (uuid) => remove(URLS.PRODUCT(uuid));

const loadImages = () => get(URLS.IMAGES);
const loadImage = (id) => get(URLS.IMAGE(id));
const addImage = (data) => post(URLS.IMAGES, data);
const removeImage = (id) => remove(URLS.IMAGE(id));


const loadAuctions = () => get(URLS.AUCTIONS);
const loadAuction = (uuid) => get(URLS.AUCTION(uuid));
const addAuction = (data) => post(URLS.AUCTIONS, data);
const removeAuction = (uuid) => remove(URLS.AUCTION(uuid));

const loadBids = () => get(URLS.BIDS);
const loadBid = (id) => get(URLS.AUCTION(id));
const addBid = (data) => post(URLS.BIDS, data);
const removeBid = (id) => remove(URLS.BID(id));

const loadComments = () => get(URLS.COMMENTS);
const loadComment = (id) => get(URLS.COMMENT(id));
const addComment = (data) => post(URLS.COMMENTS, data);
const removeComment = (id) => remove(URLS.COMMENT(id));

const loadCategories = () => get(URLS.CATEGORIES);
const loadCategory = (id) => get(URLS.CATEGORY(id));

const loadMakes = () => get(URLS.MAKES);
const loadMake = (id) => get(URLS.MAKE(id));


const loadModels = () => get(URLS.MODELS);
const loadModel = (id) => get(URLS.MODEL(id));

const loadCars_Specifications = () => get(URLS.CARS_SPECIFICATIONS);
const loadCars_Specification = (id) => get(URLS.CARS_SPECIFICATIONS(id));

const loadUsers = () => get(URLS.USERS);
const loadUser = (id) => get(URLS.USER(id));

export {
 // getUser,
  login,
  signup,
  logout,

  loadProducts,
  loadProduct,
  loadCategories,
  loadCategory,
  removeProduct,
  addProduct,


  loadMakes,
  loadMake,

  loadUsers,
  loadUser,

  loadModels,
  loadModel,
  
  loadCars_Specifications,
  loadCars_Specification,

  loadImage,
  loadImages,
  addImage,
  removeImage,

  loadAuction,
  loadAuctions,
  addAuction,
  removeAuction,

  loadBid,
  loadBids,
  addBid,
  removeBid,

  loadComments,
  loadComment,
  addComment,
  removeComment

};
