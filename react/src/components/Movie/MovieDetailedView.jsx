import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { APP } from '../../constants/routes';
import * as movieActions from '../../redux/actions/movie.actions';
import { buttonTypes } from '../../enums/buttonTypes.enum';
import ButtonComponent from '../../components/ButtonComponent';
import { DEFAULT_MOVIE_POSTER } from '../../constants/values';

class MovieDetailedView extends Component {
  addMovieToWatchedList = async () => {
    const { addToWatchedList, currentUser, movie } = this.props;
    await addToWatchedList(currentUser.userID, movie.imdbID);
  }

  removeMovieFromWatchedList = async () => {
    const { removeFromWatchedList, currentUser, movie } = this.props;
    await removeFromWatchedList(currentUser.userID, movie.imdbID);
  }

  saveMovie = async () => {
    const { addToSavedList, currentUser, movie } = this.props;
    await addToSavedList(currentUser.userID, movie.imdbID);
  }

  removeMovieFromSavedList = async () => {
    const { removeFromSavedList, currentUser, movie } = this.props;
    await removeFromSavedList(currentUser.userID, movie.imdbID);
  }

  rateMovie = async (score) => {
    const { addToRatedList, currentUser, movie } = this.props;
    await addToRatedList(currentUser.userID, movie.imdbID, score);
  }

  removeMovieFromRatedList = async () => {
    const { removeFromRatedList, currentUser, movie } = this.props;
    await removeFromRatedList(currentUser.userID, movie.imdbID);
  }

  render() {
    const { movie, movieUserStatus } = this.props;
    const poster = !movie.poster || movie.poster === 'N/A' ? DEFAULT_MOVIE_POSTER : movie.poster;

    return (
      <div
        className='movie__detailed'
      >
        <Link to={APP.MOVIE.DETAILS(movie.imdbID)}>
          <img
            src={poster}
            alt=''
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

          <div className='movie__detailed__actions'>
            {
              movieUserStatus.isWatched ?
                <ButtonComponent
                  action={this.removeMovieFromWatchedList}
                  text='Remove from watched'
                  type={buttonTypes.secondary}
                />
                :
                <ButtonComponent
                  action={this.addMovieToWatchedList}
                  text='Add to watched'
                  type={buttonTypes.primary}
                />
            }
            {
              movieUserStatus.isSaved ?
                <ButtonComponent
                  action={this.removeMovieFromSavedList}
                  text='Remove from saved'
                  type={buttonTypes.secondary}
                />
                :
                <ButtonComponent
                  action={this.saveMovie}
                  text='Save movie'
                  type={buttonTypes.primary}
                />
            }
            <div className='movie__detailed__rating'>
              <StarRatings
                rating={movieUserStatus.rating || 0}
                starRatedColor='yellow'
                starHoverColor='yellow'
                changeRating={this.rateMovie}
                numberOfStars={5}
                starDimension='40px'
                name='rating'
              />
              {
                movieUserStatus.isRated &&
                <div
                  className='movie__detailed__btn--remove-rated'
                  onClick={this.removeMovieFromRatedList}>
                  Remove rating
                </div>
              }
            </div>
          </div>

          <div>Release date: {movie.releaseDate}</div>

          <div>
            Cast:&nbsp;
            {
              movie.cast && movie.cast.length > 0 ?
                <ul>
                  {movie.cast.map((castMember, index) =>
                    <li key={index}>{castMember.name} (as {castMember.characterName})</li>
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

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
  addToWatchedList: movieActions.addToWatchedList,
  addToSavedList: movieActions.addToSavedList,
  addToRatedList: movieActions.addToRatedList,
  removeFromWatchedList: movieActions.removeFromWatchedList,
  removeFromSavedList: movieActions.removeFromSavedList,
  removeFromRatedList: movieActions.removeFromRatedList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailedView);
