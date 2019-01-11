import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { APP } from '../../constants/routes';
import * as movieActions from '../../redux/actions/movie.actions';
import { buttonTypes } from '../../enums/buttonTypes.enum';
import ButtonComponent from '../../components/ButtonComponent';
import { DEFAULT_MOVIE_POSTER, DEFAULT_PROFILE_IMAGE } from '../../constants/values';
import { formatDate } from '../../utils/dateTime.utils';

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
        <div className='movie__detailed__heading'>
          <div>
            <Link to={APP.MOVIE.DETAILS(movie.imdbID)}>
              <img
                src={poster}
                alt=''
                className='movie__detailed__image--size-l'
                onClick={this.openMovieDetails}
              />
            </Link>
          </div>
          <div className='movie__detailed__basic-info'>
            <div className='movie__detailed__title'>{movie.title}</div>
            <div className='movie__detailed__description'>{movie.plot}</div>

            <div className='movie__detailed__info'>
              <label>Release date:</label>
              <div>{formatDate(movie.releaseDate)}</div>
            </div>

            <div className='movie__detailed__info'>
              <label>Runtime:</label>
              <div>{movie.runtime}</div>
            </div>

            <div className='movie__detailed__info'>
              <label>Genres:</label>
              <div>
                {movie.genres && movie.genres.length > 0
                  ? movie.genres.reduce((acc, curr) => (`${acc}, ${curr}`))
                  : 'unknown'
                }
              </div>
            </div>

            {
              movie.website &&
              <div className='movie__detailed__info'>
                <label>Website:</label>
                <div>
                  <a
                    href={movie.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='link has-icon'
                  >
                    <span>{movie.website}</span>
                    <i className='material-icons'>open_in_new</i>
                  </a>
                </div>
              </div>
            }

            <div className='movie__detailed__info'>
              <label>Languages:</label>
              <div>
                {movie.languages && movie.languages.length > 0
                  ? movie.languages.reduce((acc, curr) => (`${acc}, ${curr}`))
                  : 'unknown'
                }
              </div>
            </div>

            <div className='movie__detailed__info'>
              <label>Translations:</label>
              <div>
                {movie.translations && movie.translations.length > 0
                  ? movie.translations.reduce((acc, curr) => (`${acc}, ${curr}`))
                  : 'unknown'
                }
              </div>
            </div>

          </div>
        </div>

        <div className='movie__detailed__details'>
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

          <div>
            <h5 className='mb-20'>Cast:</h5>
            {
              movie.cast && movie.cast.length > 0 ?
                <div className='movie__detailed__cast'>
                  {movie.cast.map((castMember, index) =>
                    <div key={index} className='movie__detailed__cast-member'>
                      <div>
                        <img
                          className='movie__detailed__cast-member profile-image'
                          src={castMember.profileImage || DEFAULT_PROFILE_IMAGE}
                          alt=''
                        />
                      </div>
                      <div className='movie__detailed__cast-member person'>
                        {castMember.name}
                      </div>
                      <div className='movie__detailed__cast-member character'>
                        (as {castMember.characterName})
                      </div>
                    </div>
                  )}
                </div>
                :
                <span>Unknown</span>
            }
          </div>

          <div>
            <h5 className='mb-20'>Crew:</h5>
            {
              movie.crew && movie.crew.length > 0 ?
                <div className='movie__detailed__crew'>
                  {movie.crew.map((crewMember, index) =>
                    <div key={index} className='movie__detailed__crew-member'>
                      <div>
                        <img
                          className='movie__detailed__crew-member profile-image'
                          src={crewMember.profileImage || DEFAULT_PROFILE_IMAGE}
                          alt=''
                        />
                      </div>
                      <div className='movie__detailed__crew-member person'>
                        {crewMember.name}
                      </div>
                      <div className='movie__detailed__crew-member job'>
                        ({crewMember.job})
                      </div>
                    </div>
                  )}
                </div>
                :
                <span>Unknown</span>
            }
          </div>
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
