import React, { useState } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Markers from './markers';
import './styles.scss';
import mockGigs from './mock-gigs.json';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY,
  });


const MapBox = ({ selectMarker }) => {

    // const { markers, setMarkers } = useState([]);
    
    console.log(mockGigs.gigs);
      return (
          <div className="map-container">
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                center={[-0.103, 51.450]}
                containerStyle={{
                    height: "100vh",
                    width: "100vw"
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