import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APP } from '../../constants/routes';

class MovieListItem extends Component {
  render() {
    const { movie } = this.props;

    return (
      <div
        className='movie__list-item'
      >
        <Link to={APP.MOVIE.DETAILS(movie.imdbID)}>
          <img
            src={movie.poster} alt=''
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
              {movie.genres.reduce((acc, curr) => (`${acc}, ${curr}`))}
            </span>
          </div>
          <div>
            <div className='rating-div'>
              Rating: {movie.imdbRating || '-'}
            </div>
            {movie.score &&
            <div className='score-star-div'>
              <div className='score-div'>
                Your score: {movie.score}

              </div>
              <div className='star-div'>
                <i className='material-icons' >star</i>
              </div>
            </div>}
          </div>

        </div>
      </div>
    );
  }
}

export default MovieListItem;
