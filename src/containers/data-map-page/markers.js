import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from "react-mapbox-gl";
import './styles.scss';

const Markers = ({ data, coordinates, handleClick }) => {

    const generateClassName = () => {
        let cn = "";
        if (data.bringer) {
            cn += "mapBringerStyle";
        }
        if (!data.bringer) {
            cn += "mapMeMarkerStyle";
        }
        if (data.isSelected) {
            cn = "mapSelectedStyle";
        }
        return cn;
    }

    return (
        <div onClick={() => handleClick(data)} className="map-marker">
            <Marker
                coordinates={coordinates}
                anchor="bottom"
            >
                <div
                    className={generateClassName()}
                />
            </Marker>
        </div>
    )
}

Markers.propTypes = {
    coordinates: PropTypes.array.isRequired,
}

export default Markers;