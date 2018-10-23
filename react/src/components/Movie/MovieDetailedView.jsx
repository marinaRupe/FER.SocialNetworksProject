import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API, APP } from '../../constants/routes';

class MovieDetailedView extends Component {
  generatePosterUrl = url => {
    return API.MOVIE.POSTER_URL(url);
  }

  render() {
    const { movie } = this.props;

    return (
      <div
        className='movie__detailed'
      >
        <Link to={APP.MOVIE.DETAILS(movie.id)}>
          <img
            src={this.generatePosterUrl(movie.poster_path)} alt=''
            className='movie__detailed__image--size-l'
            onClick={this.openMovieDetails}
          />
        </Link>
        <div className='movie__detailed__details'>
          <Link to={APP.MOVIE.DETAILS(movie.id)}>
            <div className='movie__detailed__title'>{movie.title}</div>
          </Link>
          <Link to={APP.MOVIE.DETAILS(movie.id)}>
            <div className='movie__detailed__description'>{movie.overview}</div>
          </Link>
          <div>Release date: {movie.release_date}</div>
          <div>Average vote: {movie.vote_average}</div>
          <div>Number of votes: {movie.vote_count}</div>
          <div>Popularity: {movie.popularity}</div>
        </div>
      </div>
    );
  }
}

export default MovieDetailedView;