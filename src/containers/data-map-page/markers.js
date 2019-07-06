import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from "react-mapbox-gl";
import './styles.scss';
import { analyticsEvent } from '../../lib/utils';

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

    const handleClickWithAnalytics = () => {
        analyticsEvent(`user-clicked-marker-${data.name}`);
        handleClick(data);
    }

    return (
        <div onClick={() => handleClickWithAnalytics()} className="map-marker">
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