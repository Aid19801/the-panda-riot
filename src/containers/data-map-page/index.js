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
import MapBox from './map';
import './styles.scss';

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});


class DataMapPage extends Component {
  constructor() {
    super()
    this.state = {
        isOpen: false,
        paneInfo: {
          heading: 'select a marker',
          subheading: 'for more information',
          paragraph: 'about that gig...',
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
      subheading: data.venue,
      paragraph: data.blurb,
      nights: data.nights,
      img: data.img,
    }
    this.setState({ isOpen: !this.state.isOpen, paneInfo: newPaneInfo });
  }

  render() {
    const { isOpen, paneInfo } = this.state;
    const { heading, subheading, paragraph, nights, img } = paneInfo;

    return (
      <Container className="aid-cont">
        <Row className="aid-row">
          <Col className="aid-col" sm={7}>
            <MapBox selectMarker={this.handleSelectMarker} />
          </Col>


          <Col className="aid-col" sm={5}>
            <Box className="info-pane" pose={isOpen ? 'visible' : 'hidden'}>
              <div className="meta">
                <h1>{this.state.paneInfo.heading}</h1>
                <p>{this.state.paneInfo.subheading}</p>
                <p>{this.state.paneInfo.paragraph}</p>
              </div>
              <div className="bg-img-div">
                <img className="bg-img" src={this.state.paneInfo.img} />
              </div>

            </Box>
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