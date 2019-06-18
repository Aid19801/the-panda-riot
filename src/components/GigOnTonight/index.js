import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as ROUTES from '../../constants/routes';
// import * as actions from './constants';

import './styles.scss';

function GigOnTonight({ toggleMarker, allInfo, venue, name, nearestTubes, img, bringer, history }) {

    let newPaneInfo = {
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
        toggleMarker(newPaneInfo);
        history.push('/datamap');
    }

    return (
        <div onClick={() => reRouteToMap()} className="col-sm-3 div__each-gig-tonight">

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

// const mapStateToProps = state => ({

// })

const mapDispatchToProps = dispatch => ({
    toggleMarker: (paneInfo) => dispatch({ type: 'USER_CLICKED_MARKER', paneInfo }),
})
export default compose(
    withRouter,
    connect(null, mapDispatchToProps),
)(GigOnTonight)
