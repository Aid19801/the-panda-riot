import React from 'react';

import './styles.scss';

const TrafficLights = ({ nights, nearestTubes, left }) => (
    <div className={left ? "traffic-lights-container left" : "traffic-lights-container right"}>
        { nights ? <p className="traffic-light-title">Nights: </p>  : <p>Nearest Tube/s: </p>}
        <ul className="traffic-lights-ul" style={{ listStyleType: 'none' }}>
            { nights && nights.map((each, i) => <li className="traffic-light-li">{each}</li>) }
            { nearestTubes && nearestTubes.map((each, i) => <li className="traffic-light-li">{each}</li>) }
            
        </ul>


    
    </div>
)

export default TrafficLights;