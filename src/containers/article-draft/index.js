import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { withAuthorization } from '../../components/Session';
import { Spinner, PageTitle } from '../../components/';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

import * as ROUTES from '../../constants/routes';

import './styles.scss';

class ArticleDraftPage extends Component {
  constructor() {
    super()
    this.state = {
      showSpinner: false,
    };
  }

  componentWillMount() {
    this.props.showProgressBar(true);
    
    if (!this.props.privs) {
      this.props.history.push(ROUTES.HOME);
    }

    this.setState({ showSpinner: true })
    
  }

  componentDidMount() {
    this.props.pageLoaded();
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100)
    this.setState({ showSpinner: false })
  }

  postToGist = () => {
    console.log('article is? ', this.props.article);
    this.props.postingToGist(this.props.article);
  }

  render() {
    
    console.log('this props yo => ', this.props);

    return (
      <>
      <Container>

        { this.state.showSpinner && <Spinner /> } 
    
        <PageTitle text="#Preview" />
        
        <Row className="article-row">
          <Col sm={12}>
            { this.props.article && <div className="div__rendered-html" dangerouslySetInnerHTML={{ __html: this.props.article }} /> }
          </Col>
        </Row>
        
        <button onClick={this.postToGist}>post</button>

      </Container>
      </>
    )
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  isLoading: state.articleDraft.isLoading,
  isDraft: state.addBlog.isDraft,
  article: state.addBlog.article,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: (id) => dispatch({ type: actions.ARTICLE_DRAFT_LOADING, id: id }),
  pageLoaded: () => dispatch({ type: actions.ARTICLE_DRAFT_LOADED }),
  pageFailed: () => dispatch({ type: actions.ARTICLE_DRAFT_FAILED }),
  postingToGist: (article) => dispatch({ type: actions.ARTICLE_DRAFT_POSTING, content: article })
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ArticleDraftPage);