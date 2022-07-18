import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://dev-creator-backoffice-api.shopcat.click/graphql',
  cache: new InMemoryCache(),
});

export default client;
