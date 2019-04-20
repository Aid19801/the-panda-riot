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
import { Carousel } from '../../components';
import * as actions from './constants';

import './styles.scss';

class DataMapPage extends Component {
  constructor() {
    super()
    this.state = {
        toggleMarker: false,
    };
  }
  
  componentWillMount() {
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
    }

    this.props.toggleMarker(newPaneInfo);
    this.setState({ toggleMarker: !this.state.toggleMarker });
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
    const { paneInfo } = this.props;

    return (
      <Container>
        <Row>
          <Col className="aid-col" sm={7}>
            <MapBox
              selectMarker={this.handleSelectMarker}
              lng={paneInfo.lng}
              lat={paneInfo.lat}
              />
          </Col>


          <Col className="aid-col" sm={5}>
            <InfoCard
              paneInfo={paneInfo}
              toggleMarker={toggleMarker}
              />
          </Col>
        </Row>
        <Row className="centered-row">
          <Col sm={12}>
            <Carousel info={paneInfo} />
          </Col>
        </Row>
      </Container>
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