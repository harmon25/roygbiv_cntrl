import * as c from './constants'

export const setNodeColour = (node,r,g,b)=>({type: c.SET_NODE_COLOUR, node_name: node, colour:[r,g,b]})
