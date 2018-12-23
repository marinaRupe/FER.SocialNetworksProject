import React, { Component } from 'react';

class AppInfo extends Component {

  render() {
    const { info } = this.props;

    return (
      <div className='info-block'>
        <div className='info-block__column'>
          <i className='material-icons'>movie</i>
          <span>Movies:</span>
          <strong>{info.movies_count}</strong>
        </div>
        <div className='info-block__column'>
          <i className='material-icons'>person</i>
          <span>Users:</span>
          <strong>{info.users_count}</strong>
        </div>
        <div className='info-block__column'>
          <i className='material-icons'>laptop</i>
          <span>APIs:</span>
          <strong>{info.api_count}</strong>
        </div>
      </div>
    );
  }
}

export default AppInfo;
