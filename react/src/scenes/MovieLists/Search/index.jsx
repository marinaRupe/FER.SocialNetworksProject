import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as movieActions from '../../../redux/actions/movie.actions';

import MovieListItem from '../../../components/Movie/MovieListItem';
import PaginationComponent from '../../../components/PaginationComponent';
import ButtonComponent from '../../../components/ButtonComponent';

import { buttonTypes } from '../../../enums/buttonTypes.enum';


class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      input: '',
    };
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

  onInputChange = (e) => this.setState({ input: e.target.value });

  search = () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { searchMovies } = this.props;
      const { input } = this.state;
      await searchMovies(input);
      this.setState({
        isLoading: false,
      });
    });
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
    const { page, totalPages } = this.props;

    return (
      <div className='page'>
        <div className='movie-list__title'>Search For Movies</div>
        <form>
          <label htmlFor="searchField">
            Search termn:
          </label>
          <input
            type="text"
            id="searchField"
            className="form-control"
            value={this.state.input}
            onChange={this.onInputChange}
          />
          <ButtonComponent
            action={this.search}
            text='Search'
            type={buttonTypes.primary}
          />
        </form>
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
  };
};

const mapDispatchToProps = {
  searchMovies: movieActions.searchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch);
