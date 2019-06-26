import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import request from 'superagent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import * as ROUTES from '../../constants/routes';

import withProgressBar from '../../components/ProgressBar/with-progressBar';
import * as actions from './constants';
import ParallaxCard from './parallax-card';
import './styles.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    this.props.pageLoading();
    this.props.showProgressBar(true);
    // this.fetchPhotos();
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100);
    this.props.pageLoaded();
  }

  // fetchPhotos() {
  //     fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${process.env.REACT_APP_INSTA_KEY}`, {
  //       method: 'GET',
  //       cache: 'force-cache',
  //     })
  //     .then((res) => {
  //       console.log('11111 res ', res.json())
  //       this.setState({
  //         photos: res.body.data
  //       })
  //     })
  // }

  handleClick = () => {
    // console.log('clicked signin')
    this.props.history.push(ROUTES.SIGN_IN);
  }

  render() {

    return (
      <div id="landing-page">
        <Container>
            <Row className="div__landing-page-row">
              <ParallaxCard onClick={this.handleClick} />
            </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.landingPage.isLoading,
})

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.LANDING_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.LANDING_PAGE_LOADED })
})

export default compose(
  withProgressBar,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);