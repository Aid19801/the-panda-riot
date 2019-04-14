import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from '../../components/Firebase';
import withProgressBar from '../../components/ProgressBar/with-progressBar';
import * as actions from './constants';

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentWillMount() {
    this.props.showProgressBar(true);
    this.props.pageLoading();
  }

  componentDidMount() {

    this.setState({ loading: true });
    

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
      this.props.pageLoaded();
      this.props.showProgressBar(false);
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {

    const { users } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <UserList users={users} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    isLoading: state.adminPage.isLoading,
});

const mapDispatchToProps = dispatch => ({
    pageLoading: () => dispatch({ type: actions.ADMIN_PAGE_LOADING }),
    pageLoaded: () => dispatch({ type: actions.ADMIN_PAGE_LOADED }),
});


export default compose(
    withFirebase,
    withProgressBar,
    connect(mapStateToProps, mapDispatchToProps),
)(AdminPage);