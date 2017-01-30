import React from 'react';
import Nav from './nav_bar';
import NodeCard from './node_card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { connect } from 'react-redux';

import { closeModal} from '../reducers/actions'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const NodeQuery = gql`query nodes {
  nodes {
    name
    state
    colour {
      c_rgb
    }
  }
}`;

const setColourMutations = gql`mutation setColour{
 setColour(node: $node, b: $b, g: $g, r: $r) {
    name
    state
    colour {
    c_rgb
    }
  }
}
`


const NodesList = (nodes) => (nodes.map((n,i)=>(<NodeCard name={n.name} key={i}/>)))

class App extends React.Component {

  modalClose = ()=>{
    const {dispatch} = this.props
    dispatch(closeModal())
  }

  render() {
    const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.modalClose}/>,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.modalClose}/>,
        ];

    console.log(this.props)
    let nodes = this.props.data.nodes || []
    const {modal} = this.props
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
   open={modal == "node-group" ? true : false}
   onRequestClose={this.modalClose}
   >
     <TextField
    fullWidth={true}
     hintText="LivingRoom"
     floatingLabelText="New Group"
   />
     <SelectField
       fullWidth={true}
      floatingLabelText="Frequency"
      value={1}
      >
       <MenuItem value={1} primaryText="Never" />
       <MenuItem value={2} primaryText="Every Night" />
         </SelectField>
 </Dialog>

 <Dialog
   title="Change Strip Name"
   actions={actions}
   modal={false}
   open={modal == "node-name" ? true : false}
   onRequestClose={this.modalClose}
   >
     <TextField
    fullWidth={true}
     hintText="BarLight"
     floatingLabelText="Strip Name"
   />
 </Dialog>

  </div>
    	);
  }
}


const AppWithData = graphql(NodeQuery)(App);

const mapStateToProps = (state) => ({
  modal: state.app.modal
});

export default connect(mapStateToProps)(AppWithData)
