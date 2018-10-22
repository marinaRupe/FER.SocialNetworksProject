import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import movieActions from '../../redux/actionCreators/movieActionCreator';
import movieReviewActions from '../../redux/actionCreators/movieReviewActionCreator';
import MovieDetailedView from '../../components/Movie/MovieDetailedView';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    const { dispatch, match: { params: { movieId } } } = this.props;

    this.setState({
      isLoading: true,
    });

    dispatch(movieActions.fetchActiveMovie(movieId));

    this.setState({
      isLoading: false,
    });
  }

  componentDidUpdate(prevProps) {
    const { dispatch, movie } = this.props;

    if (!movie) return;

    if (movie.id === prevProps.movie.id) return;

    dispatch(movieReviewActions.fetchReviewsForMovie(movie.title));
  }

  renderMovieDetails = () => {
    const { movie } = this.props;

    if (movie) {
      return (
        <div className='movie__details'>
          <MovieDetailedView movie={movie} />
        </div>
      );
    }

    return (
      <div className='movie__details'>
        Movie not found.
      </div>
    );
  }

  renderMovieReviews = () => {
    const { movie, reviews } = this.props;

    const reviewsList = reviews.map((review, index) => (
      <div
        className='movie__reviews__item'
        key={index}
      >
        <div className='movie__reviews__item__title'>
          {review.headline}
        </div>
        <div>
          <a
            href={review.link.url}
            target='_blank'
            rel='noopener noreferrer'
            className='link'
          >
            {review.link.suggested_link_text}
          </a>
        </div>
      </div>
    ));

    if (movie) {
      return(
        <div>
          <div className='movie__reviews__title'>Reviews</div>
          <div className='movie__reviews__content'>
            {
              reviews.length > 0
                ? reviewsList
                : <div>No reviews found</div>
            }
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return (
      <div>
        <div className='movie-list__title'>Movie details</div>
        {this.renderMovieDetails()}
        {this.renderMovieReviews()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movie: state.movies.activeMovie,
    reviews: state.reviews.activeMovieReviews,
  };
};

export default connect(mapStateToProps)(withRouter(MovieDetails));