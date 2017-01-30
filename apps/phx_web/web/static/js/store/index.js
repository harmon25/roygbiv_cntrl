import { createStore, applyMiddleware, compose } from 'redux'
import createLogger                      from 'redux-logger';
import reducer                          from '../reducers'

import { combineReducers }  from 'redux';

const reducers = combineReducers({ app: reducer });

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});


export default function configureStore() {
  const redux_dev_tool = window.devToolsExtension ? window.devToolsExtension() : f => f
  const enhancer = compose(
      applyMiddleware(loggerMiddleware),
      redux_dev_tool
    )

  return createStore(reducers, enhancer);
}
