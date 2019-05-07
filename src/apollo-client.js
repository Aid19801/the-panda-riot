import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


// listens for new msgs at your graphQL instance
const wsLink = new WebSocketLink({
  uri: 'wss://subscriptions.graph.cool/v1/cjv9ievvm0vex01107eybniwc',
  options: {
    reconnect: true
  }
})

// posts msgs to your graphQL instance
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjv9ievvm0vex01107eybniwc' })

// decide which of httpLink or webSocket link listener to use
// if youre subscribed to ws then wsLink if not httpLink
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});


export default client; 