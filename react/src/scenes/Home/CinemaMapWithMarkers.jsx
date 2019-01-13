import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import CinemaMarker from '../../components/Home/CinemaMarker';

const CinemaMapWithMarkers = ({ cinemas, location }) => cinemas && cinemas.length > 0 ? (
  <Map
    center={location}
    zoom='13'
    className='home-page__cinemas-map'
  >
    <TileLayer
      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    {cinemas.map((c, index) => <CinemaMarker key={index} cinema={c} />)}
  </Map>
) : (
  <div>
    Cinemas not found.
  </div>
);

export default CinemaMapWithMarkers;
