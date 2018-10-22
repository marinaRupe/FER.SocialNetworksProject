import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API, APP } from '../../constants/routes';

class Home extends Component {
  state = {
    testText: ''
  };

  async componentDidMount() {
    const response = await axios.get(API.TEST.TEXT);
    this.setState({ testText: response.data });
  }

  render() {
    return (
      <div className="home-page">
        <button className='btn-primary'>
          <Link to={APP.MOVIE.POPULAR_MOVIES}>
            Most popular movies
          </Link>
        </button>
      </div>
    );
  }
}

export default Home;