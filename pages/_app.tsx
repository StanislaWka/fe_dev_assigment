import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
