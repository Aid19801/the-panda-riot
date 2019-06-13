import React, { useState, useEffect } from 'react';
import { whatDayIsIt } from '../../lib/utils';
import Gists from 'gists';
import './styles.scss';

import GigOnTonight from '../GigOnTonight';

const GigsOnTonightContainer = () => {

    const [ gigs, setGigs ] = useState([]);
    
    const gists = new Gists({ token: process.env.REACT_APP_TPR_SCRAPER_TOKEN });
    const today = whatDayIsIt();

    useEffect(() => {
        fetchGigs()
    }, [])

    const fetchGigs = async () => {
        try {
            let rawURL = await gists.get(process.env.REACT_APP_GIG_GIST)
                .then(res => res.body.files.gigs.raw_url)
                .catch(err => console.log('error fetching gigs 1.0: ', err));

            let allGigs = await fetch(rawURL)
                .then(res => res.json())
                .then(json => json)
                .catch(err => console.log('error fetching gigs 1.1:', err))

            let tonightsGigs = await allGigs.gigs.filter(each => each.nights.includes(today) === true);

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