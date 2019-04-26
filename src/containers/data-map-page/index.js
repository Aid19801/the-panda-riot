import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { withAuthorization } from '../../components/Session';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
import { InfoCard } from './info-card';
import { MapBox } from './map';
import { YouTubeEmbed, TwitterEmbed } from '../../components';
import * as actions from './constants';

import mockGigs from './mock-gigs.json';

import './styles.scss';
import Filters from './filters';

class DataMapPage extends Component {
  constructor() {
    super()
    this.state = {
        toggleMarker: false,
        showPanels: false,
        mockGigs: [],
    };
  }
  
  componentWillMount() {

    this.setState({
      mockGigs: mockGigs.gigs,
    });

    this.props.showProgressBar(true);
    this.props.pageLoading();
  }

  componentDidMount() {
    
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100)
    this.props.pageLoaded();
  }

  handleSelectMarker = (data) => {
    
    let newPaneInfo = {
      heading: data.name,
      subheading: `@ ${data.venue}`,
      paragraph: data.blurb,
      nights: data.nights,
      img: data.img,
      imgs: data.imgs,
      lng: data.lng,
      lat: data.lat,
      walkins: data.walkins,
      walkinSignUp: data.walkinSignUp,
      prebook: data.prebook,
      prebookSignUp: data.prebookSignUp,
      bringer: data.bringer,
      nearestTubes: data.nearestTubes,
      twitterHandle: data.twitterHandle,
      website: data.website,
      howToBook: data.howToBook,
      venue: data.venue,
    }

    this.props.toggleMarker(newPaneInfo);
    this.setState({ toggleMarker: !this.state.toggleMarker, showPanels: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.paneInfo !== this.props.paneInfo) {
      setTimeout(() => {
        this.setState({ toggleMarker: !this.state.toggleMarker });
      }, 1000);
    }
  }

  filterBringers = () => {
    let bringers = this.state.mockGigs.filter(each => each.bringer === true);
    this.setState({ mockGigs: bringers })
  }
  
  filterNonBringers = () => {
    let nonBringers = this.state.mockGigs.filter(each => each.bringer === false);
    this.setState({ mockGigs: nonBringers })
  }

  clearFilters = () => this.setState({ mockGigs: mockGigs.gigs });

  filterDayOfWeek = (day) => {
    let theDaysGigs = this.state.mockGigs.filter(each => each.nights.includes(day));
    this.setState({ mockGigs: theDaysGigs });
  }

  onSelectFilter = (filterName) => {
    switch(filterName) {
      case 'bringers':
        console.log('you filtered bringers');
        this.filterBringers();
        break;
      
      case 'all':
        console.log('clear filters');
        this.clearFilters();
        break;

      case 'non-bringers':
        console.log('non bringers filtered');
        this.filterNonBringers();
        break;

      case 'Mon':
        console.log('monday filtered');
        this.filterDayOfWeek(filterName);
        break;
      
      case 'Tue':
        console.log('tuesday filtered');
        this.filterDayOfWeek(filterName);
        break;

      default:
      console.log('not filtering bringers');
      return;
    }
  }

  render() {
    const { toggleMarker, showPanels, mockGigs } = this.state;
    const { paneInfo } = this.props;

    return (
      <>
      <Container>
        <Row className="full-width-row">
          <Col className="aid-col" sm={7}>
            <MapBox
              selectMarker={this.handleSelectMarker}
              lng={paneInfo.lng}
              lat={paneInfo.lat}
              mockGigs={mockGigs}
              />
          </Col>
          <Col className="aid-col" sm={5}>
            <InfoCard
              paneInfo={paneInfo}
              toggleMarker={toggleMarker}
              />
          </Col>
        </Row>

        <Row className="full-width-row">
          <Filters onSelectFilter={this.onSelectFilter} />
        </Row>

        { showPanels && 
        <Row className="centered-row more-info-row">
          <Col className="more-info-cols" sm={4}>
            <div className="more-info-each-row">
              <h3>Website: </h3><p>{paneInfo.website ? paneInfo.website : 'tbc'}</p>
            </div>
            <div className="more-info-each-row">
              <h3>How To Book: </h3>{paneInfo.howToBook ? <p>Click <a href={paneInfo.howToBook}>Here</a></p> : <p>tbc</p> }
            </div>
            <div className="more-info-each-row">
              <h3>Venue: </h3><p>{paneInfo.venue ? paneInfo.venue : 'tbc'}</p>
            </div>
          </Col>
          <Col className="more-info-cols" sm={4}>
            <div className="more-info-each-row">
              <h3>Bringer: </h3>
              <p>{paneInfo.bringer ? 'yes' : 'no'}</p>
            </div>
            <div className="more-info-each-row">
              <h3>Walk Ins: </h3>
              <p>{paneInfo.walkins ? 'yes' : 'no'}</p>
            </div>
            <div className="more-info-each-row">
              <h3>Pre Book: </h3>
              <p>{paneInfo.prebook ? 'yes' : 'no'}</p>
            </div>
          </Col>
          <Col className="more-info-cols" sm={4}>
            <div className="more-info-each-row">
              <h3>Rating: </h3><p>coming soon...</p>
            </div>
            <div className="more-info-each-row">
              <h3 style={{ color: 'black' }}>Get My Gig Here For Free! </h3>
            </div>
          </Col>
        </Row> }
        <Row className="centered-row">
        
        { paneInfo.twitterHandle ? (
          <>
          <Col className="carousel-columns" sm={6}>
            { showPanels && paneInfo.twitterHandle && <TwitterEmbed twitterHandle={paneInfo.twitterHandle} /> }
          </Col>
          </>
        )
          : null
        }
          <Col className="carousel-columns" sm={ paneInfo.twitterHandle ? 6 : 12}>
            { showPanels && <YouTubeEmbed heading={paneInfo.heading} term={`${paneInfo.heading} London standup comedy`} /> }
          </Col>
        </Row>
      </Container>
      </>
    )
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  isLoading: state.homePage.isLoading,
  paneInfo: state.dataMapPage.paneInfo,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.DATAMAP_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.DATAMAP_PAGE_LOADED }),
  toggleMarker: (paneInfo) => dispatch({ type: actions.USER_CLICKED_MARKER, paneInfo }),
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(DataMapPage);