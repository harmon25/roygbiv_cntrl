



const initialState = {
  nodes: [],
  apollo: null,
  update_channel: null,
}

export default function reducer(state = initialState, action) {

 switch (action.type) {
   case 'SET_APPOLO':
     return {...state, apollo: action.apollo}

    case 'SET_CHANNEL':
      return {...state, update_channel: action.channel}

   default:
    return state;

 }
}
