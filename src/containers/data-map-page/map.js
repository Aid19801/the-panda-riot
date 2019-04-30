import React from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import Markers from './markers';

import './styles.scss';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY,
  });

//   center={[-0.0826, 51.5160]}
export const MapBox = ({ selectMarker, lng, lat, gigs }) => {
    // const { markers, setMarkers } = useState([]);
      return (
          <div className="map-container">
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                center={[lng, lat]}
                containerStyle={{
                    height: "450px",
                    width: "100%"
            }}>
                { gigs.map((each, i) => {
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

  