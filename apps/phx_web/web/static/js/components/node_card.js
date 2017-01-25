import React from 'react'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { SliderPicker, CirclePicker, GithubPicker } from 'react-color';
import Avatar from 'material-ui/Avatar';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import LightBultOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';


import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
  blueGrey100

} from 'material-ui/styles/colors';


const fabstyle = {
  margin: 5,
};

const avatar_comp = (colour)=>(
  <Avatar backgroundColor={colour} > A </Avatar>
)


const WhiteSelector = (props) => (<div style={{width: "90%", margin: 'auto'}}>
  <FloatingActionButton backgroundColor={"#F0FFFF"} style={fabstyle}>
        <ContentAdd color={blueGrey100} />
      </FloatingActionButton>
  <FloatingActionButton backgroundColor={"#F5FFFA"} style={fabstyle}>
    <ContentAdd color={blueGrey100}  />
  </FloatingActionButton>
  <FloatingActionButton backgroundColor={"#FFFFF0"} style={fabstyle}>
        <ContentAdd color={blueGrey100} />
      </FloatingActionButton>

      <FloatingActionButton backgroundColor={"#FFFAF0"} style={fabstyle}>
            <ContentAdd  color={blueGrey100} />
          </FloatingActionButton>
          <FloatingActionButton backgroundColor={"#FFFFE0"} style={fabstyle}>
                <ContentAdd color={blueGrey100} />
              </FloatingActionButton>
   </div>)


class NodeCard extends React.Component {
  state = {avatarColour: blue300, onState: false}

  handleToggleState = ()=>{
    console.log("TOGGLE STATE")
    this.setState({onState: !this.state.onState })
  }

  handleColourChange = (color, event)=>{
    console.log(this.props.name)
    console.log(color)
    console.log(color.rgb)
    this.setState({avatarColour: color.hex})
  }

  render(){
return (<Card style={{width: "95%", margin: 'auto', marginTop: 15}}>
   <CardHeader
     title={this.props.name}
     subtitle={this.props.type}
     avatar={avatar_comp(this.state.avatarColour)}
   />
     <CardText>
<SliderPicker color={ this.state.avatarColour } onChangeComplete={this.handleColourChange}/>
<WhiteSelector />

     </CardText>
   <CardActions>
     <RaisedButton fullWidth={true} label="Rainbow" /> <br/>
     <RaisedButton fullWidth={true} label="Visualizer" />

     <RaisedButton fullWidth={true} label="Set Group" />
     <RaisedButton fullWidth={true} label="Change Name" />
     <IconButton onTouchTap={this.handleToggleState} iconStyle={this.state.onState ? {color: this.state.avatarColour } : {color: "#000000" } } tooltip={!this.state.onState ? "TURN ON" : "TURN OFF"}>
      <LightBultOutline />
    </IconButton>

   </CardActions>
 </Card>)
  }
}

//
export default NodeCard
