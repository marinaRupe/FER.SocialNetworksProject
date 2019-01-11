import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as movieActions from '../../redux/actions/movie.actions';
import * as movieReviewActions from '../../redux/actions/movieReview.actions';
import MovieDetailedView from '../../components/Movie/MovieDetailedView';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const {
        fetchActiveMovie,
        fetchUserMovieStatus,
        currentUser,
        match: { params: { movieId } },
      } = this.props;

      await fetchActiveMovie(movieId);
      await fetchUserMovieStatus(currentUser.userID, movieId);

      this.setState({
        isLoading: false,
      });
    });
  }

  async componentDidUpdate(prevProps) {
    const { fetchReviewsForMovie, movie } = this.props;

    if (!movie) return;

    if (prevProps.movie && (movie.imdbID === prevProps.movie.imdbID)) return;

    await fetchReviewsForMovie(movie.title);
  }

  renderMovieDetails = () => {
    const { movie, movieUserStatus } = this.props;

    if (movie && movieUserStatus) {
      return (
        <div className='movie__details'>
          <MovieDetailedView movie={movie} movieUserStatus={movieUserStatus} />
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

    if (movie) {
      const movieYear = movie.releaseDate && movie.releaseDate.split('-')[0];
      // eslint-disable-next-line
      const reviewsList = reviews.map((review, index) => {
        const year = review.opening_date && review.opening_date.split('-')[0];
        if (year === movieYear) {
          return (
            <div
              className='movie__reviews__item'
              key={index}
            >
              <div className='movie__reviews__item__title'>
                {review.headline}
              </div>
              <div>{review.summary_short}</div>
              <br />
              <div>{review.byline}</div>
              <div>Publication date: {review.publication_date}</div>
              <div>MPAA Rating: {review.mpaa_rating}</div>
              <div>
                <a
                  href={review.link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link has-icon'
                >
                  <span>{review.link.suggested_link_text}</span>
                  <i className='material-icons'>open_in_new</i>
                </a>
              </div>
            </div>
          );
        }
      });

      return(
        <div className='movie__reviews mb-30'>
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
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className='movie__details loading page'>
          <div className='loader border-top-info'></div>
        </div>
      );
    };

    return (
      <div className='page'>
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
    movieUserStatus: state.movies.activeMovieStatus,
    reviews: state.reviews.activeMovieReviews,
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
  fetchReviewsForMovie: movieReviewActions.fetchReviewsForMovie,
  fetchActiveMovie: movieActions.fetchActiveMovie,
  fetchUserMovieStatus: movieActions.fetchUserMovieStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MovieDetails));
