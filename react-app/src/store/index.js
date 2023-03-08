import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import beersReducer from './beers';
import breweriesReducer from './brewery';
import reducer from './session';


// ASK YUAN ABOUT YOUR UPDATE TO THIS SECTION OF CODE ADDING the  Reducer portion
const rootReducer = combineReducers({
  session: reducer,
  beers: beersReducer,
  breweries: breweriesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = preloadedState => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
