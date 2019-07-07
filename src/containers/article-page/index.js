import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { withAuthorization } from '../../components/Session';
import { AdvertBox, Spinner, PageTitle } from '../../components/';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

import { Helmet } from 'react-helmet';


import './styles.scss';
import { analyticsPage, updateMetaTagsForFacebook } from '../../lib/utils';

class ArticlePage extends Component {
  constructor() {
    super()
    this.state = {
      articleHasLoaded: false,
      showSpinner: false,
      advertsOn: false,
    };
  }

  componentWillMount() {
    
    document.createElement('meta').setAttribute("og:type", "article");
    // load analytics
    analyticsPage('tpr-article');

    // show progress 'loading...' bar & show spinner
    this.props.showProgressBar(true);
    this.setState({ showSpinner: true });

    // if its a draft kill spinner, not needed
    if (this.props.isDraft) {
      this.setState({ showSpinner: false })
      return;
    }

    // if its not a draft, take the ref from the URL, pass it to redux
    // to pull in the correct gist article html <content />
    if (!this.props.isDraft) {
      let params = queryString.parse(this.props.location.search);
      this.props.pageLoading(params.id);
    }
    
    
  }

  componentDidMount() {
    this.props.pageLoaded();
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100)
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ articleHasLoaded: true })
  }

  render() {

    const { articleHasLoaded, advertsOn, } = this.state;
    const { isDraft, article } = this.props;
    
    console.log('this props yo => ', article);

    return (
      <>

      <Helmet>
          <title>Helmet article title tag gig map</title>
          <meta name="description" content="meta regular description" />
          <meta name="og:description" content="helmet article meta og description" />
          <meta name="og:image" content="https://pbs.twimg.com/media/D6C0oplWkAAZ4mw.jpg" />
          <meta name="og:title" content="helmet article meta og title" />
          <meta name="og:url" content={`https://www.thepandariot.com/article?id=${article.id}`} />
      </Helmet>

      <Container>
    
        <PageTitle text="#News" />
        
        <Row className="article-row">
          <Col sm={12}>
            { this.props.article && this.props.article.content && <div className="div__rendered-html" dangerouslySetInnerHTML={ {__html: article.content} } /> }
            { this.props.articlePreview && <div className="div__rendered-html" dangerouslySetInnerHTML={{ __html: this.props.articlePreview }} /> }
          </Col>
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
  isLoading: state.articlePage.isLoading,
  article: state.articlePage.article,
  isDraft: state.addBlog.isDraft,
  articlePreview: state.addBlog.article,
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
  connect(mapStateToProps, mapDispatchToProps),
)(ArticlePage);