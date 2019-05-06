import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import request from 'superagent';

import { withAuthorization } from '../../components/Session';
import { AdvertBox, BoxCard } from '../../components/';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
// import { mockNews } from '../../mock-news';


import './styles.scss';

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      showSpinner: false,
      isSelected: false,
      advertsOn: false,
      photos: [],
      firstRow: [],
      secondRow: [],
      thirdRow: [],
    };
  }

  componentWillMount() {
    this.props.showProgressBar(true);
    this.props.pageLoading();
    this.fetchNews();
    this.fetchPhotos();
  }

  componentDidMount() {
    this.props.pageLoaded();
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100)
  }

  handleClick = () => {
    this.setState({ isSelected: !this.state.isSelected });
  }

  fetchPhotos() {
    request
      .get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${process.env.REACT_APP_INSTA_KEY}`)
      .then((res) => {
        this.setState({
          photos: res.body.data
        })
      })
  }

  fetchNews() {
    this.setState({ showSpinner: true, })
    request
      .get('https://the-panda-riot-news-server.herokuapp.com/articles')
      .then(res => {
        let firstRow = res.body.slice(0, 3);
        let secondRow = res.body.slice(3, 6);
        let thirdRow = res.body.slice(6, 9);
        this.setState({ firstRow, secondRow, thirdRow })
        this.setState({ showSpinner: false })
      })
      .catch(err => {
        return console.log('err is ', err);
      })
  }

  render() {
    const { firstRow, secondRow, thirdRow, advertsOn, showSpinner } = this.state;

    return (
      <>
      <Container>


        { showSpinner && (
          <>
            <Row className="spinner-row">
              { showSpinner && (
                    <>
                      <Col className="div__spinner-container" sm={4}>
                        <h3 className="div__loading-dots"></h3>
                      </Col>
                    </>
                  )
              }
            </Row>
          </>
        ) }

        <Row className="top-row">

            { firstRow.map((each, i) => {
              return (
                
                <Col key={i} className="mob-margin-bottom" sm={4}>
                  <BoxCard key={i} link={each.link} img={each.img} headline={each.headline} blurb={each.blurb} src={each.src} />
                </Col>
                
              )
              }) }
        </Row>

        <Row className="mid-row">

            { secondRow.map((each, i) => {
              return (
                
                <Col key={i} className="mob-margin-bottom" sm={4}>
                  <BoxCard key={i} link={each.link} img={each.img} headline={each.headline} blurb={each.blurb}  src={each.src} />
                </Col>
                
              )
              }) }
        </Row>

        <Row className="bottom-row">

            { thirdRow.map((each, i) => {
              return (
                
                <Col key={i} className="mob-margin-bottom" sm={4}>
                  <BoxCard key={i} link={each.link} img={each.img} headline={each.headline} blurb={each.blurb}  src={each.src} />
                </Col>
                
              )
              }) }
        </Row>

        { advertsOn && 
                <Row className="adverts-row">      
                  <Col className="mob-margin-bottom" sm={4}>
                    <AdvertBox
                      link="https://google.com" src="https://via.placeholder.com/300" text="You Wont Believe What Kim Basinger Looks Like Now!" />
                  </Col>
                  <Col className="mob-margin-bottom" sm={4}>
                    <AdvertBox
                      link="https://google.com" src="https://via.placeholder.com/300" text="You Wont Believe What Kim Basinger Looks Like Now!" />
                  </Col>
                  <Col className="mob-margin-bottom" sm={4}>
                    <AdvertBox
                      link="https://google.com" src="https://via.placeholder.com/300" text="You Wont Believe What Kim Basinger Looks Like Now!" />
                  </Col>
                </Row>

        }

      </Container>
      </>
    )
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  isLoading: state.homePage.isLoading,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.HOME_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.HOME_PAGE_LOADED }),
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);