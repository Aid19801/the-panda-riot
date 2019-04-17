import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import posed from 'react-pose';

import { withAuthorization } from '../../components/Session';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
import { useSpring, animated } from 'react-spring';
import { InfoCard } from './info-card';

import MapBox from './map';
import './styles.scss';

class DataMapPage extends Component {
  constructor() {
    super()
    this.state = {
        isOpen: false,
        paneInfo: {
          heading: 'select a marker',
          subheading: 'for more information',
          paragraph: 'about a gig...',
          nights: [],
          img: '',
        }
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
    }
    this.setState({ isOpen: !this.state.isOpen, paneInfo: newPaneInfo });
  }

  render() {
    const { isOpen, paneInfo } = this.state;

    return (
      <Container className="aid-cont">
        <Row className="aid-row">
          <Col className="aid-col" sm={7}>
            <MapBox selectMarker={this.handleSelectMarker} />
          </Col>


          <Col className="aid-col" sm={5}>
            <InfoCard paneInfo={paneInfo} />
          </Col>
        </Row>
      </Container>
    )
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  isLoading: state.homePage.isLoading,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.DATAMAP_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.DATAMAP_PAGE_LOADED }),
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(DataMapPage);