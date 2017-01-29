import React from 'react'
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { SliderPicker, CirclePicker, GithubPicker } from 'react-color';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import LightBultOutline from 'material-ui/svg-icons/action/lightbulb-outline';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

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
    <ContentAdd color={blue300}  />
  </FloatingActionButton>
  <FloatingActionButton backgroundColor={"#FFFFF0"} style={fabstyle}>
        <ContentAdd color={blueGrey100} />
    </FloatingActionButton>
  <FloatingActionButton backgroundColor={"#FFFFE0"} style={fabstyle}>
        <ContentAdd color={blueGrey100} />
      </FloatingActionButton>
      <FloatingActionButton backgroundColor={"#FFFAF0"} style={fabstyle}>
            <ContentAdd  color={blueGrey100} />
          </FloatingActionButton>
   </div>)


class NodeCard extends React.Component {
  state = {avatarColour: blue300, onState: false, selectedIndex: null}

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
  select = (index) => this.setState({selectedIndex: index});


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

    <BottomNavigation selectedIndex={this.state.selectedIndex}>
             <BottomNavigationItem
               label={this.state.onState ? "ON" : "OFF"}
               icon={recentsIcon}
               onTouchTap={() => {
                 this.handleToggleState();
                 !this.state.onState ? this.select(0) : this.select(null)
                }}
             />
             <BottomNavigationItem
               label="Rainbow"
               icon={favoritesIcon}
               onTouchTap={() => this.select(1)}
             />
             <BottomNavigationItem
               label="Visualizer"
               icon={nearbyIcon}
               onTouchTap={() => this.select(2)}
             />
             <BottomNavigationItem
               label="Group"
               icon={nearbyIcon}
               onTouchTap={() => this.select(3)}
             />
             <BottomNavigationItem
               label="Name"
               icon={nearbyIcon}
               onTouchTap={() => this.select(4)}
             />
           </BottomNavigation>
   </CardActions>
 </Card>)
  }
}

//
export default NodeCard
