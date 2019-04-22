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

class ActsPage extends Component {

    constructor() {
        super()
        this.state = {
          acts: [],
          timer: null,
        };
    }

    startTimer = () => {
        this.setState({ timer: 10 });
        setInterval(() => {
            this.setState({ timer: this.state.timer - 1 })
        }, 1000);
    }

    renderActs = () => {

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            console.log('usersObject: ', usersObject);

            const usersList = Object.keys(usersObject)
                .map(key => ({
                    ...usersObject[key],
                    uid: key
                }));

                
                let sortedActs = usersList.sort((a, b) => a.rating - b.rating).reverse();
                this.setState({ acts: sortedActs });
        })

        
    }

    upvoteAct = actObject => {
        let chosenUser = {};

        const lastTimeVoted = localStorage.getItem('timevoted');
        const timeNow = Date.now();
        const differenceBetween = timeNow - parseInt(lastTimeVoted);

        // if it was longer than 
        if (differenceBetween >= 9999) {
            
                    // 1. GET THE ACT YOUVE CHOSEN TO UPVOTE
                    this.props.firebase.user(actObject.uid)
                        .on('value', snapshot => {
                            chosenUser = snapshot.val();
                        })
            
                        // set their record to be the same but with
                        // rating incremented by +1
            
                    const { username, email, tagline, profilePicture, rating, includeInActRater } = chosenUser;
            
                    // 2. SET THE ACT WITH ITS NEW RATING IN DB
                    this.props.firebase
                        .user(actObject.uid)
                        .set({
                            username,
                            email,
                            tagline,
                            profilePicture,
                            includeInActRater,
                            rating: rating + 1,
                        })
            
                    // 3. SAVE LOCALSTORAGE TO STOP PERSISTENT VOTING
                    localStorage.setItem('timevoted', Date.now())

        } else {
            alert('voting too often');
        }

        
    }

    downvoteAct = uid => {
        return;
    }

    updateActs = () => {
        return;
    }


    componentWillMount() {
        this.renderActs();
        this.props.showProgressBar(true);
        this.props.pageLoading();
    }

    componentDidMount() {
        this.props.pageLoaded();
        setTimeout(() => {
            this.props.showProgressBar(false);
        }, 100)
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
        this.props.firebase.user().off();
    }
        
  render() {
    return (
        <Container>
            <Row className="act-rows">
                <Col sm={9}>
                <h1>seconds: {this.state.timer}</h1>
                    { this.state.acts.map((each, i) => {
                        return (
                            <div key={i} className="each-act-container">

                                <div className="each-act-row">

                                <div className="each-act-rating-container">
                                    <button onClick={() => this.upvoteAct(each)}>Up</button>
                                    <h1 className="each-act-rating">{each.rating}</h1>
                                    <button onClick={() => null}>Down</button>
                                </div>

                                    <img
                                        src={each.profilePicture}
                                        className="each-act-img"
                                        />
                                    <div className="each-act-name">
                                        <h1>{each.username}</h1>
                                    </div>
                                </div>
                                
                            
                            </div>

                        )
                    })}
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
    pageLoading: () => dispatch({ type: actions.ACTS_PAGE_LOADING }),
    pageLoaded: () => dispatch({ type: actions.ACTS_PAGE_LOADED }),
});

  
export default compose(
    withProgressBar,
    withAuthorization(condition),
    connect(mapStateToProps, mapDispatchToProps),
  )(ActsPage);