import React from 'react';
import App from '../components/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ApolloProvider } from 'react-apollo';

import client from '../sources/apollo'


const AppContainer = () => (
  <MuiThemeProvider>
    <ApolloProvider client={client}>
      <App name="world" />
    </ApolloProvider>
  </MuiThemeProvider>
);


export default AppContainer
