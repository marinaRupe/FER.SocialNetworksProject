import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as movieActions from '../../../redux/actions/movie.actions';
import MovieListItem from '../../../components/Movie/MovieListItem';
import PaginationComponent from '../../../components/PaginationComponent';

class NowPlayingMovies extends Component {
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
      const { fetchNowPlayingMovies } = this.props;
      await fetchNowPlayingMovies(page);
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
      <div>
        <div className='movie-list__title'>Now playing movies</div>
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

const mapDispatchToProps = {
  fetchNowPlayingMovies: movieActions.fetchNowPlayingMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingMovies);
