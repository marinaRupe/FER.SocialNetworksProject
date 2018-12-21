import React, { Component } from 'react';

class AppInfo extends Component {

  render() {
    const { info } = this.props;

    return (

      <div>
        <div className='home-page__app-info'>
          Number of movies in db: {info.movies_count}
        </div>
        <div className='home-page__app-info'>
          Number of users in db: {info.users_count}
        </div>
        <div className='home-page__app-info'>
          Number of APIs in db: {info.api_count}
        </div>
      </div>
    );
  }
}

export default AppInfo;
