import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';
import store from './store';
import client from './apollo-client';

import './index.scss';

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