import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APP } from '../../constants/routes';

class MovieDetailedView extends Component {
  render() {
    const { movie } = this.props;

    return (
      <div
        className='movie__detailed'
      >
        <Link to={APP.MOVIE.DETAILS(movie.imdbID)}>
          <img
            src={movie.poster} alt=''
            className='movie__detailed__image--size-l'
            onClick={this.openMovieDetails}
          />
        </Link>
        <div className='movie__detailed__details'>
          <Link to={APP.MOVIE.DETAILS(movie.imdbID)}>
            <div className='movie__detailed__title'>{movie.title}</div>
          </Link>
          <Link to={APP.MOVIE.DETAILS(movie.imdbID)}>
            <div className='movie__detailed__description'>{movie.plot}</div>
          </Link>

          <div>Release date: {movie.released}</div>

          <div>
            Actors:&nbsp;
            {
              movie.actors && movie.actors.length > 0 ?
                <ul>
                  {movie.actors.map((actor, index) =>
                    <li key={index}>{actor}</li>
                  )}
                </ul>
                :
                <span>Unknown</span>
            }
          </div>

          <div>
            Genres: 
            <ul>
              {movie.genre.map((g, index) =>
                <li key={index}>{g}</li>
              )}
            </ul>
          </div>

          <div>
            Languages: 
            <ul>
              {movie.languages.map((lang, index) =>
                <li key={index}>{lang}</li>
              )}
            </ul>
          </div>

          <div>Runtime: {movie.runtime} min</div>
          {
            movie.website &&
            <div>Website:&nbsp;
              <Link className='link' to={movie.website}>{movie.website}</Link>
            </div>
          }
          
        </div>
      </div>
    );
  }
}

export default MovieDetailedView;