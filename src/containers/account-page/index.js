import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { PasswordForgetForm } from '../../containers/password-forget-page';
import { withAuthorization } from '../../components/Session';
import { withFirebase } from '../../components/Firebase';

import * as ROUTES from '../../constants/routes';
import * as actions from './constants';
import { compose } from 'recompose';

import './styles.scss';
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
    let meUid = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.user(meUid)
      .on('value', snapshot => {
          const me = snapshot.val();
          const { username, tagline, profilePicture, rating, includeInActRater } = me;
          let persistRatingFromDb = rating !== 0 && rating ? rating : 0;
          this.setState({
            username,
            tagline,
            profilePicture,
            includeInActRater,
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
    this.setState({ includeInActRater: !this.state.includeInActRater });
  }

  render() {

    const { tagline, profilePicture } = this.state;

    const isInvalid = tagline === '' || profilePicture === '';

    return (
      <form className="act-profile-form" onSubmit={this.onSubmit}>
        <input
          name="username"
          value={this.state.username}
          onChange={this.onChange}
          type="text"
          placeholder="act name eg. Lily Savage"
        />
        <input
          name="tagline"
          value={this.state.tagline}
          onChange={this.onChange}
          type="text"
          placeholder="tagline..."
        />
        <input
          name="profilePicture"
          value={this.state.profilePicture}
          onChange={this.onChange}
          type="text"
          placeholder="img URL eg https://my-pics/1_pic.jpg"
        />

        <div className="horizontal-two-elements">
          <input
            className="checkbox"
            type="checkbox"
            checked={this.state.includeInActRater}
            onChange={this.handleIncludeInActRater}
          />
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

  return (
      <div id="account-page-container">
        <div className="account-page-title">
          <h1>My Account</h1>
        </div>

        <Container className="margin-top-20" >
          <Row>
            <Col sm={6}>
              <PasswordForgetForm />
            </Col>
            <Col sm={6}>
              <AccountChangeForm {...props} />
            </Col>
          </Row>
        </Container>
        
      </div>
  );
}


const mapStateToProps = state => ({
  isLoading: state.accountPage.isLoading,

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
