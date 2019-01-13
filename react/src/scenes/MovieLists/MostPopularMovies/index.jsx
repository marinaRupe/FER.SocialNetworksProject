import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { DEFAULT_PAGE_SIZE } from '../../../constants/values';
import { buttonTypes } from '../../../enums/buttonTypes.enum';
import ButtonComponent from '../../../components/ButtonComponent';
import * as movieActions from '../../../redux/actions/movie.actions';
import MovieListItem from '../../../components/Movie/MovieListItem';
import PaginationComponent from '../../../components/PaginationComponent';

class MostPopularMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      fromDate: null,
      toDate: null,
      selectedGenres: [],
    };
  }

  async componentDidMount() {
    const { getGenres } = this.props;
    await getGenres();

    this.fetchMovies();
  }

  fetchMovies = page => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { fetchMostPopularMovies } = this.props;
      const { fromDate, toDate, selectedGenres } = this.state;

      await fetchMostPopularMovies(page, DEFAULT_PAGE_SIZE, fromDate, toDate, selectedGenres);

      this.setState({
        isLoading: false,
      });
    });
  }

  onFromDateChange = (date) => this.setState({ fromDate: date });

  onToDateChange = (date) => this.setState({ toDate: date });

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

  search = () => {
    this.fetchMovies(1);
  }

  renderMovieList = () => {
    const { isLoading } = this.state;
    const { movies } = this.props;

    if (isLoading) {
      return (
        <div className='movie-list loading'>
          <div className='loader border-top-info' />
        </div>
      );
    }

    if (movies.length > 0) {
      return (
        <div className='movie-list'>
          {movies.map(m => <MovieListItem key={m.imdbID} movie={m} />)}
        </div>
      );
    }

    return (
      <div className='movie-list'>
        Movies not found.
      </div>
    );
  }

  render() {
    const { page, totalPages, genres } = this.props;
    const { fromDate, toDate, selectedGenres } = this.state;

    return (
      <div className='page'>
        <div className='movie-list__title'>Most popular movies</div>
        <Row className='search__row mb-20'>
          <Col sm={2}>
            <div>From date:</div>
            <DatePicker
              selected={fromDate}
              onChange={this.onFromDateChange}
              dateFormat='dd.MM.yyyy.'
            />
          </Col>
          <Col sm={2}>
            <div>To date:</div>
            <DatePicker
              selected={toDate}
              onChange={this.onToDateChange}
              dateFormat='dd.MM.yyyy.'
            />
          </Col>
          <Col sm={2}>
            <div>Genres:</div>
            <FormControl
              componentClass='select'
              placeholder='genres'
              multiple={true}
              rows={3}
              values={selectedGenres}
              className='search__multi-select'
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
          <Col sm={2}>
            <ButtonComponent
              action={this.search}
              text='Search'
              type={buttonTypes.primary}
              icon='search'
            />
          </Col>
        </Row>

        <Row className='search__selected'>
          {
            (selectedGenres && selectedGenres.length > 0) &&
              <div>
                <label>Selected genres:</label>
                {selectedGenres.reduce((acc, curr) => (`${acc}, ${curr}`))}
              </div>
          }
          {selectedGenres.red}
        </Row>

        {this.renderMovieList()}
        <PaginationComponent
          current={page}
          total={totalPages}
          action={this.fetchMovies}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.list,
    page: state.movies.page,
    totalPages: state.movies.totalPages,
    genres: state.movies.genres,
  };
};

const mapDispatchToProps = {
  fetchMostPopularMovies: movieActions.fetchMostPopularMovies,
  getGenres: movieActions.getGenres,
};

export default connect(mapStateToProps, mapDispatchToProps)(MostPopularMovies);
