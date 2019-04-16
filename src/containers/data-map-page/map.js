import React, { useState } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Markers from './markers';
import mockGigs from './mock-gigs.json';
import './styles.scss';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY,
  });


const MapBox = ({ selectMarker }) => {
    // const { markers, setMarkers } = useState([]);
      return (
          <div className="map-container">
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                center={[-0.0826, 51.5160]}
                containerStyle={{
                    height: "450px",
                    width: "100%"
            }}>
                { mockGigs.gigs.map((each, i) => {
                    return <Markers
                                key={i}
                                data={each}
                                handleClick={selectMarker}
                                coordinates={[each.lng, each.lat]}
                            />
                })}
            </Map>
          </div>
      )
  }

  export default MapBox;