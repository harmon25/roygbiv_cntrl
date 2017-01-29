import ApolloClient from 'apollo-client';

import {createNetworkInterface} from 'apollo-phoenix-websocket'

console.log(window.location)

const networkInterface = createNetworkInterface({
  uri: `ws://${window.location.host}/socket`,
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
