import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RichText } from 'prismic-reactjs';
import { withAuthorization } from '../../components/Session';
import { AdvertBox, Spinner, PageTitle } from '../../components/';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

import { Helmet } from 'react-helmet';


import './styles.scss';
import { analyticsPage } from '../../lib/utils';
import withPrismicStories from '../../components/Prismic/with-prismic-stories';

class ArticlePage extends Component {
  constructor() {
    super()
    this.state = {
      story: null,
      nextStory: null,
    };
  }

  componentWillMount() {
    document.createElement('meta').setAttribute("og:type", "article");
    let params = queryString.parse(this.props.location.search);
    let uid = params.id;
    analyticsPage(`tpr-art-${uid}`);

    // this.props.pageLoading(params.id);
    
  }

  componentDidMount() {
    // this.props.pageLoaded();
    // setTimeout(() => {
    //   this.props.showProgressBar(false);
    // }, 100)
  }

  fetchArticle = (id) => {
    const { prismicStories } = this.props;
    let story = (prismicStories && prismicStories.filter((each) => each.uid === id)[0]);
    let nextStory = (prismicStories && prismicStories.filter((each) => each.uid !== id))[0];
    this.setState({ story, nextStory, })
  }

  componentWillReceiveProps = nextProps => {
    let params = queryString.parse(this.props.location.search);
    let uid = params.id;
    let matchedStory = (nextProps.prismicStories && nextProps.prismicStories.filter((each) => each.uid === uid)[0]);
    let nextStory = (nextProps.prismicStories && nextProps.prismicStories.filter((each) => each.uid !== uid)[0]);
    this.setState({
      story: matchedStory,
      nextStory: nextStory
    });
  }

  render() {

    console.log('this state ', this.state);
    console.log('this props ', this.props);

    const { story } = this.state;
    return (
      <>
      <Helmet>
        <title>{this.state.story && this.state.story.data["news-headline1"][0].text}</title>
        <meta name="description" content="Nested component" />
        <meta property="og:title" content={this.state.story && this.state.story.data["news-headline1"][0].text} />
        <meta property="og:description" content={this.state.story && this.state.story.data["news-body"][0].text} />
        <meta property="og:image" content={this.state.story && this.state.story.data["news-image"].url} />
        <meta property="og:url" content={this.state.story && `https://www.thePandaRiot.com/article?id=${this.state.story.uid}`} />
      </Helmet>
      
      <Container>
    
        <PageTitle text="#News" />
        
        <Row className="article-row">
          <Col sm={12}>

            {
              !story && <div className="flex-center margin-top"><Spinner /></div>
            }
            { story &&(
              <div className="div__rendered-html">
                <RichText render={this.state.story.data["news-headline1"]} />
                <img src={this.state.story.data["news-image"].url} alt="news for open mic comedy" />
                <RichText render={this.state.story.data["news-body"]} />
              </div>
                )
                }
            { this.state.nextStory && (
              <div className="div__end-art-container">
                <Link to={`/datamap`}>
                  <h3 className="h3__end-art-links">Gig Map</h3>
                </Link>
                <Link to={`/home`}>
                  <h3 className="h3__end-art-links">More News...</h3>
                </Link>
              </div>
            ) }
          </Col>
        </Row>

      </Container>
      </>
    )
  }
}

// const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  isLoading: state.articlePage.isLoading,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: (id) => dispatch({ type: actions.ARTICLE_PAGE_LOADING, id: id }),
  pageLoaded: () => dispatch({ type: actions.ARTICLE_PAGE_LOADED }),
  // updateStatefetchNews: () => dispatch({ type: actions.FETCH_NEWS }),
});

export default compose(
  withProgressBar,
  // withAuthorization(condition),
  withRouter,
  withPrismicStories,
  connect(mapStateToProps, mapDispatchToProps),
)(ArticlePage);