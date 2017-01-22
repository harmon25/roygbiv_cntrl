import React from 'react'
import ReactDom from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class App extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

const AppContainer = () => (
  <MuiThemeProvider>
    <App name="world" />
  </MuiThemeProvider>
);


ReactDom.render(<AppContainer/>, document.getElementById('app'))
