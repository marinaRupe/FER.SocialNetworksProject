import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { APP } from '../../constants/routes';
import * as movieActions from '../../redux/actions/movie.actions';
import { buttonTypes } from '../../enums/buttonTypes.enum';
import ButtonComponent from '../../components/ButtonComponent';

class MovieDetailedView extends Component {
  addMovieToWatchList = async () => {
    const { addToWatchedList, currentUser, movie } = this.props;
    await addToWatchedList(currentUser.userID, movie.imdbID);
  }

  saveMovie = async () => {
    const { addToSavedList, currentUser, movie } = this.props;
    await addToSavedList(currentUser.userID, movie.imdbID);
  }

  rateMovie = async (score) => {
    const { addToRatedList, currentUser, movie } = this.props;
    await addToRatedList(currentUser.userID, movie.imdbID, score);
  }

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

          <div>
            {
              movie.watched ?
                <ButtonComponent
                  action={this.addMovieToWatchList}
                  text='Remove from watched'
                  type={buttonTypes.secondary}
                />
                :
                <ButtonComponent
                  action={this.addMovieToWatchList}
                  text='Add to watched'
                  type={buttonTypes.primary}
                />
            }
            {
              movie.saved ?
                <ButtonComponent
                  action={this.saveMovie}
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
          </div>

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

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
  addToWatchedList: movieActions.addToWatchedList,
  addToSavedList: movieActions.addToSavedList,
  addToRatedList: movieActions.addToRatedList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailedView);
