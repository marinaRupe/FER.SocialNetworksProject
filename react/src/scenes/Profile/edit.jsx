import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { Row, Col, FormControl } from 'react-bootstrap';
import { buttonTypes } from '../../enums/buttonTypes.enum';
import ButtonComponent from '../../components/ButtonComponent';
import * as userActions from '../../redux/actions/user.actions';
import * as movieActions from '../../redux/actions/movie.actions';
import { APP } from '../../constants/routes';

class ProfileEdit extends Component {
  static defaultProps = {
    movies: [],
    page: 1,
    totalPages: 1,
    genres: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      redirect: false,
      selectedGenres: [],
    };
  }

  async componentDidMount() {
    await this.props.getGenres();
  }

  save = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { savePreferredGenres } = this.props;
      const { currentUser } = this.props;
      const { selectedGenres } = this.state;
      await savePreferredGenres(currentUser.userID, selectedGenres);
      this.setState({
        isLoading: false,
        redirect: true
      });
    });
  }

  onGenreSelect = (e) => {
    const { selectedGenres } = this.state;
    e.preventDefault();
    const genre = e.target.value;
    if (selectedGenres.includes(genre)) {
      this.setState({ selectedGenres: selectedGenres.filter(_genre => _genre !== genre ) });
    } else {
      this.setState({ selectedGenres: [ ...selectedGenres, genre ] });
    }
  }

  render() {
    const { genres } = this.props;
    const { selectedGenres } = this.state;
    if (this.state.redirect){
      return <Redirect to={APP.PROFILE} />
    }else{
      return (
        <div className='page'>
          <Row className='profile__genres__row mb-20 mt-4'>
            <Col sm={3}>
              <div>Select preferred genres:</div>
              <FormControl
                componentClass='select'
                placeholder='genres'
                multiple={true}
                rows={3}
                values={selectedGenres}
                className='profile__genres__multi-select'
              >
                {genres && genres.map(genre => (
                  <option
                    key={genre}
                    value={genre}
                    onClick={this.onGenreSelect}
                  >
                    {genre}
                  </option>
                ))}
              </FormControl>
            </Col>
          </Row>

          <Row className='profile__genres__selected'>
            {
              (selectedGenres && selectedGenres.length > 0) &&
                <div>
                  <label>Preferred genres:</label>
                  {selectedGenres.reduce((acc, curr) => (`${acc}, ${curr}`))}
                </div>
            }
            {selectedGenres.red}
          </Row>

          <Row className='search__row'>
            <ButtonComponent
              action={this.save}
              text='Save'
              type={buttonTypes.primary}
              icon='save'
            />
          </Row>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    genres: state.movies.genres,
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
  getGenres: movieActions.getGenres,
  savePreferredGenres: userActions.savePreferredGenres,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
