import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as movieActions from '../../../../redux/actions/movie.actions';
import MovieListItem from '../../../../components/Movie/MovieListItem';
import PaginationComponent from '../../../../components/PaginationComponent';

class UserWatchedMovies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.fetchMovies();
  }

  fetchMovies = page => {
    this.setState({
      isLoading: true,
    }, async () => {
      const { fetchUserWatchedMovies, currentUser } = this.props;
      await fetchUserWatchedMovies(page, 30, currentUser); // TODO: change action
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
        <div className='movie-list__title'>Watched movies</div>
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
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
  fetchUserWatchedMovies: movieActions.fetchUserWatchedMovies, // TODO: change action
};

export default connect(mapStateToProps, mapDispatchToProps)(UserWatchedMovies);
