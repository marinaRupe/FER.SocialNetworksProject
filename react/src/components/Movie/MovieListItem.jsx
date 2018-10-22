import React, { Component } from 'react';
import { API } from '../../constants/routes';

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
        <img
          src={this.generatePosterUrl(movie.poster_path)} alt=''
          className='movie__list-item__image--size-m'
        />
        <div className='movie__list-item__details'>
          <div className='movie__list-item__title'>{movie.title}</div>
          <div className='movie__list-item__description'>{movie.overview}</div>
        </div>
      </div>
    );
  }
}

export default MovieListItem;