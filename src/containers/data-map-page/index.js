import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Helmet } from 'react-helmet';

import { withAuthorization } from '../../components/Session';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
import { InfoCard } from './info-card';
import { MapBox } from './map';
import { YouTubeEmbed, TwitterEmbed, Filters, PageTitle } from '../../components';

import LaptopIcon from './icons/laptop-icon';
import CalendarIcon from './icons/calendar-icon';
import VenueIcon from './icons/venue-icon';
import BringerIcon from './icons/bringer-icon';
import WalkinsIcon from './icons/walkins-icon';
import PrebookIcon from './icons/prebook-icon';
import RatingIcon from './icons/rating-icon';

import * as actions from './constants';

import { analyticsPage } from '../../lib/utils';

import './styles.scss';

const showYouTube = false;

// function initializeReactGA(str) {
//   ReactGA.initialize('UA-143364010-1');
//   ReactGA.pageview('/home');
// }

class DataMapPage extends Component {
  constructor() {
    super()
    this.state = {
        toggleMarker: false,
    };
  }
  
  componentWillMount() {
    analyticsPage('datamap');
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
      isSelected: true,
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
    this.props.updateStateSelectedGig(data.id, this.props.gigs);
    this.setState({ toggleMarker: !this.state.toggleMarker, showPanels: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.paneInfo !== this.props.paneInfo) {
      setTimeout(() => {
        this.setState({ toggleMarker: !this.state.toggleMarker });
      }, 1000);
    }
  }

  render() {
    const { toggleMarker } = this.state;
    const { paneInfo, gigs, showPanels } = this.props;

    return (
      <>
      <Helmet>
          <title>Helmet title tag gig map</title>
          <meta name="description" content="meta regular description" />
          <meta name="og:description" content="helmet meta og description" />
          <meta name="og:image" content="https://pbs.twimg.com/media/D6C0oplWkAAZ4mw.jpg" />
          <meta name="og:title" content="helmet meta og title" />
          <meta name="og:url" content="https://www.thepandariot.com/datamap" />
      </Helmet>

      <Container>
        <PageTitle text="#gigs" />
        <Row className="full-width-row">
          <Col className="aid-col" sm={7}>
            <MapBox
              selectMarker={this.handleSelectMarker}
              lng={paneInfo.lng}
              lat={paneInfo.lat}
              gigs={gigs}
              />
          </Col>
          <Col className="aid-col" sm={5}>
            <InfoCard
              paneInfo={paneInfo}
              toggleMarker={toggleMarker}
              />
          </Col>
        </Row>

        <Row className="row-short-height">
          <Filters />
        </Row>

        { showPanels && 
        <Row className="centered-row more-info-row">
          <Col className="more-info-cols" sm={4}>
            
            <div className="more-info-each-row">
              <LaptopIcon />
              <h3>Website: </h3>{paneInfo.website ? <p onClick={() => window.open(paneInfo.website,'_newtab')}>Click Here</p> : <p>tbc</p> }
            </div>

            <div className="more-info-each-row">
              <CalendarIcon />
              <h3 className="slightly-smaller">How To Book: </h3>{paneInfo.howToBook ? <p onClick={() => window.open(paneInfo.howToBook,'_newtab')}>Click Here</p>  : <p>tbc</p> }
            </div>

            <div className="more-info-each-row">
              <VenueIcon />
              <h3>Venue: </h3><p>{paneInfo.venue ? paneInfo.venue : 'tbc'}</p>
            </div>
          </Col>
          <Col className="more-info-cols" sm={4}>
            <div className="more-info-each-row">
              <BringerIcon />
              <h3>Bringer: </h3>
              <p>{paneInfo.bringer ? 'yes' : 'no'}</p>
            </div>
            <div className="more-info-each-row">
              <WalkinsIcon />
              <h3>Walk Ins: </h3>
              <p>{paneInfo.walkins ? 'yes' : 'no'}</p>
            </div>
            <div className="more-info-each-row">
              <PrebookIcon />
              <h3>Pre Book: </h3>
              <p>{paneInfo.prebook ? 'yes' : 'no'}</p>
            </div>
          </Col>
          <Col className="more-info-cols" sm={4}>
            <div className="more-info-each-row">
              <RatingIcon />
              <h3>Rating: </h3><p>coming soon...</p>
            </div>
            <div className="more-info-each-row">
              <h3 onClick={() => window.open('https://twitter.com/thePandaRiot','_newtab')} style={{ color: 'black' }}>Get My Gig Here For Free! </h3>
            </div>
          </Col>
        </Row> }
        <Row className="centered-row full-width">
        
        { paneInfo.twitterHandle ? (
          <>
          <Col className="carousel-columns" sm={12}>
            { showPanels && paneInfo.twitterHandle && <TwitterEmbed twitterHandle={paneInfo.twitterHandle} /> }
          </Col>
          </>
        )
          : null
        }
          <Col className="carousel-columns" sm={ paneInfo.twitterHandle ? 6 : 12}>
            { showPanels && showYouTube && <YouTubeEmbed heading={paneInfo.heading} term={`${paneInfo.heading} London standup comedy`} /> }
          </Col>
        </Row>
      </Container>
      </>
    )
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  showPanels: state.dataMapPage.showPanels,
  isLoading: state.homePage.isLoading,
  paneInfo: state.dataMapPage.paneInfo,
  gigs: state.dataMapPage.gigs,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.DATAMAP_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.DATAMAP_PAGE_LOADED }),
  toggleMarker: (paneInfo) => dispatch({ type: actions.USER_CLICKED_MARKER, paneInfo }),
  updateStateSelectedGig: (id, gigs) => dispatch({ type: actions.SELECTED_GIG, id, gigs })
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(DataMapPage);