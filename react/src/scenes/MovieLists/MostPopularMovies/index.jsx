import React, { Component } from 'react';
import { connect } from 'react-redux';
import movieActions from '../../../redux/actionCreators/movieActionCreator';
import MovieListItem from '../../../components/Movie/MovieListItem';

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

  renderMovieList = () => {
    const { movies } = this.props;

    if (movies.length > 0) {
      return (
        <div className="movie-list">
          {movies.map(m => <MovieListItem key={m.id} movie={m} />)}
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
        <div className="movie-list__title">Most popular movies</div>
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

export default connect(mapStateToProps)(MostPopularMovies);