import * as c from './constants'

export const setNodeColour = (node,r,g,b)=>({type: c.SET_NODE_COLOUR, node_name: node, colour:[r,g,b]})

export const openModal = (modal)=>({type: c.OPEN_MODAL, modal: modal})
export const closeModal = (modal)=>({type: c.CLOSE_MODAL})
