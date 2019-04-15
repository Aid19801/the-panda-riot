import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import './styles.scss';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY,
  });

  const MapBox = () => {
      return (
          <div className="map-container">
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                height: "100vh",
                width: "100vw"
            }}>
                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15" }}>
                    <Feature coordinates={[-0.1278, 51.5074]}/>
                </Layer>
            </Map>
          </div>
      )
  }

  export default MapBox;