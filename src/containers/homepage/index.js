import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import request from 'superagent';

import { withAuthorization } from '../../components/Session';
import { AdvertBox, BoxCard, PageTitle } from '../../components/';
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
      articles: [],
      firstRow: [],
      secondRow: [],
      thirdRow: [],
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
        this.setState({
          photos: res.body.data
        })
      })
  }

  componentWillReceiveProps = (nextProps) => {
    let firstRow = nextProps.articles.slice(0, 3);
    let secondRow = nextProps.articles.slice(3, 6);
    let thirdRow = nextProps.articles.slice(6, 9);

    this.setState({ firstRow, secondRow, thirdRow })

  }


    // fetch('https://api.github.com/gists/424b043765bf5ad54cb686032f141b34')
    //   .then(res => res.json())
    //   .then(json => {
    //       // console.log('json back? ', json)
    //       return json.files.articles.raw_url;
    //   })
    //   .then(rawUrl => {
    //     fetch(rawUrl)
    //     .then(res => res.json())
    //     .then(json => {
    //         console.log('rawURL back ', rawUrl);
    //         return retrievedArticles = json.articles;
    //     })
    //     .catch(err => console.log('err ', err))

    //     let firstRow = retrievedArticles.slice(0, 3);
    //     let secondRow = retrievedArticles.slice(3, 6);
    //     let thirdRow = retrievedArticles.slice(6, 9);

    //     this.setState({ firstRow, secondRow, thirdRow })
    //     this.setState({ showSpinner: false });
    //   })
    //   .catch(err => error = err);
  

  render() {
    const { firstRow, secondRow, thirdRow, advertsOn, showSpinner } = this.state;
    const { isLoading } = this.props;
    return (
      <>
      <Container>

        <PageTitle text="#news" />

        { isLoading && (
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