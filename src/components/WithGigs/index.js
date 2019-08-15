import React from 'react';
import { connect } from 'react-redux';
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
            this.props.updateStateFetchingGigs(); // just app state changing/logging
            this.props.updateStateWithAllGigs(mockGigs.gigs); // loads all gigs into Store
            this.setState({ gigs: mockGigs.gigs }) // loads gigs in locally
        }

        fetchAllGigs = async () => {
            this.props.updateStateFetchingGigs();
            let res = await fetch(`https://api.github.com/gists/${process.env.REACT_APP_GIG_GIST}`);
            let json = await res.json();
            let rawGigResponse = await fetch(json.files.gigs.raw_url);
            let rawGigJson = await rawGigResponse.json();
            // ^^ calls the github gist api & dumps all gigs into redux 

            this.setState({ gigs: rawGigJson.gigs });

            this.props.updateStateWithAllGigs(rawGigJson.gigs);
        }

        componentWillReceiveProps = nextProps => {
            console.log('nextProps: ', nextProps.gigs);
            if (this.props.gigs === nextProps.gigs) {
                return;
            }

            if (this.props.gigs !== nextProps.gigs) {

            }
            console.log('this props: ', this.props.gigs);
        }
        render() {
            return <PlatformSpecificComponent {...this.props} />
        }
    }

    const mapStateToProps = state => ({
        gigs: state.gigs.gigs,
        filters: state.filters.filters,
    });
    
    const mapDispatchToProps = dispatch => ({
        updateStateFetchingGigs: () => dispatch({ type: GET_GIGS }),
        updateStateWithAllGigs: (gigs) => dispatch({ type: GOT_GIGS, gigs }),
    });

    return connect(mapStateToProps, mapDispatchToProps)(Inner);

}


export default WithGigs;
