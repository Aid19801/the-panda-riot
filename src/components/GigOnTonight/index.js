import React from 'react';
import Col from 'react-bootstrap/Col';
import './styles.scss';

export default function GigOnTonight({ name, nearestTubes, img, bringer }) {
    return (
        <Col sm={4}>
            <div className="div__gig-tonight-container margin-top">
                <p>Tonight!</p>
                <h4>{name}</h4>
                <p>{nearestTubes && nearestTubes[0]}</p>
                { bringer && <p>bringer</p>}
            </div>
        </Col>
    )
}

