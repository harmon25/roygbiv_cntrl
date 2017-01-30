//import font from 'roboto-fontface/css/roboto/roboto-fontface.css';
//require('roboto-fontface/css/roboto/roboto-fontface.css')
import '../css/app.css'
import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider }                 from 'react-redux';

//import chanel from './sources/phx_channel'

import configureStore from './store'

const store = configureStore();


injectTapEventPlugin();

import AppContainer from './containers';


ReactDom.render(<AppContainer/>, document.getElementById('app'))
