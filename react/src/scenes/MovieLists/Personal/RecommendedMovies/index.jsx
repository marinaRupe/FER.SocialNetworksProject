import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as movieActions from '../../../../redux/actions/movie.actions';
import MovieListItem from '../../../../components/Movie/MovieListItem';
import PaginationComponent from '../../../../components/PaginationComponent';

class RecommendedMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = page => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { fetchRecommendedMovies, currentUser } = this.props;
      await fetchRecommendedMovies(page,5,currentUser);
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
          <div className='loader border-top-info'></div>
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
        <div className='movie-list__title'>Recommended for you</div>
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
    movies: state.movies.recommendedMovies.list,
    page: state.movies.recommendedMovies.page,
    totalPages: state.movies.recommendedMovies.totalPages,
    currentUser: state.users.currentUser
  };
};

const mapDispatchToProps = {
  fetchRecommendedMovies: movieActions.fetchRecommendedMovies, // TODO: change action
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedMovies);
