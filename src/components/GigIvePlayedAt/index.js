import React from 'react';
import Col from 'react-bootstrap/Col';
import './styles.css';

const GigIvePlayedAt = ({ img }) => {

    return (
        <Col className="div__gig-ive-played-at padding-off" sm={1}>
            <img src={img} className="img__gig-ive-played-at" />
        </Col>
    )
}

export default GigIvePlayedAt;