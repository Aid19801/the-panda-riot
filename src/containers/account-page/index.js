import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { PasswordForgetForm } from '../../containers/password-forget-page';
import { withAuthorization } from '../../components/Session';
import { withFirebase } from '../../components/Firebase';
import { PageTitle } from '../../components';
import * as ROUTES from '../../constants/routes';
import * as actions from './constants';
import { compose } from 'recompose';

import './styles.scss';
import { analyticsPage } from '../../lib/utils';
import ProfilePic from '../../components/ProfilePic';
import InputWithTag from '../../components/InputWithTag';

class AccountChangeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      me: {},
      username: '',
      tagline: '',
      profilePicture: '',
      rating: 0,
      updated: false,
      includeInActRater: false,
    }
  }

  componentWillMount = () => {
    analyticsPage('me');
    let meUid = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.user(meUid)
      .on('value', snapshot => {
          const me = snapshot.val();
          const { username, tagline, profilePicture, rating, includeInActRater } = me;
          let includeInActRaterStatus = includeInActRater || false;
          let persistRatingFromDb = rating !== 0 && rating ? rating : 0;
          this.setState({
            username,
            tagline,
            profilePicture,
            includeInActRater: includeInActRaterStatus,
            email: this.props.firebase.auth.currentUser.email,
            rating: persistRatingFromDb,
          })
      })
    
  }

  onSubmit = event => {
    const { tagline, profilePicture, username, includeInActRater } = this.state;
    let uid = this.props.firebase.auth.currentUser.uid;
    let email = this.props.firebase.auth.currentUser.email;
    this.props.firebase
      .user(uid)
        .set({
          username,
          email,
          tagline,
          profilePicture,
          includeInActRater,
          rating: this.state.rating,
        })

    event.preventDefault();
    this.setState({ updated: true })
    this.props.history.push(ROUTES.HOME);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleIncludeInActRater = (event) => {
    console.log('event ', event);
    this.setState({ includeInActRater: !this.state.includeInActRater });
  }

  render() {

    const { tagline, profilePicture } = this.state;

    const isInvalid = tagline === '' || profilePicture === '';

    return (
      <form className="act-profile-form" onSubmit={this.onSubmit}>
        
        <ProfilePic srcProp={this.state.profilePicture} />

        <InputWithTag
          tagline="Photo URL"
          value={this.state.profilePicture}
          onChange={this.onChange}
          placeholder="img URL eg https://my-pics/1_pic.jpg"
          name="profilePicture"
          disabled={false}
        />
        

        <InputWithTag
          tagline="username"
          value={this.state.username}
          onChange={this.onChange}
          placeholder="act name eg. Lily Savage"
          name="username"
          disabled={false}
        />

        <InputWithTag
          tagline="tagline"
          value={this.state.tagline}
          onChange={this.onChange}
          placeholder="tagline..."
          name="tagline"
          disabled={false}
        />

      
        
      
        
        <div className="horizontal-two-elements">
          <div
            style={{ height: 20, width: 20 }}
            className={this.state.includeInActRater ? "tickbox bg-green" : "tickbox bg-red" }
            onClick={() => this.handleIncludeInActRater()}
          >{this.state.includeInActRater ? '✔' : 'X'}</div>
          <p>include me in Act Rater?: </p>
        </div>
        <button disabled={isInvalid} type="submit">
          Update My Deets
        </button>

      </form>
    );
  }
}


const AccountPage = (props) => {

  useEffect(() => {
    props.pageLoading();
    const cu = props.firebase.auth.currentUser;
    props.storeUserProfile(cu.uid, cu.email);
  }, []);

  useEffect(() => {
    props.pageLoaded();
  }, []);

  // console.log('FUCK this.props ', props)
  return (
      <div id="account-page-container">
        <Container className="margin-top-20" >
          <Row className="full-width">
            <Col sm={6}>
              <AccountChangeForm {...props} />
            </Col>
            <Col sm={6}>
              <PasswordForgetForm email={props.email}/>
            </Col>
          </Row>
        </Container>
        
      </div>
  );
}


const mapStateToProps = state => ({
  isLoading: state.accountPage.isLoading,
  email: state.accountPage.email,
  uid: state.accountPage.uid,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.ACCOUNT_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.ACCOUNT_PAGE_LOADED }),
  storeUserProfile: (uid, email) => dispatch({ type: actions.STORE_USER_PROFILE, uid, email }),
});

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(AccountPage);
