import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import queryString from 'query-string';

import { withAuthorization } from '../../components/Session';
import { UserCard } from '../../components';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

import { analyticsPage, analyticsEvent } from '../../lib/utils';
import UserInfoCard from '../../components/UserInfoCard';
import './styles.scss';

class UserProfilePage extends Component {
  constructor() {
    super()
    this.state = {
      advertsOn: false,
      username: '',
      tagline: '',
      profilePicture: '',
      includeInActRater: false,
      email: '',
      rating: null,
      faveGig: '',
      genre: '',
      youtube: '',
      twitter: '',
      facebook: '',
      youtubeChannelURL: '',
      website: '',
    };
  }

  componentWillMount() {
    analyticsPage('user-profile');
    this.props.showProgressBar(true);
    this.setState({ showSpinner: true })
    this.props.pageLoading();
    this.fetchUser();
  }

  fetchUser = () => {
    // http://localhost:3000/user?id=seVFOFwaXJh8z20Mx6vdmut7SuI2
    // 0D8ZSflLohc9LWiQgJZs6zT65vg1
    // seVFOFwaXJh8z20Mx6vdmut7SuI2
    // 6Rk5ZlGX04TTvQEGy0JuVdXwCgv2
    let params = queryString.parse(this.props.location.search);
    let uid = params.id;
    this.props.updateStateFetchUser(uid);
    this.props.firebase.user(uid)
    .on('value', snapshot => {
        
        let faveGig = '';
        let genre = '';
        let youtube = '';
        let twitter = '';
        let facebook = '';
        let youtubeChannelURL = '';
        let website = '';

        const user = snapshot.val();
        const { username, tagline, profilePicture, rating, includeInActRater } = user;
        
        user && !user.faveGig ? faveGig = 'n/a' : faveGig = user.faveGig;
        user && !user.genre ? genre = 'unknown' : genre = user.genre;
        user && !user.youtube ? youtube = 'unknown' : youtube = user.youtube;
        user && !user.twitter ? twitter = 'unknown' : twitter = user.twitter;
        user && !user.facebook ? facebook = 'unknown' : facebook = user.facebook;
        user && !user.youtubeChannelURL ? youtubeChannelURL = 'unknown' : youtubeChannelURL = user.youtubeChannelURL;
        user && !user.website ? website = 'unknown' : website = user.website;
        
        let includeInActRaterStatus = includeInActRater || false;
        let persistRatingFromDb = rating !== 0 && rating ? rating : 0;

        this.setState({
          username,
          tagline,
          profilePicture,
          includeInActRater: includeInActRaterStatus,
          rating: persistRatingFromDb,
          faveGig,
          genre,
          youtube,
          twitter,
          facebook,
          youtubeChannelURL,
          website,
        })
    }) 
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

    console.log('this props ', this.props);
    console.log('this state ', this.state);
    
    const { 
      profilePicture,
      username,
      tagline,
      faveGig,
      genre,
      rating,
      youtube,
      twitter,
      facebook,
      youtubeChannelURL,
      website,
    } = this.state;

    return (
      <>
      <Container>
        <Row className="full-width margin-top">
          <Col sm={6}>
            <UserCard
              profilePicture={profilePicture}
              username={username}
              tagline={tagline}
            />
          </Col>
          <Col sm={6}>
            <UserInfoCard
              faveGig={faveGig}
              genre={genre}
              rating={rating}
              youtube={youtube}
              twitter={twitter}
              facebook={facebook}
              youtubeChannelURL={youtubeChannelURL}
              website={website}
            />
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
  updateStateFetchUser: (uid) => dispatch({ type: actions.FETCH_USER, uid,  }),
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(UserProfilePage);