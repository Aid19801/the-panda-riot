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
        };
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
        // 1. GET THE ACT YOUVE CHOSEN TO UPVOTE
        this.props.firebase.user(actObject.uid)
            .on('value', snapshot => {
                chosenUser = snapshot.val();
            })

            // set their record to be the same but with
            // rating incremented by +1

        const { username, email, tagline, profilePicture, rating, includeInActRater } = chosenUser;
        
        console.log('chosen user object we\'re updating ', chosenUser);

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