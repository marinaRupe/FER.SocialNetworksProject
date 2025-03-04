import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APP } from '../../constants/routes';
import { DEFAULT_MOVIE_POSTER } from '../../constants/values';

class MovieListItem extends Component {
  render() {
    const { movie } = this.props;
    const stars = [];

    if (movie.score) {
      for (let i = 0; i < movie.score; i++) {
        stars.push(
          <div className='star-div'>
            <i className='material-icons'>star</i>
          </div>
        );
      }
    }

    const poster = !movie.poster || movie.poster === 'N/A' ? DEFAULT_MOVIE_POSTER : movie.poster;

    return (
      <div
        className='movie__list-item'
      >
        <Link to={APP.MOVIE.DETAILS(movie.imdbID)}>
          <img
            src={poster}
            alt=''
            className='movie__list-item__image--size-m'
            onClick={this.openMovieDetails}
          />
        </Link>
        <div className='movie__list-item__details'>
          <Link to={APP.MOVIE.DETAILS(movie.imdbID)}>
            <div className='movie__list-item__title'>{movie.title}</div>
          </Link>
          <Link to={APP.MOVIE.DETAILS(movie.imdbID)}>
            <div className='movie__list-item__description'>{movie.plot}</div>
          </Link>
          <div>
            Genres:&nbsp;
            <span>
              {movie.genres && movie.genres.length > 0
                ? movie.genres.reduce((acc, curr) => (`${acc}, ${curr}`))
                : 'unknown'
              }
            </span>
          </div>
          <div>
            <div className='rating-div'>
              IMDb rating: {
                ( movie.imdbRating && movie.imdbRating !== 'N/A') ? `${movie.imdbRating}/10` : 'unknown'}
            </div>
            {movie.score &&
              <div className='score-star-div'>
                <div className='score-div'>
                  Your rating:
                </div>
                <div className='all-stars-div'>
                  {stars}
                </div>

              </div>
            }
          </div>

        </div>
      </div>
    );
  }
}

export default MovieListItem;
