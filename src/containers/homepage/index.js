import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { withAuthorization } from '../../components/Session';
import { BoxCard } from '../../components/';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
import { mockNews } from '../../mock-news';

import request from 'superagent';

import './styles.scss';

const ACCESS_TOKEN = process.env.REACT_APP_INSTA_KEY;

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      isSelected: false,
      photos: [],
      firstRow: [],
      secondRow: [],
      thirdRow: [],
      fourthRow: [],
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
      .get(mockNews)
      .then(res => {
        let firstRow = res.req.url.slice(0, 3);
        let secondRow = res.req.url.slice(3, 6);
        this.setState({ firstRow, secondRow })
      })
      .catch(err => {
        console.log('err is ', err);
      })
  }

  render() {
    
    const { firstRow, secondRow } = this.state;

    return (
      <>
      <button onClick={this.handleClick}>Click Me</button>
      <Container>
        <Row className="top-row">

            { firstRow.map((each, i) => {
              return (
                <>
                <Col sm={4}>
                  <BoxCard key={i} img={each.img} headline={each.headline} blurb={each.blurb} />
                </Col>
                </>
              )
              }) }
        </Row>

        <Row className="mid-row">

            { secondRow.map((each, i) => {
              return (
                <>
                <Col sm={4}>
                  <BoxCard key={i} img={each.img} headline={each.headline} blurb={each.blurb} />
                </Col>
                </>
              )
              }) }
        </Row>

        <Row className="bottom-row">

            { firstRow.map((each, i) => {
              return (
                <>
                <Col sm={4}>
                  <BoxCard key={i} img={each.img} headline={each.headline} blurb={each.blurb} />
                </Col>
                </>
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