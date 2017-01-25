import React from 'react';
import Nav from './nav_bar';
import NodeCard from './node_card';


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

  </div>
    	);
  }
}


const AppWithData = graphql(NodeQuery)(App);


export default AppWithData
