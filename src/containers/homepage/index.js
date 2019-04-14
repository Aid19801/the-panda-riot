import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withAuthorization } from '../../components/Session';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { theme } from '../../theme';

class HomePage extends Component {
  constructor() {
    super()
    this.state = {};
  }

  componentWillMount() {
    this.props.showProgressBar(true);
    this.props.pageLoading();
  }

  componentDidMount() {
    this.props.pageLoaded();
    setTimeout(() => {
      this.props.showProgressBar(false);
    }, 100)
  }


  render() {
    return (
      <Container>
        <Row>
          <Col sm={4}>
            <p style={theme.paragraph}>
              i am a 4 one i am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 one
            </p>
          </Col>
          <Col sm={4}>
            <p>
              i am a 4 one i am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 one
            </p>
          </Col>
          <Col sm={4}>
            <p>
              i am a 4 one i am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 one
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <p>
              i am a 4 one i am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 one
            </p>
          </Col>
          <Col sm={4}>
            <p>
              i am a 4 one i am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 one
            </p>
          </Col>
          <Col sm={4}>
            <p>
              i am a 4 one i am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 onei am a 4 one
            </p>
          </Col>
        </Row>
      </Container>
    )
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  isLoading: state.homePage.isLoading,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.HOME_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.HOME_PAGE_LOADED }),
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);