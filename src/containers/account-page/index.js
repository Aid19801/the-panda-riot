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
import { analyticsPage } from '../../lib/utils';
import ProfilePic from '../../components/ProfilePic';
import ReuseableInput from '../../components/Input';
import ReUseableDropdown from '../../components/Dropdown';


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
    analyticsPage('my-account');
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
        
        <div className="div__flex-row">
          <h4>username</h4>
          <input
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            type="text"
            placeholder="act name eg. Lily Savage"
          />
        </div>

        <h4>tagline</h4>
        <input
          name="tagline"
          value={this.state.tagline}
          onChange={this.onChange}
          type="text"
          placeholder="tagline..."
        />

        <div className="div__flex-row center">
        <h4>link to image</h4>
          <input
            name="profilePicture"
            value={this.state.profilePicture}
            onChange={this.onChange}
            type="text"
            placeholder="img URL eg https://my-pics/1_pic.jpg"
          />
          <ProfilePic srcProp={this.state.profilePicture} />
        </div>

        <div className="horizontal-two-elements">

          <div
            style={{ height: 40, width: 40 }}
            className={this.state.includeInActRater ? "tickbox bg-green" : "tickbox bg-red" }
            onClick={() => this.handleIncludeInActRater()}
          >{this.state.includeInActRater ? '✔' : 'X'}</div>

          <h4>include me in Act Leader-Board?</h4>

        </div>

        <button className="btn btn-outline-warning" disabled={isInvalid} type="submit">
          Update My Deets
        </button>

      </form>
    );
  }
}

class UpdateMyAccountContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      gigsIvePlayedAt: [],
      includeInActRater: false,
    }
  }

  componentWillMount = () => {
    analyticsPage('my-account');
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

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleGigsIvePlayedAt = (str) => {
    console.log('selected: ', str);

  }
  render() {
    return (
      <div className="div__update-acc-container">
        <Row className="center">
          <Col sm={6}>
            <ReuseableInput
              title="profilePicture"
              currentValue={this.state.profilePicture}
              placeholderText="eg https://someplace.com/images/mypic.jpg"
              handleChange={this.handleInputChange}
            />

            <ProfilePic srcProp={this.state.profilePicture} />

            <ReuseableInput
              title="username"
              currentValue={this.state.username}
              placeholderText="user-name eg. Paul OGrady"
              handleChange={this.handleInputChange}
            />
            <ReuseableInput
              title="tagline"
              currentValue={this.state.tagline}
              placeholderText="tagline eg. Sometimes you eat the bear and sometimes, well, the bear he eats you."
              handleChange={this.handleInputChange}
            />


            <div className="horizontal-two-elements">

              <div
                style={{ height: 40, width: 40 }}
                className={this.state.includeInActRater ? "tickbox bg-green" : "tickbox bg-red" }
                onClick={() => this.handleIncludeInActRater()}
              >{this.state.includeInActRater ? '✔' : 'X'}</div>

              <h4>include me in Act Leader-Board?</h4>
            </div>
            

            <h2 className="orange margin-top margin-bottom">Links To My Socials</h2>

            <ReuseableInput
              title="facebook"
              icon="https://logodix.com/logo/659123.png"
              currentValue={this.state.facebook}
              placeholderText="eg https://facebook.com/andrea-watson284692"
              handleChange={this.handleInputChange}
            />

            <ReuseableInput
              title="twitter"
              icon="https://www.pngfind.com/pngs/m/49-495006_twitter-logo-white-png-tiny-twitter-logo-black.png"
              currentValue={this.state.twitter}
              placeholderText="eg https://twitter.com/CatLoverBill_1995"
              handleChange={this.handleInputChange}
            />

            <ReuseableInput
              title="youtube"
              icon="https://smallimg.pngkey.com/png/small/23-236793_youtube-free-download-on-mbtskoudsalg-png-youtube-logo.png"
              currentValue={this.state.youtube}
              placeholderText="eg https://www.youtube.com/user/mysillychannelstuff"
              handleChange={this.handleInputChange}
            />

          </Col>
          <Col sm={4}>


          <ReUseableDropdown
              title="gigsIvePlayedAt"
              optionsArray={[{id: 1, name: "We Are Funny"}, {id: 2, name: "Funny Feckers"} ]}
              selectedOptions={this.state.gigsIvePlayedAt}
              placeholderText="eg https://www.youtube.com/user/mysillychannelstuff"
              handleChange={this.handleGigsIvePlayedAt}
            />


            dropdown
            youtube video ID
            update my details

          </Col>

          <Col sm={6}>
            PASSWORD
            email
            password reset button
          </Col>

        </Row>
      </div>
    )
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
        <Container className="margin-top-20" >
          <Row className="center">
            <Col sm={12}>
              <UpdateMyAccountContainer firebase={props.firebase}/>
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
