import React from 'react';

import { withFirebase } from '../Firebase';

import './styles.scss';

const SignOutButton = ({ firebase }) => (
  <button className="btn__signout" type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);