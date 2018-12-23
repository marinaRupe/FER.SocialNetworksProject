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

          <div>Release date: {movie.releaseDate}</div>

          <div>
            Cast:&nbsp;
            {
              movie.cast && movie.cast.length > 0 ?
                <ul>
                  {movie.cast.map((castMember) =>
                    <li key={castMember.id}>{castMember.name} (as {castMember.characterName})</li>
                  )}
                </ul>
                :
                <span>Unknown</span>
            }
          </div>

          <div>
            Crew:&nbsp;
            {
              movie.crew && movie.crew.length > 0 ?
                <ul>
                  {movie.crew.map((crewMember, index) =>
                    <li key={index}>{crewMember.name}</li>
                  )}
                </ul>
                :
                <span>Unknown</span>
            }
          </div>

          <div>
            Genres: 
            <ul>
              {(movie.genres || []).map((g) =>
                <li key={g}>{g}</li>
              )}
            </ul>
          </div>

          <div>
            Languages: 
            <ul>
              {(movie.languages || []).map((lang) =>
                <li key={lang}>{lang}</li>
              )}
            </ul>
          </div>

          <div>Runtime: {movie.runtime}</div>
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