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
import placeholder from '../../mocks/placeholder.png';
import './styles.scss';

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      isSelected: false,
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
    request
      .get('https://the-panda-riot-news-server.herokuapp.com/articles')
      .then(res => {
        let firstRow = res.body.slice(0, 3);
        let secondRow = res.body.slice(3, 6);
        let thirdRow = res.body.slice(6, 9);
        return this.setState({ firstRow, secondRow, thirdRow })
      })
      .catch(err => {
        return console.log('err is ', err);
      })
  }

  render() {
    
    const { firstRow, secondRow, thirdRow } = this.state;

    return (
      <>
      <Container>

      <Row className="adverts-row">      
          <Col className="mob-margin-bottom" sm={4}>
            <AdvertBox
              link="https://google.com" src={require('../../mocks/placeholder.png')} text="You Wont Believe What Kim Basinger Looks Like Now!" />
          </Col>
          <Col className="mob-margin-bottom" sm={4}>
            <AdvertBox
              link="https://google.com" src={require('../../mocks/placeholder.png')} text="You Wont Believe What Kim Basinger Looks Like Now!" />
          </Col>
          <Col className="mob-margin-bottom" sm={4}>
            <AdvertBox
              link="https://google.com" src={require('../../mocks/placeholder.png')} text="You Wont Believe What Kim Basinger Looks Like Now!" />
          </Col>
        </Row>
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