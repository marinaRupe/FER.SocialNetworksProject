import React, { Component } from 'react';
import { connect } from 'react-redux';
import movieActions from '../../../redux/actionCreators/movieActionCreator';
import MovieListItem from '../../../components/Movie/MovieListItem';

class MostRatedMovies extends Component {
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

    dispatch(movieActions.fetchMostRatedMovies());

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
    return (
      <div>
        <div className="movie-list__title">Most rated movies</div>
        {this.renderMovieList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.list,
  };
};

export default connect(mapStateToProps)(MostRatedMovies);