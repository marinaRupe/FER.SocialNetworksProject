const initialState = {
  users: {
    loggedIn: false,
    currentUser: null,
  },
  movies: {
    list: [],
    page: 1,
    totalPages: 1,
    totalResults: 0,
    currentMovie: null
  },
};

export default initialState;