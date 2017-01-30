import * as c from './constants'

const initialState = {
  nodes: [],
  apollo: null,
  update_channel: null,
  modal: null,
  colour: {}
}

export default function reducer(state = initialState, action) {

 switch (action.type) {
   case 'SET_APPOLO':
     return {...state, apollo: action.apollo}

  case 'SET_CHANNEL':
    return {...state, update_channel: action.channel}

  case c.OPEN_MODAL:
    return {...state, modal: action.modal}

  case c.CLOSE_MODAL:
    return {...state, modal: null}

  case c.SET_NODE_COLOUR:
    return {...state, colour: state.colour[action.node_name] = action.colour}

   default:
    return state;

 }
}
