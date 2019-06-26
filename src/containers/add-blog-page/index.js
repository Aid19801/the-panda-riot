import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { withAuthorization } from '../../components/Session';
import { Spinner, PageTitle } from '../../components/';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

// draft JS for text editor
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
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
    let params = queryString.parse(this.props.location.search);
    this.props.pageLoading(params.id);
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
    let raw = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log('html: ', raw);
    this.setState({ html: raw });
  }

  render() {
    const { editorState, html } = this.state;
    const { isLoading } = this.props;

    console.log('now in state: ', html);
    
    // console.log('this props yo => ', this.props.article);
    
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
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(AddBlogPage);