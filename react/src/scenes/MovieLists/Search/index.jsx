import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, FormControl, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import * as movieActions from '../../../redux/actions/movie.actions';

import MovieListItem from '../../../components/Movie/MovieListItem';
import PaginationComponent from '../../../components/PaginationComponent';

class MovieSearch extends Component {
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
      input: '',
      fromDate: null,
      toDate: null,
      selectedGenres: [],
    };
  }

  async componentDidMount() {
    await this.props.getGenres();
  }

  fetchMovies = page => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { searchMovies } = this.props;
      const { input } = this.state;
      await searchMovies(input, page);
      this.setState({
        isLoading: false,
      });
    });
  }

  search = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { searchMovies } = this.props;
      const { input, fromDate, toDate, selectedGenres } = this.state;
      await searchMovies(input, fromDate, toDate, selectedGenres);
      this.setState({
        isLoading: false,
      });
    });
  }

  onInputChange = (e) => this.setState({ input: e.target.value });

  onInputKeyDown = (e) => e.key === 'Enter' && this.search();

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

    return (
      <div className='page'>
        <div className='movie-list__title'>Search For Movies</div>
        <Row>
          <Col sm={2}>
            From:&nbsp;
            <DatePicker
              selected={this.state.fromDate}
              onChange={this.onFromDateChange}
              dateFormat="dd.MM.yyyy."
            />
          </Col>
          <Col sm={2}>
            To:&nbsp;
            <DatePicker
              selected={this.state.toDate}
              onChange={this.onToDateChange}
              dateFormat="dd.MM.yyyy."
            />
          </Col>
          <Col sm={2}>
            <FormControl componentClass="select" placeholder="genres" multiple={true} values={this.state.selectedGenres}>
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
          <Col sm={4}>
            <FormControl
              type="text"
              id="searchField"
              value={this.state.input}
              onChange={this.onInputChange}
              onKeyDown={this.onInputKeyDown}
            />
          </Col>
          <Col sm={2}>
            <Button onClick={this.search}>Search</Button>
          </Col>
        </Row>
        <hr />
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
    movies: state.movies.foundMovies.list,
    page: state.movies.foundMovies.page,
    totalPages: state.movies.foundMovies.totalPages,
    genres: state.movies.genres,
  };
};

const mapDispatchToProps = {
  searchMovies: movieActions.searchMovies,
  getGenres: movieActions.getGenres,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch);
