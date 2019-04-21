import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withAuthorization } from '../../components/Session';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import request from 'superagent';

import './styles.scss';

const ACCESS_TOKEN = process.env.REACT_APP_INSTA_KEY;

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      isSelected: false,
      photos: [],
    };
  }

  componentWillMount() {
    this.props.showProgressBar(true);
    this.props.pageLoading();
    this.fetchPhotos();
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

  fetchPhotos() {
    request
      .get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${process.env.REACT_APP_INSTA_KEY}`)
      .then((res) => {
        this.setState({
          photos: res.body.data
        })
      })
  }

  render() {
    return (
      <>
      <button onClick={this.handleClick}>Click Me</button>
      <Container className="height-100">
        <Row>
          <Col sm={8} className="all">
          { this.state.photos.map((photo, key) => {
            return (
              <div key={photo.id}>
              
                <img src={photo.images.standard_resolution.url} alt={photo.caption} />
                <div style={{width:'600px', margin: '24px auto', fontStyle: 'italic'}}>
                  {photo.caption !== null ? photo.caption.text : ''}
                </div>
              </div>
            )
          })}
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