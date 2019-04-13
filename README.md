# Firebase and React Boilerplate

Built thanks to:
https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/

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

