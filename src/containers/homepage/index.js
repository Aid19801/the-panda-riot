import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import request from 'superagent';

import { withAuthorization } from '../../components/Session';
import { AdvertBox, Spinner, BoxCard, ImageBox, PageTitle } from '../../components/';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
// import { mockNews } from '../../mock-news';


import './styles.scss';

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
        console.log('1) res is back: ', res.status)
        this.setState({
          photos: res.body.data,
          nextURL: res.body.pagination.next_url,
          photosRetrieved: true,
        })
      })
      .then(() => {
        console.log('nexturl is here?? ', this.state.nextURL);
        fetch(this.state.nextURL)
          .then(res => res.json())
          .then(json => {
            this.setState({ morePhotos: json.data });
          })
      })
      .catch(err => {
        console.log('err retrieving insta posts: ', err);
      })
  }

  componentWillReceiveProps = (nextProps) => {
    let firstRow = nextProps.articles.slice(0, 3);
    let secondRow = nextProps.articles.slice(3, 6);
    let thirdRow = nextProps.articles.slice(6, 9);
    let fourthRow = nextProps.articles.slice(9, 12);

    this.setState({ firstRow, secondRow, thirdRow, fourthRow, articlesHaveLoaded: true })

  }

  render() {

    const { articlesHaveLoaded, photosRetrieved, firstRow, 
      secondRow, thirdRow, fourthRow, advertsOn, photos, morePhotos } = this.state;

    console.log('photos back: ', photos)
    console.log('morePhotos back: ', morePhotos)
    
    return (
      <>
      <Container>

        <PageTitle text="#home" />

          { !articlesHaveLoaded && <Spinner />}

        <Row className="top-row full-width">


            { firstRow.map((each, i) => {
              return (
                
                <Col key={i} className="mob-margin-bottom" sm={4}>
                  <BoxCard key={i} link={each.link} img={each.img} headline={each.headline} blurb={each.blurb} src={each.src} />
                </Col>
                
              )
              }) }
        </Row>

        <Row className="mid-row full-width">

            { secondRow.map((each, i) => {
              return (
                
                <Col key={i} className="mob-margin-bottom" sm={4}>
                  <BoxCard key={i} link={each.link} img={each.img} headline={each.headline} blurb={each.blurb}  src={each.src} />
                </Col>
                
              )
              }) }
        </Row>



        <Row id="id__insta-row">

          <div className="div__two-stacklable-rows">

              <div className="insta-row-of-images">
                { photosRetrieved && photos.slice(0, 5).map((each, i) => (
                  <div key={i} onClick={() => window.open(each.link, '_newtab')} className="div__each-image">
                        <img
                          className="img__each-img"
                          style={{ height: 90, width: 90 }}
                          src={each.images.standard_resolution.url}
                        />
                  </div>
              ))}
              </div>

              <div className="insta-row-of-images">
                { photosRetrieved && photos.slice(5, 10).map((each, i) => (
                  <div key={i} onClick={() => window.open(each.link, '_newtab')} className="div__each-image">
                        <img
                          className="img__each-img"
                          style={{ height: 90, width: 90 }}
                          src={each.images.standard_resolution.url}
                        />
                  </div>
              ))}
              </div>

          </div>

          <div className="div__two-stacklable-rows">

              <div className="insta-row-of-images">
                { photosRetrieved && photos.slice(10, 15).map((each, i) => (
                  <div key={i} onClick={() => window.open(each.link, '_newtab')} className="div__each-image">
                        <img
                          className="img__each-img"
                          style={{ height: 90, width: 90 }}
                          src={each.images.standard_resolution.url}
                        />
                  </div>
              ))}
              </div>

              <div className="insta-row-of-images">
                { photosRetrieved && photos.slice(15, 20).map((each, i) => (
                  <div key={i} onClick={() => window.open(each.link, '_newtab')} className="div__each-image">
                        <img
                          className="img__each-img"
                          style={{ height: 90, width: 90 }}
                          src={each.images.standard_resolution.url}
                        />
                  </div>
              ))}
              </div>

          </div>

          <div className="div__two-stacklable-rows">

              <div className="insta-row-of-images">
                { photosRetrieved && morePhotos.slice(0, 5).map((each, i) => (
                  <div key={i} onClick={() => window.open(each.link, '_newtab')} className="div__each-image">
                        <img
                          className="img__each-img"
                          style={{ height: 90, width: 90 }}
                          src={each.images.standard_resolution.url}
                        />
                  </div>
              ))}
              </div>

              <div className="insta-row-of-images">
              { photosRetrieved && morePhotos.slice(5, 10).map((each, i) => (
                  <div key={i} onClick={() => window.open(each.link, '_newtab')} className="div__each-image">
                        <img
                          className="img__each-img"
                          style={{ height: 90, width: 90 }}
                          src={each.images.standard_resolution.url}
                        />
                  </div>
              ))}
              </div>

          </div>




          </Row>
          
        <Row className="bottom-row full-width">

            { thirdRow.map((each, i) => {
              return (
                
                <Col key={i} className="mob-margin-bottom" sm={4}>
                  <BoxCard key={i} link={each.link} img={each.img} headline={each.headline} blurb={each.blurb}  src={each.src} />
                </Col>
                
              )
              }) }
        </Row>

        <Row className="bottom-row full-width">

            { fourthRow.map((each, i) => {
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
  articles: state.homePage.articles,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.HOME_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.HOME_PAGE_LOADED }),
  updateStatefetchNews: () => dispatch({ type: actions.FETCH_NEWS })
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);