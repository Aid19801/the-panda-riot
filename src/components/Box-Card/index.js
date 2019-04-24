import React, { Component } from 'react'
import { trimStringSpecifically } from '../../lib/utils';
import './styles.scss';

const BoxCard = ({ img, blurb, headline, link, src }) => (
    <div className="box-card" onClick={() => window.open(link,'_newtab')}>
        <h4 className="card-h4">{trimStringSpecifically(headline, 55)}</h4>
        <p className="card-p">{trimStringSpecifically(blurb, 110)}</p>
        <h3 className="card-h3" >{src}</h3>

        <div className="card-img-container">
            <img className="card-img" src={img} />
        </div>
    </div>

);

export default BoxCard;