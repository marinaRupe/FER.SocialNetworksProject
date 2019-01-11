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
    activeMovie: null,
    activeMovieStatus: null,
    genres: [],
    topMovies: {
      list: [],
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },
    recommendedMovies: {
      list: [],
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },
    foundMovies: {
      list: [],
      page: 1,
      totalPages: 1,
      totalResults: 0,
    },
  },
  reviews: {
    activeMovieReviews: {
      nyTimesReviews: [],
      tmdbReviews: [],
    },
  },
  cinemas: {
    list: [],
  },
  weather: {
    current: null,
  },
  app: {
    info: null,
  },
};
export default initialState;
