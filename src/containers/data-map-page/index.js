import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { withAuthorization } from '../../components/Session';
import { Divider } from '../../components';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
import { trimString } from '../../lib/utils';
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
    this.props.pageLoaded();
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100)
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
    return (
      <Container className="aid-cont">
        <Row className="aid-row">
          <Col className="aid-col" sm={6}>
            <MapBox selectMarker={this.handleSelectMarker} />
          </Col>


          <Col className="aid-col" sm={6}>

            <div className="rotating-div">
              <div className="meta">
                <img src={this.state.paneInfo.img} />
                <h3>{this.state.paneInfo.heading}</h3>
                <h4>{this.state.paneInfo.subheading}</h4>
                <p>{this.state.paneInfo.paragraph}</p>

                <div className="nights-container">
                  <ul>
                    {this.state.paneInfo.nights.map((each, i) => {
                      return <li key={i}>{each}</li>
                    })}
                  </ul>
                </div>
              </div>
            </div>

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