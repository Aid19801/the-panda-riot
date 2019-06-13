import React from 'react';
import Col from 'react-bootstrap/Col';
import './styles.scss';

export default function GigOnTonight({ id, venue, name, nearestTubes, img, bringer }) {

    return (
        <div className="col-sm-3 div__each-gig-tonight">

            <div className="div__inner-box">
                <div className="row">
                    <img  className="img__gig-tonight-img" src={img} />
                    <div className="col-sm-7 gig-name">
                        <h4 className="h4__gig-tonight margin-off">{name}</h4>
                        <p className="white margin-off">@ {venue}</p>
                    </div>
                    <div className="col-sm-7 div__stack-underground">
                        <img
                            className="img__underground"
                            src="https://cdn0.iconfinder.com/data/icons/usefull-geo-points-for-maps/512/london-metro-metropolitan-underground-label-sign-512.png"
                        />
                        <p className="p__gig-tonight-info white margin-off">{nearestTubes[0]}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

