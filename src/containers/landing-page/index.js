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
import { RichText } from 'prismic-reactjs';

import './styles.scss';
import { analyticsPage } from '../../lib/utils';

class App extends Component {

  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    analyticsPage('landing-page');
    this.props.pageLoading();
    this.props.showProgressBar(true);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100);
    this.props.pageLoaded();
  }

  handleClick = () => {
    // console.log('clicked signin')
    this.props.history.push(ROUTES.SIGN_IN);
  }

  render() {

    const { pages } = this.props;

    return (
      <div id="landing-page">
        <Container>
            <Row className="div__landing-page-row">
              { pages && pages.length !== 0 && pages.map((each, i) => {
                if (each.uid.includes('welcome') === true) {
                  return (
                    <>
                      <RichText
                        key={i}
                        render={each.data.title}
                      />

                      <img
                        src={each.data.image.url}
                        width={each.data.image.dimensions.width}
                        height={each.data.image.dimensions.height} alt="London Open Mic Comedy Signup For Acts"
                      />

                      
                      
                    </>
                  )
                }
              })}
              {/* <ParallaxCard onClick={this.handleClick} /> */}
            </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.landingPage.isLoading,
  pages: state.prismic.pages,
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