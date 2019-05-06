import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import * as serviceWorker from './serviceWorker';

// graphql
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

import store from './store';
import client from './apollo-client';


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </Provider>
  </ApolloProvider>
  ,
  document.getElementById('root'),
);

serviceWorker.unregister();