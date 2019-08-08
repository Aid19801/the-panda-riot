import React from 'react';
import Button from 'react-bootstrap/Button';
import { withFirebase } from '../Firebase';

import './styles.scss';

const SignOutButton = ({ firebase }) => (
  <Button className="btn__signout" variant="warning" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export default withFirebase(SignOutButton);