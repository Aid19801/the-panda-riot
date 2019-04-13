import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withAuthorization } from '../../components/Session';
import { withFirebase } from '../../components/Firebase';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

import * as actions from './constants';

class AboutPage extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() {
    this.props.showProgressBar(true);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100)
  }
  

  render() {

    const { isLoading } = this.props;

    return (
      <div className="container">
         <h1>ABOUT PAGE and i am a progress bar</h1>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  isLoading: state.aboutPage.isLoading,
})

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.ABOUT_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.ABOUT_PAGE_LOADED })
})

export default compose(
  withAuthorization(condition),
  withFirebase,
  withProgressBar,
  connect(mapStateToProps, mapDispatchToProps),
)(AboutPage);