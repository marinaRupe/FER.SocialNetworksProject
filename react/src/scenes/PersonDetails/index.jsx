import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as movieActions from '../../redux/actions/movie.actions';
import { APP } from '../../constants/routes';
import { formatDate } from '../../utils/dateTime.utils';

class PersonDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const {
        fetchActivePerson,
        match: { params: { personId } },
      } = this.props;

      await fetchActivePerson(personId);

      this.setState({
        isLoading: false,
      });
    });
  }

  renderPersonDetails = () => {
    const { person } = this.props;

    const TMDB_IMAGES_URL = 'https://image.tmdb.org/t/p/';
    const defaultPosterSize = 'w500';

    if (person) {
      return (
        <div className='movie__details'>
          <div
            className='movie__detailed'
          >
            <div className='movie__detailed__heading'>
              <div>
                <Link to={APP.MOVIE.DETAILS(person.id)}>
                  <img
                    src={`${TMDB_IMAGES_URL}${defaultPosterSize}${person.profile_path}`}
                    alt=''
                    className='movie__detailed__image--size-l'
                  />
                </Link>
              </div>

              <div className='movie__detailed__basic-info'>
                <div className='movie__detailed__info'>
                  <label>Name:</label>
                  <div>{person.name || 'unknown'}</div>
                </div>

                <div className='movie__detailed__info'>
                  <label>Birthday:</label>
                  <div>{formatDate(person.birthday) || 'unknown'}</div>
                </div>
                {
                  person.deathday &&
                    <div className='movie__detailed__info'>
                      <label>Deathday:</label>
                      <div>{formatDate(person.deathday) || 'unknown'}</div>
                    </div>
                }

                <div className='movie__detailed__info'>
                  <label>Place of birth:</label>
                  <div>{person.place_of_birth || 'unknown'}</div>
                </div>

                <div className='movie__detailed__info'>
                  <label>Department:</label>
                  <div>{person.known_for_department || 'unknown'}</div>
                </div>

                <div className='movie__detailed__info'>
                  <label>Biography:</label>
                  <div>{person.biography}</div>
                </div>

                {
                  (person.homepage && person.homepage !== 'N/A') &&
                  <div className='movie__detailed__info'>
                    <label>Website:</label>
                    <div>
                      <a
                        href={person.homepage}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='link has-icon'
                      >
                        <span>{person.homepage}</span>
                        <i className='material-icons'>open_in_new</i>
                      </a>
                    </div>
                  </div>
                }
                {
                  (person.imdb_id && person.imdb_id !== 'N/A') &&
                  <div className='movie__detailed__info'>
                    <label>IMDb website:</label>
                    <div>
                      <a
                        href={`https://www.imdb.com/name/${person.imdb_id}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='link has-icon'
                      >
                        <span>https://www.imdb.com/name/{person.imdb_id}</span>
                        <i className='material-icons'>open_in_new</i>
                      </a>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='movie__details'>
        Person not found.
      </div>
    );
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className='movie__details loading page'>
          <div className='loader border-top-info'></div>
        </div>
      );
    };

    return (
      <div className='page'>
        <div className='movie-list__title'>Person details</div>
        {this.renderPersonDetails()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    person: state.movies.activePerson,
  };
};

const mapDispatchToProps = {
  fetchActivePerson: movieActions.fetchActivePerson,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PersonDetails));
