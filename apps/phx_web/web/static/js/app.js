//import font from 'roboto-fontface/css/roboto/roboto-fontface.css';
//require('roboto-fontface/css/roboto/roboto-fontface.css')
import '../css/app.css'
import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import AppContainer from './containers';


ReactDom.render(<AppContainer/>, document.getElementById('app'))
