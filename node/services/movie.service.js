const Movie = require('../models/movie.model');
const defaultValues = require('../constants/defaultValues.constants');
const UserService = require('../services/user.service');
const YtsService = require('../services/yts.service');
const existsMovieWithImdbID = async imdbID => (await Movie.countDocuments({ imdbID })) > 0;

const existsMovieWithTmdbID = async tmdbID => (await Movie.countDocuments({ tmdbID })) > 0;

const getMovieWithImdbID = async imdbID => (await Movie.findOne({ imdbID }).exec());

const getMovieWithTmdbID = async tmdbID => (await Movie.findOne({ tmdbID }).exec());

const getMoviesByPopularity = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, filter) => {
  if (!filter) {
    filter = {
      'tmdbPopularity': { '$nin': [null] },
    };
  }

  return (await Movie.find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ 'tmdbPopularity' : 'desc' })
    .exec()
  );
};

const getMoviesByImdbRating = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, filter) => {
  if (!filter) {
    filter = {
      'imdbRating': { '$nin': [null, 'N/A'] },
    };
  }

  return (await Movie.find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ 'imdbRating' : 'desc' })
    .exec()
  );
};

const getMoviesByReleaseDate = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE) => (await Movie.find()
  .skip((page - 1) * pageSize)
  .limit(pageSize)
  .sort({ 'releaseDate' : 'desc' })
  .exec()
);

const getMoviesByFilter = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE, filter) =>
  (await Movie.find(filter)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .sort({ 'tmdbPopularity' : 'desc' })
    .exec()
  );

const getMoviesWithNoOmdbData = async (page, pageSize = defaultValues.DEFAULT_PAGE_SIZE) =>
  (await Movie.find({ 'awards': null })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec()
  );

const getMoviesCount = async (filter = {}) => (await Movie.countDocuments(filter));

const saveMovie = async movie => {
  const newMovie = new Movie({
    ...movie,
  });

  await newMovie.save();
};

const updateMovie = async movie => {
  await Movie.findByIdAndUpdate(movie._id, { $set: movie });
};

const saveMovieList = async movies => {
  console.info('Saving movies...');

  for (const movie of movies) {
    if (!(await existsMovieWithImdbID(movie.imdbID))) {
      try {
        await saveMovie(movie);
        console.info(`The movie with imdb ID ${movie.imdbID} is saved (tmdbID: ${movie.tmdbID})!`);
      } catch (err) {
        console.info(`The movie with imdb ID ${movie.imdbID} is NOT saved (tmdbID: ${movie.tmdbID})!`);
        console.info(err.message);
      }
    } else {
      try {
        await updateMovie(movie);
        console.info(`The movie with imdb ID ${movie.imdbID} is updated (tmdbID: ${movie.tmdbID})!`);
      } catch (err) {
        console.info(`The movie with imdb ID ${movie.imdbID} is NOT updated (tmdbID: ${movie.tmdbID})!`);
        console.info(err.message);
      }
    }
  }
};

const getMovieListByIds = async (moviesIds) =>{
  const movies = await Movie
    .find({imdbID: { $in: moviesIds }})
    .exec();

  return movies;
};

const findTop3GenresForMovies = (movies) =>{
  const genres_count_for_movies = {};
  movies.forEach((movie) => {
    movie.genres.forEach((genre)=>{
      genres_count_for_movies[genre] = (genres_count_for_movies[genre]+1) || 1 ;
    });
  });

  const sorted_genres_for_movies = [];
  for (const genre in genres_count_for_movies) {
    sorted_genres_for_movies.push([genre, genres_count_for_movies[genre]]);
  }

  sorted_genres_for_movies.sort((a, b) => {
    return a[1] - b[1];
  });

  return sorted_genres_for_movies.slice(-3);
};

const makeFilter = async (gender, age, userID) =>{
  const user = await UserService.findByUserID(userID);
  const preferred_genres = await UserService.getPreferredGenres(userID);
  const userMoviesLists = await UserService.getUserMovieLists(userID);
  const savedMovies = await getMovieListByIds(userMoviesLists.userMovies.savedMovies);
  const watchedMovies = await getMovieListByIds(userMoviesLists.userMovies.watchedMovies);

  const likes_names = [];
  user.likedPages.pages.forEach((element) => {
    likes_names.push(element.name);
  });

  const genres_points = {};

  //give points to preferred genres
  if (preferred_genres){
    preferred_genres.forEach((genre) => {
      genres_points[genre] = 7;
    });
  }


  //find top 3 genres for saved movies and give points
  let points = 1;
  if (userMoviesLists.userMovies.savedMovies.length >0){
    const top_3_genres_for_saved_movies = findTop3GenresForMovies(savedMovies);
    top_3_genres_for_saved_movies.forEach((element) => {
      genres_points[element[0]] = (genres_points[element[0]]+points) || points ;
      points ++;
    });
  }

  //find top 3 genres for watched movies and give points
  points = 1;
  if (userMoviesLists.userMovies.watchedMovies.length >0){
    const top_3_genres_for_watched_movies = findTop3GenresForMovies(watchedMovies);
    top_3_genres_for_watched_movies.forEach((element) => {
      genres_points[element[0]] = (genres_points[element[0]]+points) || points ;
      points ++;
    });
  }

  const filter = {};
  //find top 3 genres for rated movies and give points
  const max_score_movies = [], ratedMovies=[], ytsRecommendedMovies=[], maxScoreMovies=[];
  if (userMoviesLists.userMovies.ratedMovies.length >0){
    let sum = 0;
    userMoviesLists.userMovies.ratedMovies.forEach((movie) => {
      sum += movie.score;
    });

    const avg = sum/userMoviesLists.userMovies.ratedMovies.length;
    const avg_rated_movies = [];
    userMoviesLists.userMovies.ratedMovies.forEach((movie) => {
      if (movie.score >= avg){
        avg_rated_movies.push(movie.movieId);
      }
      if (movie.score == 5){
        max_score_movies.push(movie.movieId);
      }
    });
    const ratedMovies = await getMovieListByIds(avg_rated_movies);
    const top_3_genres_for_rated_movies = findTop3GenresForMovies(ratedMovies);
    points = 2;
    top_3_genres_for_rated_movies.forEach((element) => {
      genres_points[element[0]] = (genres_points[element[0]]+points) || points ;
      points ++;
    });

    //get yts suggestions for top avg_rated_movies
    const ytsRecommendedMovies = await YtsService.getRecommendedMoviesForMovieImdbIDsList(ratedMovies.slice(-3).map(m => m.imdbID));

    filter['imdbID'] = {'$in': ytsRecommendedMovies.map(m => m.imdb_code)};

    //get movies with score 5
    const maxScoreMovies = await getMovieListByIds(max_score_movies);

    filter['title'] = (maxScoreMovies.map(m => m.title).concat(likes_names)).map(x => new RegExp(x, 'gi'));
  }
  //calculate top 3 genres
  const sorted_genres = [];
  for (const genre in genres_points) {
    sorted_genres.push([genre, genres_points[genre]]);
  }

  sorted_genres.sort((a, b) => {
    return a[1] - b[1];
  });

  if (sorted_genres.length > 0){
    filter['genres'] = {'$in': sorted_genres.slice(-3).map(m => m[0])};
  }

  console.log(filter['genres']);

  if (Object.keys(filter).length == 0){
    return {};
  }

  const orFilter = { '$or': [
    { 'genres': filter['genres'] },
    { 'title': filter['title'] },
    { 'imdbID': filter['imdbID']}
  ]};

  return {...orFilter, 'imdbRating': { '$nin': [null, 'N/A'] }};
};

const findMovies = async (parameters, page = 1, pageSize = defaultValues.DEFAULT_PAGE_SIZE) => {
  const { text, fromDate, toDate, genres } = parameters;

  const filter = {
    $or: [
      { genres: { $regex: `^${text}`, $options: 'i' } },
      { keywords: { $regex: `^${text}`, $options: 'i' } },
      { alternativeTitles: { $regex: `^${text}`, $options: 'i' } },
      { $text: { $search: text } },
    ],
  };

  if (!!fromDate && !!toDate) {
    filter.releaseDate = { $gte: fromDate, $lte: toDate };
  } else if (fromDate) {
    filter.releaseDate = { $gte: fromDate };
  } else if (toDate) {
    filter.releaseDate = { $lte: toDate };
  }

  if (genres && genres.length > 0) {
    filter.genres = { $in: genres };
  }

  const count = await Movie.countDocuments(filter);

  const movies = await Movie
    .find(filter, { textScore: { $meta: 'textScore' } })
    .sort({ textScore: { $meta: 'textScore' }, tmdbPopularity: 'desc' })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return {
    pagesCount: Math.min(Math.ceil(count / pageSize), 10),
    movies,
  };
};

const getAllGenres = async () => ((await Movie.aggregate([
  { $unwind: '$genres' },
  { $group: { _id: 0, genres: { $addToSet: '$genres' } } },
]).exec())[0] || {}).genres || [];

module.exports = {
  existsMovieWithImdbID,
  existsMovieWithTmdbID,
  getMovieWithImdbID,
  getMovieWithTmdbID,
  saveMovie,
  saveMovieList,
  updateMovie,
  getMoviesByPopularity,
  getMoviesByImdbRating,
  getMoviesByReleaseDate,
  getMoviesWithNoOmdbData,
  getMoviesCount,
  getMoviesByFilter,
  findMovies,
  getAllGenres,
  getMovieListByIds,
  makeFilter,
};
