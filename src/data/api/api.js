const URLS = {

  USERS: "http://192.168.43.38:8000/apis/users/",
  USER: (id) => `http://192.168.43.38:8000/apis/users/${id}`,


  AUCTIONS: "http://192.168.43.38:8000/api/auctions/",
  AUCTION: (uuid) => `http://192.168.43.38:8000/api/auctions/${uuid}`,

  BIDS: "http://192.168.43.38:8000/api/bid/",
  BID: (id) => `http://192.168.43.38:8000/api/bid/${id}`,

  MAKES: "http://192.168.43.38:8000/api/make/",
  MAKE: (id) => `http://192.168.43.38:8000/api/make/${id}`,

  MODELS: "http://192.168.43.38:8000/api/model/",
  MODEL: (id) => `http://192.168.43.38:8000/api/model/${id}`,

  CATEGORIES: "http://192.168.43.38:8000/api/categories/",
  CATEGORY: (id) => `http://192.168.43.38:8000/api/categories/${id}`,
  
  COMMENTS: "http://192.168.43.38:8000/api/comment/",
  COMMENT: (id) => `http://192.168.43.38:8000/api/comment/${id}`,

  CARS_SPECIFICATIONS: "http://192.168.43.38:8000/api/car-specifications/",
  CARS_SPECIFICATION: (id) => `http://192.168.43.38:8000/api/car-specifications/${id}`,

  IMAGES: "http://192.168.43.38:8000/api/images/",
  IMAGE: (id) => `http://192.168.43.38:8000/api/images/${id}`,

  VOTES: "http://192.168.43.38:8000/api/votes/",
  VOTE: (id) => `http://192.168.43.38:8000/api/votes/${id}`,

 WATCHLISTS: "http://192.168.43.38:8000/api/watchlist/",
 WATCHLIST: (id) => `http://192.168.43.38:8000/api/watchlist/${id}`
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


const loadImages = () => get(URLS.IMAGES);
const loadImage = (id) => get(URLS.IMAGE(id));


const loadAuctions = () => get(URLS.AUCTIONS);
const loadAuction = (uuid) => get(URLS.AUCTION(uuid));

const loadBids = () => get(URLS.BIDS);
const loadBid = (id) => get(URLS.AUCTION(id));

const loadComments = () => get(URLS.COMMENTS);
const loadComment = (id) => get(URLS.COMMENT(id));

const loadCategories = () => get(URLS.CATEGORIES);
const loadCategory = (id) => get(URLS.CATEGORY(id));

const loadMakes = () => get(URLS.MAKES);
const loadMake = (id) => get(URLS.MAKE(id));

const loadVotes = () => get(URLS.VOTES);
const loadVote = (id) => get(URLS.VOTE(id));

const loadWatchlists = () => get(URLS.WATCHLISTS);
const loadWatchlist = (id) => get(URLS.WATCHLIST(id));

const loadModels = () => get(URLS.MODELS);
const loadModel = (id) => get(URLS.MODEL(id));

const loadCars_Specifications = () => get(URLS.CARS_SPECIFICATIONS);
const loadCars_Specification = (id) => get(URLS.CARS_SPECIFICATIONS(id));

const loadUsers = () => get(URLS.USERS);
const loadUser = (id) => get(URLS.USER(id));

export {
 // getUser,

  loadCategories,
  loadCategory,
 

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

  loadAuction,
  loadAuctions,

  loadBid,
  loadBids,
  
  loadComments,
  loadComment,
 
  loadVotes,
  loadVote,

  loadWatchlists,
  loadWatchlist,

};
