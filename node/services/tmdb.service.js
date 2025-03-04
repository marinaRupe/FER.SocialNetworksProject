const axios = require('axios');
const MovieService = require('../services/movie.service');

const MOVIE_API_URL = 'https://api.themoviedb.org/3';
const DISCOVER_MOVIE_URL = '/discover/movie/';

const MOVIE_EXTERNAL_IDS = tmdbMovieId => `/movie/${tmdbMovieId}/external_ids`;
const MOVIE_ALTERNATIVE_TITLES = tmdbMovieId => `/movie/${tmdbMovieId}/alternative_titles`;
const MOVIE_KEYWORDS = tmdbMovieId => `/movie/${tmdbMovieId}/keywords`;
const MOVIE_VIDEOS = tmdbMovieId => `/movie/${tmdbMovieId}/videos`;
const MOVIE_TRANSLATIONS = tmdbMovieId => `/movie/${tmdbMovieId}/translations`;
const MOVIE_CREDITS = tmdbMovieId => `/movie/${tmdbMovieId}/credits`;

const MOVIE_REVIEWS_URL = tmdbMovieId => `/movie/${tmdbMovieId}/reviews`;
const PERSON_DETAILS_URL = personId => `/person/${personId}`;

const TMDB_IMAGES_URL = 'https://image.tmdb.org/t/p/';
const YOUTUBE_VIDEOS_URL = 'https://www.youtube.com/watch';

const getMovieReviews = async tmdbMovieId => {
  const response = axios.get(`${MOVIE_API_URL}${MOVIE_REVIEWS_URL(tmdbMovieId)}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY2,
      'page': 1,
      'language': 'en-US',
    },
  });

  return response;
};

const getPersonDetails = async personId => {
  const response = axios.get(`${MOVIE_API_URL}${PERSON_DETAILS_URL(personId)}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY2,
      'page': 1,
      'language': 'en-US',
    },
  });

  return response;
};

const getMovieDetails = async tmdbMovieId => {
  const response = axios.get(`${MOVIE_API_URL}/movie/${tmdbMovieId}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY,
      // 'append_to_response': 'credits,external_ids,alternative_titles,keywords,videos,translations',
    },
  });

  return response;
};

const getDetailedMovies = async movieList => {
  console.info('Fetching movie details...');
  const movies = [];
  for (const movie of movieList) {
    if (await MovieService.existsMovieWithTmdbID(movie.id)) {
      const movieWithDetails = await MovieService.getMovieWithTmdbID(movie.id);
      movies.push(movieWithDetails.toObject());
    } else {
      const movieWithDetailsResponse = await getMovieDetails(movie.id);

      if (movieWithDetailsResponse.status === 200) {
        const movieWithDetails = await mapMovie(movieWithDetailsResponse.data);
        movies.push(movieWithDetails);
      } else {
        console.error(movieWithDetailsResponse.message);
      }
    }
  }

  return movies;
};

const getMostPopularMovies = (page = 1) => {
  console.info('Fetching most popular movies...');
  const response = axios.get(`${MOVIE_API_URL}${DISCOVER_MOVIE_URL}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY,
      'sort_by': 'popularity.desc',
      page,
    },
  });

  return response;
};

const getMostRatedMovies = (page = 1) => {
  const response = axios.get(`${MOVIE_API_URL}${DISCOVER_MOVIE_URL}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY,
      'sort_by': 'vote_average.desc',
      page,
    },
  });

  return response;
};

const saveMovieList = async movies => {
  console.info('Saving movies...');

  for (const movie of movies) {
    if (!(await MovieService.existsMovieWithImdbID(movie.imdbID))) {
      await MovieService.saveMovie(movie);
      console.info(`The movie with imdb ID ${movie.imdbID} is saved!`);
    }
  }
};

const mapMovieList = movieList => {
  const movies = [];

  for (const movie of movieList) {
    const newMovie = mapMovie(movie);

    movies.push(newMovie);
  }

  return movies;
};

const getMovieExternalIds = tmdbMovieId => {
  const response = axios.get(`${MOVIE_API_URL}${MOVIE_EXTERNAL_IDS(tmdbMovieId)}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY2,
    },
  });

  return response;
};

const getMovieAlternativeTitles = tmdbMovieId => {
  const response = axios.get(`${MOVIE_API_URL}${MOVIE_ALTERNATIVE_TITLES(tmdbMovieId)}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY3,
    },
  });

  return response;
};

const getMovieKeywords = tmdbMovieId => {
  const response = axios.get(`${MOVIE_API_URL}${MOVIE_KEYWORDS(tmdbMovieId)}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY2,
    },
  });

  return response;
};

const getMovieVideos = tmdbMovieId => {
  const response = axios.get(`${MOVIE_API_URL}${MOVIE_VIDEOS(tmdbMovieId)}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY3,
    },
  });

  return response;
};

const getMovieTranslations = tmdbMovieId => {
  const response = axios.get(`${MOVIE_API_URL}${MOVIE_TRANSLATIONS(tmdbMovieId)}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY2,
    },
  });

  return response;
};

const getMovieCredits = tmdbMovieId => {
  const response = axios.get(`${MOVIE_API_URL}${MOVIE_CREDITS(tmdbMovieId)}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY3,
    },
  });

  return response;
};

const fetchMovies = (page = 1) => {
  console.info('Fetching movies...');
  const response = axios.get(`${MOVIE_API_URL}${DISCOVER_MOVIE_URL}`, {
    params: {
      'api_key': process.env.TMDB_API_KEY,
      'sort_by': 'release_date.desc',
      'release_date.lte': '2017-09-10',
      page,
    },
  });

  return response;
};

const mapMovie = async movie => {
  const defaultPosterSize = 'w500';
  const movieTmdbId = movie.id;

  if (!movie.imdb_id) {
    console.info('No IMDb ID for movie with TMDB ID = ' + movie.id);
    return movie;
  }

  const externalIds = (await getMovieExternalIds(movieTmdbId)).data || {};
  const alternativeTitles = (await getMovieAlternativeTitles(movieTmdbId)).data || {};
  const keywords = (await getMovieKeywords(movieTmdbId)).data || {};
  const videos = (await getMovieVideos(movieTmdbId)).data || {};
  const translations = (await getMovieTranslations(movieTmdbId)).data || {};
  const credits = (await getMovieCredits(movieTmdbId)).data || {};

  const genders = ['unknown', 'female', 'male'];

  const newMovie = {
    imdbID: movie.imdb_id,
    tmdbID: movie.id,
    facebookID: externalIds.facebook_id || null,
    twitterID: externalIds.twitter_id || null,
    title: movie.title,
    alternativeTitles: (alternativeTitles.titles || []).map(t => t.title),
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
    releaseDate: movie.release_date || null,
    plot: movie.overview || null,
    genres: (movie.genres || []).map(genre => genre.name.trim().toLowerCase()),
    keywords: (keywords.keywords || []).map(k => k.name),

    poster: movie.poster_path ? `${TMDB_IMAGES_URL}${defaultPosterSize}${movie.poster_path}` : null,
    videos: (videos.results || []).filter(v => v.site === 'YouTube').map(v => ({
      name: v.name,
      key: v.key,
      url: `${YOUTUBE_VIDEOS_URL}?v=${v.key}`,
    })),
    website: movie.homepage || null,

    cast: (credits.cast || []).map(c => ({
      cast_id: c.cast_id,
      credit_id: c.credit_id,
      personId: c.id,
      name: c.name,
      characterName: c.character,
      gender: genders[c.gender],
      order: c.order,
      profileImage: c.profile_path ? `${TMDB_IMAGES_URL}${defaultPosterSize}${c.profile_path}` : null,
    })),

    crew: (credits.crew || []).map(c => ({
      credit_id: c.credit_id,
      personId: c.id,
      name: c.name,
      gender: genders[c.gender],
      profileImage: c.profile_path ? `${TMDB_IMAGES_URL}${defaultPosterSize}${c.profile_path}` : null,
      department: c.department,
      job: c.job,
    })),

    runtime: movie.runtime ? `${movie.runtime} min` : null,
    budget: movie.budget || null,
    revenue: movie.revenue || null,
    productionCompanies: (movie.production_companies || []).map(company => company.name),
    productionCountries: (movie.production_countries || []).map(country => country.iso_3166_1),

    languages: (movie.spoken_languages || []).map(lang => lang.iso_639_1),
    translations: (translations.translations || []).map(t => `${t.iso_639_1}-${t.iso_3166_1}`),

    tmdbPopularity: movie.popularity || null,
    tmdbVoteAverage: movie.vote_average || null,
    tmdbVoteCount: movie.vote_count || null,

    adult: movie.adult,
  };

  return newMovie;
};

module.exports = {
  getMovieDetails,
  getDetailedMovies,
  getMostPopularMovies,
  getMostRatedMovies,
  mapMovieList,
  mapMovie,
  saveMovieList,
  fetchMovies,
  getMovieReviews,
  getPersonDetails,
};
