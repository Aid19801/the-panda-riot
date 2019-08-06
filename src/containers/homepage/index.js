import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import request from 'superagent';

import { withAuthorization } from '../../components/Session';
import { AdvertBox, Spinner, BoxCard, 
  ImageBox, PageTitle, GigsOnTonightContainer } from '../../components/';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';


import './styles.scss';
import { analyticsPage, analyticsEvent } from '../../lib/utils';
import withPrismicStories from '../../components/Prismic/with-prismic-stories';

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      photosRetrieved: false,
      articlesHaveLoaded: false,
      showSpinner: false,
      isSelected: false,
      advertsOn: false,
      photos: [],
      morePhotos: [],
      articles: [],
      firstRow: [],
      secondRow: [],
      thirdRow: [],
      fourthRow: [],
    };
  }

  componentWillMount() {
    analyticsPage('home');
    this.props.showProgressBar(true);
    this.setState({ showSpinner: true })
    this.props.pageLoading();
    this.props.updateStatefetchNews();
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
        // console.log('res  is here =>', res.status)
        this.setState({
          photos: res.body.data,
          nextURL: res.body.pagination.next_url,
          photosRetrieved: true,
        })
      })
      .then(() => {
        // console.log('nexturl is here => ', this.state.nextURL);
        fetch(this.state.nextURL, {
          method: 'GET',
          cache: 'force-cache',
        })
          .then(res => res.json())
          .then(json => {
            this.setState({ morePhotos: json.data });
          })
      })
      .catch(err => {
        console.log('err retrieving insta posts: ', err);
      })
  }

  handleInstagramClick = (each) => {
    analyticsEvent(`clicked-insta-${each.id}`);
    return window.open(each.link, '_newtab');
  }

  componentWillReceiveProps = (nextProps) => {

    // console.log('nextProps: ', nextProps);
    let firstRow = (nextProps && nextProps.prismicStories && nextProps.prismicStories.slice(0, 3));
    let secondRow = (nextProps && nextProps.articles && nextProps.articles.slice(0, 3));
    let thirdRow = (nextProps && nextProps.articles && nextProps.articles.slice(3, 6));
    let fourthRow = (nextProps && nextProps.articles && nextProps.articles.slice(6, 9));

    this.setState({ 
      firstRow,
      secondRow,
      thirdRow,
      fourthRow,
      articlesHaveLoaded: true
    })

  }

  render() {

    const { articlesHaveLoaded, photosRetrieved, firstRow, 
      secondRow, thirdRow, fourthRow, advertsOn, photos, morePhotos } = this.state;

    // console.log('photos back: ', photos)
    // console.log('morePhotos back: ', morePhotos)
    
    return (
      <>
      <Container>

        <PageTitle text="The Panda Riot" />

          { !articlesHaveLoaded && <Spinner />}

        <GigsOnTonightContainer />
        
        <Row className="top-row full-width">

            { articlesHaveLoaded && firstRow && firstRow.map((each, i) => {
              return (
                
                <Col key={each.uid} className="mob-margin-bottom" sm={4}>
                  <BoxCard id={each.uid} link={each.uid} img={each.data["news-image"].url} headline={each.data["news-headline1"][0].text} blurb={each.data["news-body"][0].text} src="TPR" />
                </Col>
                
              )
              }) }
        </Row>

        <Row className="mid-row full-width">

            { articlesHaveLoaded && secondRow && secondRow.map((each, i) => {
              return (
                
                <Col key={i} className="mob-margin-bottom" sm={4}>
                  <BoxCard id={each._id} key={i} link={each.link} img={each.img} headline={each.headline} blurb={each.blurb}  src={each.src} />
                </Col>
                
              )
              }) }
        </Row>
          
        <Row className="bottom-row full-width">

            { articlesHaveLoaded && thirdRow && thirdRow.map((each, i) => {
              return (
                
                <Col key={i} className="mob-margin-bottom" sm={4}>
                  <BoxCard id={each._id} key={i} link={each.link} img={each.img} headline={each.headline} blurb={each.blurb}  src={each.src} />
                </Col>
                
              )
              }) }
        </Row>

        <Row className="bottom-row full-width">

            { articlesHaveLoaded && fourthRow && fourthRow.map((each, i) => {
              return (
                
                <Col key={i} className="mob-margin-bottom" sm={4}>
                  <BoxCard id={each._id} key={i} link={each.link} img={each.img} headline={each.headline} blurb={each.blurb}  src={each.src} />
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
  articles: state.homePage.articles,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.HOME_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.HOME_PAGE_LOADED }),
  updateStatefetchNews: () => dispatch({ type: actions.FETCH_NEWS }),
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  withPrismicStories,
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);