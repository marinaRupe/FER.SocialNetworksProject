import React, { Component } from 'react';
import { connect } from 'react-redux';
import movieActions from '../../../redux/actionCreators/movieActionCreator';
import MovieListItem from '../../../components/Movie/MovieListItem';
import PaginationComponent from '../../../components/PaginationComponent';

class MostPopularMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    this.setState({
      isLoading: true,
    });

    dispatch(movieActions.fetchMostPopularMovies());

    this.setState({
      isLoading: false,
    });
  }

  fetchMovies = page => {
    const { dispatch } = this.props;

    this.setState({
      isLoading: true,
    });

    dispatch(movieActions.fetchMostPopularMovies(page));

    this.setState({
      isLoading: false,
    });
  }

  renderMovieList = () => {
    const { isLoading } = this.state;
    const { movies } = this.props;

    if (isLoading) {
      return (
        <div className="movie-list">
          Loading...
        </div>
      );
    }

    if (movies.length > 0) {
      return (
        <div className="movie-list">
          {movies.map(m => <MovieListItem key={m.imdbID} movie={m} />)}
        </div>
      );
    }

    return (
      <div className="movie-list">
        Movies not found.
      </div>
    );
  }

  render() {
    const { page, totalPages } = this.props;

    return (
      <div>
        <div className="movie-list__title">Most popular movies</div>
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
  };
};

export default connect(mapStateToProps)(MostPopularMovies);