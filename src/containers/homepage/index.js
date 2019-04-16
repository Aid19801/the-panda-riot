import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withAuthorization } from '../../components/Session';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './styles.scss';

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      isSelected: false,
    };
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

  handleClick = () => {
    this.setState({ isSelected: !this.state.isSelected });
  }


  render() {
    return (
      <>
      <button onClick={this.handleClick}>Click Me</button>
      <Container className="height-100">
        <Row>
          <Col sm={8} className="all">
            <div className="cube" id={this.state.isSelected && 'flipit'}>
              <div className="flippety">
                <h1>top</h1>
              </div>
              <div className="flop">
                <h2>bottom</h2>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      </>
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