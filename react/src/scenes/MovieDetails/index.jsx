import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import movieActions from '../../redux/actionCreators/movieActionCreator';
import MovieDetailedView from '../../components/Movie/MovieDetailedView';

class MovieDetails extends Component {
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

  renderMovieDetails = () => {
    const { movies, match: { params: { movieId } } } = this.props;

    const movie = movies.find(m => m.id = movieId);

    if (movie) {
      return (
        <div className='movie__details'>
          <MovieDetailedView movie={movie} />
          <div>
            <div className='movie__reviews__title'>Reviews</div>
            <div className='movie__reviews__content'></div>
          </div>
        </div>
      );
    }

    return (
      <div className='movie__details'>
        Movie not found.
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className='movie-list__title'>Movie details</div>
        {this.renderMovieDetails()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.list,
  };
};

export default connect(mapStateToProps)(withRouter(MovieDetails));