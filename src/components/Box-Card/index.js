import React, { Component } from 'react'
import { trimStringSpecifically } from '../../lib/utils';
import './styles.scss';

const BoxCard = ({ img, blurb, headline, link }) => (
    <div className="box-card" onClick={() => null}>
        <h4 className="card-h4">{trimStringSpecifically(headline, 89)}</h4>
        <p className="card-p">{trimStringSpecifically(blurb, 110)}</p>

        <div className="card-img-container">
            <img className="card-img" src={img} />
        </div>
    </div>
);

export default BoxCard;