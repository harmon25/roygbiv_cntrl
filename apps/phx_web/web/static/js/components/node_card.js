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
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import IconEqualizer from 'material-ui/svg-icons/av/equalizer';
import IconAdd from 'material-ui/svg-icons/av/playlist-add';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconLooks from 'material-ui/svg-icons/image/looks';

import {setNodeColour, openModal, closeModal} from '../reducers/actions'
import { bindActionCreators } from 'redux'


import {Grid, Row, Col} from 'react-flexbox-grid'

import { connect } from 'react-redux';

import rgbHex from 'rgb-hex'
import hexRgb from 'hex-rgb'


import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
  blueGrey100
} from 'material-ui/styles/colors';



const WhiteGrid = (props)=>{
  const fabstyle = { margin: 5 };
  const white_colours = ["#F0FFFF", "#F5FFFA", "#FFFFF0", "#FFFFE0","#FFFAF0"]

  return (
    <Grid style={{marginTop: 20}}>
     <Row center="xs">
   <Col md={1}><h3>Whites</h3></Col>
     </Row>
     <Row center="xs">
     {white_colours.map((c, i)=>(
       <Col key={i} xs={2} md={1}>
       <FloatingActionButton onTouchTap={props.action(c)} backgroundColor={c} style={fabstyle}>
       </FloatingActionButton>
       </Col>
     ))}
     </Row>
   </Grid>
  )
}

const avatar_comp = (colour)=>(
  <Avatar backgroundColor={colour} > A </Avatar>
)

function colListToObj(c){
  return {r: c[0], g: c[1], b: c[2]}
}

function colObjToHex(o){
  return rgbHex(o.r, o.g, o.b)
}

function colListToHex(c){
  return colObjToHex(colListToObj(c))
}


class NodeCard extends React.Component {
  state = {avatarColour: blue300, onState: false, selectedIndex: null}

  handleToggleState = ()=>{
    console.log("TOGGLE STATE")
    this.setState({onState: !this.state.onState })
  }

  toggleModal = ()=>{
    dispatch()
  }

  handleWhiteChange = (c)=>(()=>{
    const {dispatch} = this.props
    let rgb = hexRgb(c)
    dispatch(setNodeColour(this.props.name, rgb[0],rgb[1],rgb[2]));

  })

  handleColourChange = (color, event)=>{
    const {dispatch} = this.props
    console.log(color)
    console.log(color.rgb)
    const {r,g,b} = color.rgb
    dispatch(setNodeColour(this.props.name, r,g,b));
    this.setState({avatarColour: color.hex })
  }
  select = (index) => this.setState({selectedIndex: index});


  render(){
    console.log(this.props);
    const {dispatch, colour} = this.props
return (<Card style={{width: "95%", margin: 'auto', marginTop: 15}}>
   <CardHeader
     title={this.props.name}
     avatar={avatar_comp(this.state.avatarColour)}
   />
   <CardText>
     <h3 style={{textAlign: 'center'}}>Colours</h3>
     <SliderPicker color={ this.state.avatarColour } onChangeComplete={this.handleColourChange}/>

     <WhiteGrid action={this.handleWhiteChange}/>
   </CardText>
   <CardActions>
    <BottomNavigation selectedIndex={this.state.selectedIndex}>
     <BottomNavigationItem
       label={this.state.onState ? "ON" : "OFF"}
       icon={<LightBultOutline/>}
       onTouchTap={() => {
         this.handleToggleState();
         !this.state.onState ? this.select(0) : this.select(null)
        }}
     />
     <BottomNavigationItem
       label="Rainbow"
       icon={<IconLooks/>}
       onTouchTap={() => this.select(1)}
     />
     <BottomNavigationItem
       label="Visualizer"
       icon={<IconEqualizer/>}
       onTouchTap={() => this.select(2)}
     />
     <BottomNavigationItem
       label="Name"
       icon={<IconEdit/>}
       onTouchTap={()=>{
         dispatch(openModal("node-name"))
       }}
     />
     <BottomNavigationItem
       label="Group"
       icon={<IconAdd/>}
       onTouchTap={()=>{
         dispatch(openModal("node-group"))

       }}
     />
  </BottomNavigation>
   </CardActions>
 </Card>)
  }
}

const mapStateToProps = (state) => ({
  colour: state.app.colour
});

const mapDispatchToProps = (dispatch) =>( bindActionCreators({ setNodeColour }, dispatch))

//
export default connect(mapStateToProps)(NodeCard)
