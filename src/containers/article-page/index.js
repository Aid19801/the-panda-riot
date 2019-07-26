import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import { analyticsPage, updateMetaTagsForFacebook } from '../../lib/utils';
import withPrismicStories from '../../components/Prismic/with-prismic-stories';

class ArticlePage extends Component {
  constructor() {
    super()
    this.state = {
      story: null,
    };
  }

  componentWillMount() {
    document.createElement('meta').setAttribute("og:type", "article");
    analyticsPage('tpr-article');

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
    this.setState({ story })
  }

  componentWillReceiveProps = nextProps => {
    let params = queryString.parse(this.props.location.search);
    let uid = params.id;
    let matchedStory = (nextProps.prismicStories && nextProps.prismicStories.filter((each) => each.uid === uid)[0]);
    this.setState({ story: matchedStory });
  }

  render() {

    console.log('this state ', this.state);
    console.log('this props ', this.props);

    const { story } = this.state;
    return (
      <>
      <Container>
    
        <PageTitle text="#News" />
        
        <Row className="article-row">
          <Col sm={12}>
            { story &&(
              <div className="div__rendered-html">
                <RichText render={this.state.story.data["news-headline1"]} />
                <img src={this.state.story.data["news-image"].url} alt="news for open mic comedy" />
                <RichText render={this.state.story.data["news-body"]} />
              </div>
                )
                }
          </Col>
        </Row>

      </Container>
      </>
    )
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  isLoading: state.articlePage.isLoading,
  // article: state.articlePage.article,
  // isDraft: state.addBlog.isDraft,
  // articlePreview: state.addBlog.article,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: (id) => dispatch({ type: actions.ARTICLE_PAGE_LOADING, id: id }),
  pageLoaded: () => dispatch({ type: actions.ARTICLE_PAGE_LOADED }),
  // updateStatefetchNews: () => dispatch({ type: actions.FETCH_NEWS }),
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  withRouter,
  withPrismicStories,
  connect(mapStateToProps, mapDispatchToProps),
)(ArticlePage);