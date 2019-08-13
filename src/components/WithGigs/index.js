import React from 'react';
import { connect } from 'react-redux';

import { allFilterButtonObjects } from '../../lib/utils';
import mockGigs from '../../mocks/gigs.json';

import { GOT_GIGS, GET_GIGS } from './constants';

const WithGigs = PlatformSpecificComponent => {
    class Inner extends React.Component {
        constructor() {
            super();
            this.state = {
                rawUrl: '',
                retrievedGigs: [],
                gigs: [],
            }
            
        }

        componentDidMount = () => {
            if (process.env.NODE_ENV === 'production') {
                this.fetchAllGigs();
            } else if (process.env.NODE_ENV === 'development') {
                this.fetchMockGigs();
            }
        }

        fetchMockGigs = () => {
            this.props.updateStateFetchingGigs();
            this.props.updateStateWithAllGigs(mockGigs.gigs);
        }

        fetchAllGigs = async () => {
            this.props.updateStateFetchingGigs();
            let res = await fetch(`https://api.github.com/gists/${process.env.REACT_APP_GIG_GIST}`);
            let json = await res.json();
            let rawGigResponse = await fetch(json.files.gigs.raw_url);
            let rawGigJson = await rawGigResponse.json();
            // ^^ calls the github gist api & dumps all gigs into redux 
            this.props.updateStateWithAllGigs(rawGigJson.gigs);

        }

        render() {
            return <PlatformSpecificComponent {...this.props} />
        }
    }

    // const mapStateToProps = state => ({
    //     gigs: state.gigs.gigs,
    // });
    
    const mapDispatchToProps = dispatch => ({
        updateStateFetchingGigs: () => dispatch({ type: GET_GIGS }),
        updateStateWithAllGigs: (gigs) => dispatch({ type: GOT_GIGS, gigs }),
    });

    return connect(null, mapDispatchToProps)(Inner);

}


export default WithGigs;
