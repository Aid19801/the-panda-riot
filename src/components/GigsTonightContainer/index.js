import React, { useState, useEffect } from 'react';
import { whatDayIsIt } from '../../lib/utils';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Gists from 'gists';

import GigOnTonight from '../GigOnTonight';


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

    const sortGigs = (a, b) => {
        console.log('AT | sortGigs fired');
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return comparison;
    }

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
        <Row>
            { gigs && gigs.length > 0 && 
                gigs.map((each, i) => {
                    return (
                        <GigOnTonight
                            key={each.id}
                            nearestTubes={each.nearestTubes}
                            name={each.name}
                            bringer={each.bringer}
                            img={each.img}
                        />
                    )
                })
            }
        </Row>
    )
}

export default GigsOnTonightContainer;