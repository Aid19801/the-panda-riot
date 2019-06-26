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


import './styles.scss';

class AddBlogPage extends Component {
  constructor() {
    super()
    this.state = {
      articleHasLoaded: false,
      showSpinner: false,
      advertsOn: false,
    };
  }

  componentWillMount() {
    this.props.showProgressBar(true);
    this.setState({ showSpinner: true })
    let params = queryString.parse(this.props.location.search);
    this.props.pageLoading(params.id);
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

    const { isLoading } = this.props;
    
    // console.log('this props yo => ', this.props.article);
    
    return (
      <>
      <Container>

        { isLoading ? <Spinner /> : <PageTitle text="#addBlog" /> }
        
        <Row className="add-blog-row">
          
        </Row>

      </Container>
      </>
    )
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  isLoading: state.articlePage.isLoading,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.ADD_BLOG_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.ADD_BLOG_PAGE_LOADED }),
  // updateStatefetchNews: () => dispatch({ type: actions.FETCH_NEWS }),
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AddBlogPage);