import React from 'react';
import App from '../components/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { ApolloProvider } from 'react-apollo';

import createStore from '../store'
import client from '../sources/apollo'

const AppContainer = () => (
  <MuiThemeProvider>
    <ApolloProvider store={createStore()} client={client}>
      <App />
    </ApolloProvider>
  </MuiThemeProvider>
);


export default AppContainer
