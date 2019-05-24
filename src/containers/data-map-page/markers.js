import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from "react-mapbox-gl";
import './styles.scss';

const Markers = ({ data, coordinates, handleClick, isBringer }) => {
    return (
        <div onClick={() => handleClick(data)} className="map-marker">
            <Marker
                coordinates={coordinates}
                anchor="bottom"
            >
                <div className={data.bringer ? "mapBringerStyle" : "mapMeMarkerStyle"} />
            </Marker>
        </div>
    )
}

Markers.propTypes = {
    coordinates: PropTypes.array.isRequired,
}

export default Markers;