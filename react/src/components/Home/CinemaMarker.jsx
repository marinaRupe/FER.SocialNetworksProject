import React, { Component } from 'react';
import { Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

class CinemaMarker extends Component {

  render() {
    const image = new Leaflet.Icon({
      iconUrl: require('../../images/map-marker.png'),
      iconSize:[20, 35]
    });
    const { cinema } = this.props;

    return (
      <Marker position={ cinema.position } icon={image}>
        <Popup>
          {cinema.title}
        </Popup>
      </Marker>
    );
  }
}

export default CinemaMarker;
