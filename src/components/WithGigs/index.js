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
                gigs: [],
            }
            
        }

        componentDidMount = () => {

            this.setState({ filters: this.props.filters });

            if (process.env.NODE_ENV === 'production') {
                this.fetchAllGigs();
            } else if (process.env.NODE_ENV === 'development') {
                this.fetchMockGigs();
            }
        }

        fetchMockGigs = () => {
            this.props.updateStateFetchingGigs(); // just app state changing/logging
            this.props.updateStateGotGigs();
            // this.props.updateStateWithAllGigs(mockGigs.gigs); // loads all gigs into Store
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
            if (this.state.filters === nextProps.filters) {
                return;
            }

            const activeFilters = nextProps.filters.filter((each) => each.active === true);

            for (let i = 0; i < activeFilters.length; i++) {
                if (activeFilters[i].filterName === 'Bringers') {
                    setTimeout(() => {
                        let gigsThatMatchFilter = this.state.gigs.filter(each => each.bringer === true)
                        this.setState({ gigs: gigsThatMatchFilter });
                    }, 500)
                }
                if (activeFilters[i].filterName === 'Non-bringers') {
                    setTimeout(() => {
                        let gigsThatMatchFilter = this.state.gigs.filter(each => each.bringer === false)
                        console.log('non bringers: ', gigsThatMatchFilter)
                        this.setState({ gigs: gigsThatMatchFilter });
                    }, 500)
                }
                if (activeFilters[i].filterName === 'Mon') {
                    setTimeout(() => {
                        let gigsThatMatchFilter = this.state.gigs.filter(each => each.nights.includes('Mon'))
                        this.setState({ gigs: gigsThatMatchFilter });
                    }, 500)
                }
                if (activeFilters[i].filterName === 'Tue') {
                    setTimeout(() => {
                        let gigsThatMatchFilter = this.state.gigs.filter(each => each.nights.includes('Tue'))
                        this.setState({ gigs: gigsThatMatchFilter });
                    }, 500)
                }
                if (activeFilters[i].filterName === 'Wed') {
                    setTimeout(() => {
                        let gigsThatMatchFilter = this.state.gigs.filter(each => each.nights.includes('Wed'))
                        this.setState({ gigs: gigsThatMatchFilter });
                    }, 500)
                }
                if (activeFilters[i].filterName === 'Thu') {
                    setTimeout(() => {
                        let gigsThatMatchFilter = this.state.gigs.filter(each => each.nights.includes('Thu'))
                        this.setState({ gigs: gigsThatMatchFilter });
                    }, 500)
                }
                if (activeFilters[i].filterName === 'Fri') {
                    setTimeout(() => {
                        let gigsThatMatchFilter = this.state.gigs.filter(each => each.nights.includes('Fri'))
                        console.log('fri: ', gigsThatMatchFilter)
                        this.setState({ gigs: gigsThatMatchFilter });
                    }, 500)
                }
                if (activeFilters[i].filterName === 'Sat') {
                    setTimeout(() => {
                        let gigsThatMatchFilter = this.state.gigs.filter(each => each.nights.includes('Sat'))
                        this.setState({ gigs: gigsThatMatchFilter });
                    }, 500)
                }
                if (activeFilters[i].filterName === 'Sun') {
                    setTimeout(() => {
                        let gigsThatMatchFilter = this.state.gigs.filter(each => each.nights.includes('Sun'))
                        this.setState({ gigs: gigsThatMatchFilter });
                    }, 500)
                }
            }

        }

        // shouldComponentUpdate = () => {
        //     return this.state.gigs.length === 0;
        // }

        render() {
            console.log('this state ', this.state.gigs)
            return <PlatformSpecificComponent {...this.props} gigs={this.state.gigs} />
        }
    }

    const mapStateToProps = state => ({
        // gigs: state.gigs.gigs,
        filters: state.filters.filters,
    });
    
    const mapDispatchToProps = dispatch => ({
        updateStateFetchingGigs: () => dispatch({ type: GET_GIGS }),
        updateStateGotGigs: () => dispatch({ type: GOT_GIGS }),
    });

    return connect(mapStateToProps, mapDispatchToProps)(Inner);

}


export default WithGigs;
