import ApolloClient from 'apollo-client';

import {createNetworkInterface} from 'apollo-phoenix-websocket'


const networkInterface = createNetworkInterface({
  uri: 'ws://192.168.1.53:4000/socket',
  channel: {
    topic: 'gql:query'
  }
})

networkInterface.useAfter([{
  applyAfterware({response, options}, next) {
    // throw an error that will trigger your error handler
    if (response.error) {
      throw new Error(response.error)
    }
    next();
  }
}])

export default new ApolloClient({networkInterface})
