# Firebase and React Boilerplate

Built thanks to:
https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/

Every Container or half-complex Component has its own reducer / set of actions.

*Firebase:*

You will need to setup an account with Firebase, get your config (for web) and paste the various keys/bits/bobs into a `.env` file as environment variables. They will then be accessed via the `REACT_APP...` env vars syntax.

Firebase/firebase.js config:-

```
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
}

```

Once you're setup, you can start enjoying the two propositions in Firebase that I've certainly found most useful.

🎉Authentication

&

🎉 Realtime Database

*Athentication first*:

1) All Firebase authentication methods are kept in a *class {...* component in `src/components/Firebase/firebase.js`:


```
   ...

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

    ...
```

2) The Firebase class that these appear in ^ is passed into a `<FirebaseContext.Provider value={new Firebase()}>` in `src/index.js`, so it's accessible anywhere in the app.

3) the counterpart to that Provider is `<Firebase.Consumer>` which sits in a HOC in `firebase/context.js` as `withFirebase`. Then any components that wants access to firebase authentication methods get it by wrapping themselves in a `withFirebase` wrapper/factory/HOC.

Eg. `<SignInPage>` exports using withFirebase:

```
export default compose(
    ...
    withFirebase,
    ...
)(SignInPage)
```


*Database second*:

Inside the Firebase/firebase.js class (see above) - there is also two methods for the database:

```
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref(`users`);
```

user: queries one specific user from the database, using the uid as a ref. 
users: gets you ALL users.

If you're unfamiliar with User Authentication & Database storage for user info, here's how it works, put simply:-

We fill out the form in `signup/index.js`. When they submit button is pressed, the `onSubmit()` is fired.

This creates a new user *in the Authentication part of Firebase* and then immediately creates an entry in their *Database section of Firebase*.

```

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          })
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);

```

We can then query that database at any point in the application by using the withFirebase HOC.

eg:

`this.props.firebase.user(uid)` or something like:

```
let uid = this.props.firebase.auth.currentUser.uid;
let email = this.props.firebase.auth.currentUser.email;
```



# ProgressBar

this uses `react-topbar-progress-indicator`.
And is a HOC. It lives in:-

`components/ProgressBar/with-progressBar.js`

To use:
include it in your compose statement of other HOCs/ factories:-

```
export default compose (
    ...
    withAuthentication,
    withProgressBar, <--here
    connect(mapStateToProps, mapDispatchToProps)
)
```

then to start and stop it:

```
    this.props.showProgressBar(true);
    this.props.showProgressBar(false);
```

Works well in ComponentWILLmount and ComponentDIDmount. Combined with redux `isLoading` actions/state.

