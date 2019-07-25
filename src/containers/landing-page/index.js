import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
// import request from 'superagent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as ROUTES from '../../constants/routes';

import withProgressBar from '../../components/ProgressBar/with-progressBar';
import * as actions from './constants';
import { RichText } from 'prismic-reactjs';

import './styles.scss';
import { analyticsPage } from '../../lib/utils';
// import { relative } from 'path';

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
      <>
      { pages && pages.length !== 0 && pages.map((each, i) => {
        if (each.uid.includes('welcome') === true) {
          console.log('each.data ==> ', each.data);
          return (
            <div
              key={i}
              id="landing-page"
              style={{
                backgroundImage: `url(${each.data["background-img"].url})`, 
                height: '500px',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',

              }}
              >
                <Container fluid={true}>

                  <Row className="lp__first-section div__flex-center">
                    <Col sm={12}>
                      <div className="div__flex-center center flex-direction-col">
                        <RichText render={each.data.title} />
                        <img
                          src={each.data["page-image"].url}
                          alt="the panda riot london comedy gig"
                          width="70%"
                          height="auto"
                          style={{ filter: 'grayscale(100%)', boxShadow: '9px 17px 22px black', maxWidth: '650px', maxHeight: '264px', marginTop: '40px' }}

                        />
                      </div>
                    </Col>
                  </Row>


                  <Row className="lp__second-section">
                    <Col sm={4}>
                      <div className="div__each-lp-box div__flex-center center flex-direction-col">
                        <img src={require('./question-mark.svg')} alt="what is this open mic comedy icon" />
                        <RichText render={each.data["first-box"]} />
                        
                      </div>
                    </Col>

                    <Col sm={4}>
                      <div className="div__each-lp-box div__flex-center center flex-direction-col">
                      <img src={require('./payment-method.svg')} alt="is this open mic comedy app free for London people?" />
                        <RichText render={each.data["second-box"]} />
                      </div>
                    </Col>


                    <Col sm={4}>
                      <div className="div__each-lp-box div__flex-center center flex-direction-col">
                      <img src={require('./laptop.svg')} alt="what extras can I get with the app?" />
                        <RichText render={each.data["third-box"]} />
                        
                      </div>
                    </Col>
                  </Row>



                  <Row
                    className="lp__third-section"
                    style={{
                      backgroundImage: `url("https://static.designmynight.com/uploads/2018/11/High-Res-Comedyroom-optimised.png")`, 
                      filter: 'grayscale(100%)',
                      height: '850px',

                      backgroundAttachment: 'fixed',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                  >

                    <Col sm={5}>
                      <div className="div__promo-box">

                        <RichText render={each.data["first-promo-box-title"]} />
                        <RichText render={each.data["first-promo-box-blurb"]} />
                        <div className="div__lp-insta-container">
                          <img src={each.data["first-promo-box-img"].url} width={300} height="auto" alt="instagram" />
                          <img src={each.data["first-promo-box-img-two"].url} width={300} height="auto" alt="instagram" />
                        </div>

                      </div>
                    </Col>

                    <Col sm={5}>
                      <div className="div__promo-box">

                        <RichText render={each.data["second-promo-box-title"]} />
                        <RichText render={each.data["second-promo-box-blurb"]} />
                        <div className="div__lp-insta-container">
                          <img src={each.data["second-promo-box-img"].url} width={300} height="auto" alt="instagram" />
                          <img src={each.data["second-promo-box-img-two"].url} width={300} height="auto" alt="instagram" />
                        </div>

                      </div>
                    </Col>
                  </Row>



                <div className="div__lp-footer">
                  <Row>
                    <Col sm={2}>
                      <div onClick={() => window.open(each.data["footer-link-one"].url, '_newtab')}>
                        <RichText render={each.data["footer-link-text-one"]} />
                      </div>
                    </Col>

                    <Col sm={2}>
                      <div onClick={() => window.open(each.data["footer-link-two"].url, '_newtab')}>
                        <RichText render={each.data["footer-link-text-two"]} />
                      </div>
                    </Col>


                    <Col sm={2}>
                      <div onClick={() => window.open(each.data["footer-link-three"].url, '_newtab')}>
                        <RichText render={each.data["footer-link-text-three"]} />
                      </div>
                    </Col>


                    <Col sm={2}>
                      <div onClick={() => window.open(each.data["footer-link-four"].url, '_newtab')}>
                        <RichText render={each.data["footer-link-text-four"]} />
                      </div>
                    </Col>


                    <Col sm={2}>
                      <div onClick={() => window.open(each.data["footer-link-five"].url, '_newtab')}>
                        <RichText render={each.data["footer-link-text-five"]} />
                      </div>
                    </Col>
                  </Row>
                </div>
                </Container>

            </div>
              )
            }
            return <div />
          })}
          </>
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