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

    if (prevProps.movie && (movie.imdbID === prevProps.movie.imdbID)) return;

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

    if (movie) {
      const movieYear = movie.releaseDate.split('-')[0];
      // eslint-disable-next-line
      const reviewsList = reviews.map((review, index) => {
        const year = review.opening_date.split('-')[0];
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
                  className='link'
                >
                  {review.link.suggested_link_text}
                </a>
              </div>
            </div>
          );
        }
      });

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