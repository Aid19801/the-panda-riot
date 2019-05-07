import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { withAuthorization } from '../../components/Session';
import Chatbox from '../../components/ChatBox'
import * as actions from './constants';
import withProgressBar from '../../components/ProgressBar/with-progressBar';

import { graphql } from 'react-apollo';
import * as gqls from './graphqls';

import gql from 'graphql-tag';

import './styles.scss';
import { PageTitle } from '../../components';

class ChatPage extends Component {
    state = {
        from: '',
        img: '',
        content: '',
        inputInFocus: false,
    };

    _subscribeToNewChats = () => {
        this.props.allChatsQuery.subscribeToMore({
            document: gql`
              subscription {
                Chat(filter: { mutation_in: [CREATED] }) {
                  node {
                    id
                    from
                    content
                    createdAt
                    img
                  }
                }
              }
            `,
            updateQuery: (previous, { subscriptionData }) => {
              const newChatLinks = [
                ...previous.allChats,
                subscriptionData.data.Chat.node
              ];
              const result = {
                ...previous,
                allChats: newChatLinks
              };
              return result;
            }
          });
        };

    componentDidMount() {
        let meUid = this.props.firebase.auth.currentUser.uid;
        this.props.firebase.user(meUid)
          .on('value', snapshot => {
              const me = snapshot.val();
              const { username, profilePicture } = me;
              this.setState({
                from: username,
                img: profilePicture,
              })
          })
        this._subscribeToNewChats();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }


    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    _createChat = async(e) => {
        if(e.key === 'Enter') {
            const { content, from, img } = this.state;
            await this.props.createChatMutation({
                variables: {
                    content, from, img
                }
            });
            this.scrollToBottom();
            this.setState({ content: '' });
          }
    }

    changeFocus = () => {
      this.setState({ inputInFocus: !this.state.inputInFocus, })
    }
  render() {

    const allChats = this.props.allChatsQuery.allChats || [];
    const { inputInFocus } = this.state;
    // console.log('all chats ', allChats)
    return (

        <Container>

            <PageTitle text="#chat" />
            
            <Row className="div__chat-page-msgs-row w-100">

              <div className="div__chat-page-bg-img-container">
                <img className="img__chat-page-bg-img" src={'https://www.jfl42.com/wp-content/uploads/2013/06/Comedy_Bar-bnw-520x325.jpg'} />

                <Col sm={12} id="chatpagemsgs" className="div__chat-page-section-container">

                  { allChats.map(message => (
                      <Chatbox key={message.id} message={message} />
                  ))}

                  <div 
                    style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                  </div>

                </Col>
              </div>

            </Row>
            <Row className="div__chat-page-input-row full-width">
                <Col sm={12} className="center padding-on">

                    <input
                        className={inputInFocus ? "input__msg__in-focus padding-on center" : "input__msg__unfocused padding-on center"}
                        onFocus={this.changeFocus}
                        onBlur={this.changeFocus}
                        value={this.state.content}
                        onChange={e => this.setState({ content: e.target.value })}
                        placeholder="Start typing"
                        onKeyPress={this._createChat}
                    />

                </Col>
            </Row>
        </Container>
    )
  }
}

const condition = authUser => !!authUser;

const mapStateToProps = state => ({
  isLoading: state.chatPage.isLoading,
});

const mapDispatchToProps = dispatch => ({
  pageLoading: () => dispatch({ type: actions.CHAT_PAGE_LOADING }),
  pageLoaded: () => dispatch({ type: actions.CHAT_PAGE_LOADED }),
});

export default compose(
  withProgressBar,
  withAuthorization(condition),
  graphql(gqls.CREATE_CHAT_MUTATION, { name: 'createChatMutation' }),
  graphql(gqls.ALL_CHATS_QUERY, { name: 'allChatsQuery' }),
  connect(mapStateToProps, mapDispatchToProps),
)(ChatPage);