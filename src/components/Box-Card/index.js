import React from 'react';
import { withRouter } from 'react-router-dom';
import { trimStringSpecifically } from '../../lib/utils';
import './styles.scss';

const BoxCard = ({ id, img, blurb, headline, link, src, history }) => {
    console.log('id is ', id);
    return (
            <div className="box-card hvr-float-shadow" onClick={() => src === 'TPR' ? history.push(`/article?id=${id}`) : window.open(link,'_newtab')}>
                <h4 className="card-h4">{trimStringSpecifically(headline, 45)}</h4>
                <p className="card-p">{trimStringSpecifically(blurb, 110)}</p>
                <h3 className="card-h3" >{src}</h3>
        
                <div className="card-img-container">
                    <img alt="open mic comedy news" className="card-img" src={img} />
                </div>
            </div>
        
        );
}


export default withRouter(BoxCard);