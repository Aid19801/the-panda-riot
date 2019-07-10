import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { withAuthorization } from '../../components/Session';
import { PageTitle, UserCard } from '../../components';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';


import './styles.scss';
import { analyticsPage, analyticsEvent } from '../../lib/utils';
import UserInfoCard from '../../components/UserInfoCard';

class UserProfilePage extends Component {
  constructor() {
    super()
    this.state = {
      advertsOn: false,
      user: {},
    };
  }

  componentWillMount() {
    analyticsPage('user-profile');
    this.props.showProgressBar(true);
    this.setState({ showSpinner: true })
    this.props.pageLoading();
    this.props.updateStateFetchUser();
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

  render() {
    
    return (
      <>
      <Container>
        <Row className="full-width">
          <Col sm={6}>
            <UserCard />
          </Col>
          <Col sm={6}>
            <UserInfoCard />
          </Col>

        </Row>

      </Container>
      </>
    )
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  profile: state.userProfile.user,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.USER_PROFILE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.USER_PROFILE_LOADED }),
  updateStateFetchUser: () => dispatch({ type: actions.FETCH_USER }),
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(UserProfilePage);