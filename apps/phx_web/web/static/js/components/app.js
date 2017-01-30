import React from 'react';
import Nav from './nav_bar';
import NodeCard from './node_card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const NodeQuery = gql`query nodes {
  nodes {
    name
    state
    colour {
      hex
    }
  }
}`;

const setColourMutations = gql`mutation setColour{
 setColour(node: $node, b: $b, g: $g, r: $r) {
    name
    state
    colour {
      hex
    }
  }
}
`
const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        //onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        //onTouchTap={this.handleClose}
      />,
    ];

const NodesList = (nodes) => (nodes.map((n,i)=>(<NodeCard name={n.name} type={n.type} key={i}/>)))

class App extends React.Component {
  render() {
    let nodes = this.props.data.nodes || []
    return (
    	<div>
<Nav />
 <div>
{NodesList(nodes)}
 </div>
 <Dialog
   title="Set/Change Strip Group"
   actions={actions}
   modal={false}
   open={false}
   //onRequestClose={this.handleClose}
   >
   The actions in this window were passed in as an array of React objects.
 </Dialog>

 <Dialog
   title="Change Strip Name"
   actions={actions}
   modal={false}
   open={false}
   //onRequestClose={this.handleClose}
   >
   The actions in this window were passed in as an array of React objects.
 </Dialog>

  </div>
    	);
  }
}


const AppWithData = graphql(NodeQuery)(App);


export default AppWithData
