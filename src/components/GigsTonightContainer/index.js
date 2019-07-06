import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.scss';

import GigOnTonight from '../GigOnTonight';

const GigsOnTonightContainer = ({ fetchGigsTonight, gigs }) => {

    useEffect(() => {
        fetchGigsTonight()
    }, [])

    return (

        <div className="div__gigs-tonight-section row fluid padding-on margin-on">
            <h4 className="col-sm-12 center">Happening Tonight</h4>

            { gigs && gigs.length > 0 && 
                gigs.map((each, i) => {
                    return (
                        <GigOnTonight
                            key={i}
                            id={each.id}
                            nearestTubes={each.nearestTubes}
                            name={each.name}
                            bringer={each.bringer}
                            img={each.img}
                            venue={each.venue}
                            allInfo={each}
                        />
                    )
                })
            }
        </div>
    )
}
const mapStateToProps = (state) => ({
    gigs: state.fetchGigsTonight.gigs,
})

const mapDispatchToProps = (dispatch) => ({
    fetchGigsTonight: () => dispatch({ type: 'FETCH_GIGS_TONIGHT' })
})

export default connect(mapStateToProps, mapDispatchToProps)(GigsOnTonightContainer);