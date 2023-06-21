const URLS = {

  USERS: "https://cars-bids.online/apis/users/",
  USER: (id) => `https://cars-bids.online/apis/users/${id}`,


  AUCTIONS: "https://cars-bids.online/api/auctions/",
  AUCTION: (uuid) => `https://cars-bids.online/api/auctions/${uuid}`,

  BIDS: "https://cars-bids.online/api/bid/",
  BID: (id) => `https://cars-bids.online/api/bid/${id}`,

  MAKES: "https://cars-bids.online/api/make/",
  MAKE: (id) => `https://cars-bids.online/api/make/${id}`,

  MODELS: "https://cars-bids.online/api/model/",
  MODEL: (id) => `https://cars-bids.online/api/model/${id}`,

  CATEGORIES: "https://cars-bids.online/api/categories/",
  CATEGORY: (id) => `https://cars-bids.online/api/categories/${id}`,
  
  COMMENTS: "https://cars-bids.online/api/comment/",
  COMMENT: (id) => `https://cars-bids.online/api/comment/${id}`,

  CARS_SPECIFICATIONS: "https://cars-bids.online/api/car-specifications/",
  CARS_SPECIFICATION: (id) => `https://cars-bids.online/api/car-specifications/${id}`,

  IMAGES: "https://cars-bids.online/api/images/",
  IMAGE: (id) => `https://cars-bids.online/api/images/${id}`,

  VOTES: "https://cars-bids.online/api/votes/",
  VOTE: (id) => `https://cars-bids.online/api/votes/${id}`,

  WATCHLISTS: "https://cars-bids.online/api/watchlist/",
  WATCHLIST: (id) => `https://cars-bids.online/api/watchlist/${id}`,

  AUCTIONS: "https://cars-bids.online/api/auctions/",
  AUCTION: (uuid) => `https://cars-bids.online/api/auctions/${uuid}`,

  RECENTLYVIEWEDS: "https://cars-bids.online/api/auctions/recently_viewed/",
  RECENTLYVIEWED: (uuid) => `https://cars-bids.online/api/auctions/${uuid}`,
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

const loadRecentlyViewedAuctions = () => get(URLS.RECENTLYVIEWEDS);

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

  loadRecentlyViewedAuctions,

  loadBid,
  loadBids,
  
  loadComments,
  loadComment,
 
  loadVotes,
  loadVote,

  loadWatchlists,
  loadWatchlist,

};
