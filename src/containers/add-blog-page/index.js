import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { withAuthorization } from '../../components/Session';
import { withFirebase } from '../../components/Firebase';
import { Spinner, PageTitle } from '../../components/';
import * as actions from './constants';
import * as ROUTES from '../../constants/routes';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

// draft JS for text editor
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './styles.scss';

class AddBlogPage extends Component {
  constructor() {
    super()
    this.state = {
      articleHasLoaded: false,
      editorState: EditorState.createEmpty(),
      html: '',
    };
  }

  componentWillMount() {
    this.props.showProgressBar(true);

    if (!this.props.privs) {
      this.props.history.push(ROUTES.HOME);
    }

    let params = queryString.parse(this.props.location.search);
    this.props.pageLoading(params.id);
    
    const draftInCache = localStorage.getItem('draft-blog');
    console.log('draftInCache: ', draftInCache);
    if (draftInCache) {
      console.log(1)
      const contentBlock = htmlToDraft(draftInCache);
      if (contentBlock) {
        console.log(2)
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState: editorState,
        });
      }
    }
    console.log(3);
    return;
  }

  componentDidMount() {
    this.props.pageLoaded();
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100)
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  convertToAnHTMLArticle = () => {
    const { editorState } = this.state;    
    const { updateStateArticleSubmitted } = this.props;    
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(
      rawContentState,
    );
    // set in local state
    this.setState({ html: markup });
    // push into redux for draft page to collect
    updateStateArticleSubmitted(markup);
    // keep in localstorage just incase you refresh the page
    localStorage.setItem('draft-blog', markup);
    this.props.history.push('/draft');
  }

  handleBeforeInput = (input) => {
    if (this.props.maxLength) {
      if (draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).length >= this.props.maxLength) {
        return 'handled';
      }
    }
  };

  render() {
    const { editorState, html } = this.state;
    const { isLoading } = this.props;

    console.log('now in state: ', html);
    
    return (
      <>
      <Container>

        { isLoading ? <Spinner /> : <PageTitle text="#addBlog" /> }
        
        <Row className="add-blog-row">
          <button onClick={this.convertToAnHTMLArticle}>Submit</button>
          <div className="col-sm-12 div__editor-container">
            <h3>Text Editor</h3>

            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
              handleBeforeInput={this.handleBeforeInput}
            />

          </div>

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
  updateStateArticleSubmitted: (html) => dispatch({ type: actions.BLOG_SUBMITTED, article: html })
});

export default compose(
  withFirebase,
  withProgressBar,
  withAuthorization(condition),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AddBlogPage);