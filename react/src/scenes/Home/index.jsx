import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { APP } from '../../constants/routes';

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <button className='btn-primary'>
          <Link to={APP.PROFILE}>
            Profile
          </Link>
        </button>
        <button className='btn-primary'>
          <Link to={APP.MOVIE.POPULAR_MOVIES}>
            Most popular movies
          </Link>
        </button>
        <button className='btn-primary'>
          <Link to={APP.MOVIE.MOST_RATED_MOVIES}>
            Most rated movies
          </Link>
        </button>
      </div>
    );
  }
}

export default Home;