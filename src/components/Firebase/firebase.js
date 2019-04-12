import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
}

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    console.log('this auth: ', this.auth)
}

    // create user
    doCreateUserWithEmailAndPassword = (email, password) => {
      return this.auth.createUserWithEmailAndPassword(email, password);
    }

    // sign-in user
    doSignInWithEmailAndPassword = (email, password) => {
      return this.auth.signInWithEmailAndPassword(email, password);
    }

    // sign-out user
    doSignOut = () => this.auth.signOut();

    // pw re-set
    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    // pw update
    doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

    // get a unique ID back from firebase - so we can use it as a ref in other databases.
    doGetFirebaseUIDandEmailForRedux = () => {
      let obj = {
        email: this.auth.currentUser.email,
        uid: this.auth.O
      };
      return obj;
    }

    
}

export default Firebase;