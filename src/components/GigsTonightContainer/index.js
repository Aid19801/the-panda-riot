import React, { useState, useEffect } from 'react';
import { whatDayIsIt } from '../../lib/utils';
import Row from 'react-bootstrap/Row';
import Gists from 'gists';
import './styles.scss';

import GigOnTonight from '../GigOnTonight';
import { Spinner } from '..';


 let mockProps = {
     name: 'Funny Feckers',
     img: 'https://cdn.psychologytoday.com/sites/default/files/styles/collection_545x321/public/article/2000/11/22238-95587-teaser.jpeg?itok=32g4SwAe',
     nearestTubes: ['Camden Town', 'Notting Hill Gate'],
     bringer: true,
 }
const GigsOnTonightContainer = () => {

    const [ gigs, setGigs ] = useState([]);
    
    const gists = new Gists({ token: process.env.REACT_APP_TPR_SCRAPER_TOKEN });
    const today = whatDayIsIt();

    useEffect(() => {
        fetchGigs()
    }, [])

    const fetchGigs = async () => {
        try {
            let rawURL = await gists.get('7c88e1645fd8518999fb9c764c0d1869')
                .then(res => res.body.files.gigs.raw_url)
                .catch(err => console.log('error fetching gigs 1.0: ', err));

            let allGigs = await fetch(rawURL)
                .then(res => res.json())
                .then(json => json)
                .catch(err => console.log('error fetching gigs 1.1:', err))

                console.log('today is:',today)
                let tonightsGigs = await allGigs.gigs.filter(each => each.nights.includes(today) === true);
                console.log('AT | tonightsGigs: ', tonightsGigs);
                setGigs(tonightsGigs);

        } catch (error) {
            console.log('🚨error retrieving gigs from GIST: ', error);
        }
    }

    return (

        <div className="div__gigs-tonight-section row fluid padding-on margin-on">
            <h4 className="col-sm-12 center">Happening Tonight</h4>

            { gigs && gigs.length > 0 && 
                gigs.map((each, i) => {
                    return (
                        <GigOnTonight
                            key={each.id}
                            id={i+1}
                            nearestTubes={each.nearestTubes}
                            name={each.name}
                            bringer={each.bringer}
                            img={each.img}
                            venue={each.venue}
                        />
                    )
                })
            }
        </div>
    )
}

export default GigsOnTonightContainer;