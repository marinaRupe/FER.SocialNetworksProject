import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API, APP } from '../../constants/routes';

class MovieListItem extends Component {
  generatePosterUrl = url => {
    return API.MOVIE.POSTER_URL(url);
  }

  render() {
    const { movie } = this.props;

    return (
      <div
        className='movie__list-item'
      >
        <Link to={APP.MOVIE.DETAILS(movie.id)}>
          <img
            src={this.generatePosterUrl(movie.poster_path)} alt=''
            className='movie__list-item__image--size-m'
            onClick={this.openMovieDetails}
          />
        </Link>
        <div className='movie__list-item__details'>
          <Link to={APP.MOVIE.DETAILS(movie.id)}>
            <div className='movie__list-item__title'>{movie.title}</div>
          </Link>
          <Link to={APP.MOVIE.DETAILS(movie.id)}>
            <div className='movie__list-item__description'>{movie.overview}</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default MovieListItem;