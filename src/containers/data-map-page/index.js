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

import Map from './map';
import './styles.scss';

class DataMapPage extends Component {
  constructor() {
    super()
    this.state = {
        isOpen: false,
        selectedMarkerData: {}
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
      this.setState({ isOpen: !this.state.isOpen, selectedMarkerData: data });
  }

  render() {
    return (
      <Container>
        <Row>
          { !this.state.isOpen && 
          <Col sm={12}>
            <Map selectMarker={this.handleSelectMarker}/>
          </Col>
          }
          {
            this.state.isOpen && (
                <>
                <Col sm={4}>
                    <div className="info-container">
                      
                      <div className="img-container">
                        <img className="img" src={this.state.selectedMarkerData.img} />
                      </div>

                      <Divider />

                      <div className="info">
                        <h1>{this.state.selectedMarkerData.name}</h1>
                        <p>{this.state.selectedMarkerData.blurb}</p>
                      </div>


                    </div>
                </Col>
                <Col sm={8}>
                    <Map selectMarker={this.handleSelectMarker}/>
                </Col>
                </>
            )
          }
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