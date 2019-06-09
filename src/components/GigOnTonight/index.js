import React from 'react';
import Col from 'react-bootstrap/Col';
import './styles.scss';

export default function GigOnTonight({ id, name, nearestTubes, img, bringer }) {

    const calcAngle = () => {
        let num = Math.floor(Math.random() * 15) + 1;
        let oneOrTwo = Math.floor(Math.random() * 2) + 1;
        let plusOrMinus = oneOrTwo === 1 ? '-' : '+';
        return `${plusOrMinus}${num}`;    
    }
    
    console.log(calcAngle());
    return (
        <div className="col-sm-3 div__each-gig-tonight">

            <div className="div__inner-box">
                <h4>{name}</h4>
            </div>

        </div>
    )
}

