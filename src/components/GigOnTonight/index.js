import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as ROUTES from '../../constants/routes';

import './styles.scss';
import { analyticsEvent } from '../../lib/utils';

function GigOnTonight({ id, toggleMarker, allInfo, venue, name, nearestTubes, img, bringer, history }) {

    let newPaneInfo = {
        id: id,
        zoom: [15], // when we click on a homepage gig, we want
        // mapbox to zoom in on it, so this is passed through Redux.

        heading: name,
        subheading: `@ ${venue}`,
        paragraph: allInfo.blurb,
        nights: allInfo.nights,
        img: img,
        lng: allInfo.lng,
        lat: allInfo.lat,
        walkins: allInfo.walkins,
        walkinSignUp: allInfo.walkinSignUp,
        prebook: allInfo.prebook,
        prebookSignUp: allInfo.prebookSignUp,
        bringer: bringer,
        nearestTubes: nearestTubes,
        twitterHandle: allInfo.twitterHandle,
        website: allInfo.website,
        howToBook: allInfo.howToBook,
        venue: venue,   
    }

    const reRouteToMap = () => {
        analyticsEvent(`clicked-gig-2nite-${newPaneInfo.heading}`);
        toggleMarker(newPaneInfo);
        history.push('/datamap');
    }

    const [ props ] = useSpring(() => ({
        opacity: 1,
        marginTop: 0,
        color: 'white',
        from: { opacity: 0, marginTop: -500 },
        delay: '1000'
     }))

    return (

        <animated.div style={props}>
            <div onClick={() => reRouteToMap()} className="col-sm-3 div__each-gig-tonight">
                <div className="div__inner-box">
                    <div className="row">
                        <img 
                            className="img__gig-tonight-img"
                            src={img}
                            alt="gigs happening tonight logo"
                        />
                        <div className="col-sm-7 gig-name">
                            <h4 className="h4__gig-tonight margin-off">{name}</h4>
                            <p className="white margin-off">@ {venue}</p>
                        </div>
                        <div className="col-sm-7 div__stack-underground">
                            <img
                                className="img__underground"
                                alt="gigs happening tonight tube station"
                                src="https://cdn0.iconfinder.com/data/icons/usefull-geo-points-for-maps/512/london-metro-metropolitan-underground-label-sign-512.png"
                            />
                            <p className="p__gig-tonight-info white margin-off">{nearestTubes[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>
    )
    
}


const mapStateToProps = state => ({
    filters: state.dataMapPage.filters,
})

const mapDispatchToProps = dispatch => ({
    toggleMarker: (paneInfo) => dispatch({ type: 'USER_CLICKED_MARKER', paneInfo }),
    userFiltered: (chosenFilter) => dispatch({ type: 'USER_CLICKED_FILTER', filter: chosenFilter }),
})
export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(GigOnTonight)
