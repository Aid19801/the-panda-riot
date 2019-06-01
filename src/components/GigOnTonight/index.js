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


            <img className="img__gig-tonight-img" src={img} />


            <div className="div__flex-stack-col">
                <h4 className="h4__gig-tonight-name">{name}</h4>
                <p className="p__gig-tonight-tubes">{nearestTubes && nearestTubes[0]}</p>
                { bringer && <p className="p__gig-tonight-bringer">bringer</p>}
            </div>
        </div>
    )
}

