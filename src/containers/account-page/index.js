import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { PasswordForgetForm } from '../../containers/password-forget-page';
import { withAuthorization } from '../../components/Session';
import { withFirebase } from '../../components/Firebase';
import { Spinner } from '../../components';
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
      faveGig: '',
      twitter: '',
      facebook: '',
      youtube: '',
      youtubeChannelURL: '',
      website: '',
    }
  }

  componentWillMount = () => {

    analyticsPage('me');
    this.fetchAllGigs();
    let meUid = this.props.firebase.auth.currentUser.uid;
    console.log('meUid: ', meUid);
    this.setState({ foo: meUid });
    this.props.firebase.user(meUid)
      .on('value', snapshot => {
          
          let faveGig = '';
          let genre = '';
          let youtube = '';
          let twitter = '';
          let facebook = '';
          let youtubeChannelURL = '';
          let website = '';

          const me = snapshot.val();
          const { username, tagline, profilePicture, rating, includeInActRater } = me;
          
          me && !me.faveGig ? faveGig = 'n/a' : faveGig = me.faveGig;
          me && !me.genre ? genre = 'unknown' : genre = me.genre;
          me && !me.youtube ? youtube = 'unknown' : youtube = me.youtube;
          me && !me.twitter ? twitter = 'unknown' : twitter = me.twitter;
          me && !me.facebook ? facebook = 'unknown' : facebook = me.facebook;
          me && !me.youtubeChannelURL ? youtubeChannelURL = 'unknown' : youtubeChannelURL = me.youtubeChannelURL;
          me && !me.website ? website = 'unknown' : website = me.website;

          let includeInActRaterStatus = includeInActRater || false;
          let persistRatingFromDb = rating !== 0 && rating ? rating : 0;
          this.setState({
            username,
            tagline,
            profilePicture,
            includeInActRater: includeInActRaterStatus,
            email: this.props.firebase.auth.currentUser.email,
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

  fetchAllGigs = () => {
    this.props.updateStateFetchAllGigs();
  }

  onSubmit = event => {
    
    const { tagline, profilePicture, username, includeInActRater,
      faveGig, genre, youtube, twitter, facebook, youtubeChannelURL, website } = this.state;
    // let uid = this.props.firebase.auth.currentUser.uid;
    let email = this.props.email;
    console.log('userName: ', username);
    console.log('tagline: ', tagline);
    console.log('profilePicture: ', profilePicture);
    console.log('includeInActRater: ', includeInActRater);
    console.log('faveGig: ', faveGig);
    console.log('genre: ', genre);
    console.log('youtube: ', youtube);
    console.log('twitter: ', twitter);
    console.log('facebook: ', facebook);
    console.log('youtubeChannelURL: ', youtubeChannelURL);
    console.log('website: ', website);
    
    this.props.firebase
      .user(this.state.foo)
        .set({
          username,
          email,
          tagline,
          profilePicture,
          includeInActRater,
          rating: this.state.rating,

          faveGig,
          genre,
          youtube,
          twitter,
          facebook,
          youtubeChannelURL,
          website,
        })
debugger;
    event.preventDefault();
    this.setState({ updated: true })
    
    sessionStorage.setItem('cached-profilePicture', profilePicture);

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
    const { gigs } = this.props;

    const isInvalid = tagline === '' || profilePicture === '';

    return (
      <form className="act-profile-form" onSubmit={this.onSubmit}>
        
        { profilePicture ? <ProfilePic srcProp={this.state.profilePicture} /> : <ProfilePic srcProp={require('./user.svg')} />}

        <InputWithTag
          tagline="Photo URL"
          value={this.state.profilePicture}
          onChange={this.onChange}
          placeholder="img URL eg https://my-pics/1_pic.jpg"
          name="profilePicture"
          disabled={false}
          orange
        />
        

        <InputWithTag
          tagline="username"
          value={this.state.username}
          onChange={this.onChange}
          placeholder="act name eg. Lily Savage"
          name="username"
          disabled={false}
          orange
        />

        <InputWithTag
          tagline="tagline"
          value={this.state.tagline}
          onChange={this.onChange}
          placeholder="tagline..."
          name="tagline"
          disabled={false}
          orange
        />

          { gigs && gigs.length !== 0 && (
              <div className="div__acct-dropdown-container margin-bottom">
                  <h3 className="p__input-w-tag bold-thick orange">favourite Gig: </h3>
                    <select
                      className="select__faveGig"
                      name="faveGig"
                      onChange={this.onChange}
                    >

                      <option>{this.state.faveGig}</option>

                      { this.props.gigs && this.props.gigs.length !== 0 && this.props.gigs.map((each, i) => {
                        return (
                          <option key={i}>{each.name}</option>
                        )
                      })}

                    </select>
                </div>
          ) }
        
        <InputWithTag
          tagline="Type Of Comedian (observational, pun, music)"
          name="genre"
          onChange={this.onChange}
          placeholder="what type of comedian are you?"
          value={this.state.genre}
          disabled={false}
          orange
        />

        <InputWithTag
          tagline="My Youtube Vid"
          name="youtube"
          onChange={this.onChange}
          placeholder="a link to your youtube"
          value={this.state.youtube}
          disabled={false}
          orange
        />


        <InputWithTag
          tagline="Link to my twitter"
          name="twitter"
          onChange={this.onChange}
          placeholder="eg. https://twitter.com/catGuy1978"
          value={this.state.twitter}
          disabled={false}
          orange
        />

        
        <InputWithTag
          tagline="Link to my FB page"
          name="facebook"
          onChange={this.onChange}
          placeholder="eg. https://facebook.com/funnyDAVE1987"
          value={this.state.facebook}
          disabled={false}
          orange
        />
        
        <InputWithTag
          tagline="Link to my YouTube channel"
          name="youtubeChannelURL"
          onChange={this.onChange}
          placeholder="eg. https://youtube.com/channel/funnyDAVE1987"
          value={this.state.youtubeChannelURL}
          disabled={false}
          orange
        />

        <InputWithTag
          tagline="Link to my Website"
          name="website"
          onChange={this.onChange}
          placeholder="eg. www.funnyDave.net"
          value={this.state.website}
          disabled={false}
          orange
        />

        <div className="horizontal-two-elements">
          <div
            style={{ height: 20, width: 20 }}
            className={this.state.includeInActRater ? "tickbox bg-green" : "tickbox bg-red" }
            onClick={() => this.handleIncludeInActRater()}
          >{this.state.includeInActRater ? '✔' : 'X'}</div>
          <p> {`<=`} include me in Act Rater?</p>
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
        <Container className="push-down-top-fix" >
          <Row className="full-width flex-center">
            <Col sm={10}>
              <AccountChangeForm {...props} />
              <PasswordForgetForm email={props.email} {...props} />
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
  gigs: state.accountPage.gigs,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.ACCOUNT_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.ACCOUNT_PAGE_LOADED }),
  storeUserProfile: (uid, email) => dispatch({ type: actions.STORE_USER_PROFILE, uid, email }),
  updateStateFetchAllGigs: () => dispatch({ type: actions.ACCOUNT_PAGE_FETCH_GIGS })
});

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
  connect(mapStateToProps, mapDispatchToProps),
)(AccountPage);
