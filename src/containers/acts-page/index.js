import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withAuthorization } from '../../components/Session';
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { tooSoon } from '../../lib/utils';

import './styles.scss';
import { UpArrow, DownArrow, ClapIcon } from './svgs';
import { PageTitle } from '../../components';

class ActsPage extends Component {

    constructor() {
        super()
        this.state = {
          acts: [],
          showModal: false,
          downVoteSwitchedOn: false,
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

    // eg. voteAct('up', actObject)
    voteAct = (upOrDownString, actObject) => {
        console.log('act obj coming through ', actObject);
        let chosenUser = {};
        let isTooSoon = tooSoon();
        // if it was longer than 10 seconds
        if (!isTooSoon) {
            
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
                            rating:
                                upOrDownString === 'up' ?
                                rating + 1 : rating - 1,
                        })
            
                    // 3. SAVE LOCALSTORAGE TO STOP PERSISTENT VOTING
                    localStorage.setItem('timevoted', Date.now())

        } else {
            return this.setState({ showModal: true });
        }
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
        }, 1000)
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
        this.props.firebase.user().off();
    }
        
  render() {
      const { showModal, downVoteSwitchedOn } = this.state;
    return (
        <Container>
            <PageTitle text="#clapOff" />
            <Row className="act-rows">
                <Col id={showModal ? 'fadeContainer' : ''} sm={9}>
                    { this.state.acts.map((each, i) => {
                        return (
                            <div key={i} className="each-act-container">

                                <div className="each-act-row">

                                <div className="each-act-rating-container">

                                    <div className="up-svg-container" onClick={() => this.voteAct('up', each)}>
                                        <ClapIcon />
                                    </div>

                                        <h1 className="each-act-rating">{each.rating}</h1>

                                    { downVoteSwitchedOn && <div className="down-svg-container" onClick={() => this.voteAct('down', each)}>
                                        <DownArrow />
                                    </div> }
                                </div>

                                    <img
                                        alt="open mic comedy act profile"
                                        src={each.profilePicture}
                                        className="each-act-img"
                                        />
                                    <div className="each-act-name">
                                        <h1>{each.username}</h1>
                                        <p>{each.tagline}</p>
                                    </div>
                                </div>
                                
                            
                            </div>

                        )
                    })}
                </Col>
            </Row>
                { showModal && 
                    <Modal.Dialog id="warning-modal">
                        <Modal.Header>
                            <Modal.Title>Ah BUGGER...</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Alas, you cannot vote more than once every six hours...</p>
                        </Modal.Body>

                        <Modal.Footer className="mx-auto">
                            <Button onClick={() => this.setState({ showModal: false })} variant="secondary">Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                    }
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