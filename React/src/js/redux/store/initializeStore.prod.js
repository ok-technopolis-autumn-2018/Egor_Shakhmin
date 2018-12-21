
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combinedReducers from '../reducers';

function isSSR() {
  return (typeof window === 'undefined');
}

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
  ),
);

let reduxStore = null;

function makeStore(initializeState) {
  const store = createStore(combinedReducers, initializeState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(combinedReducers),
    );
  }

  return store;
}

function initializeStore() {
  if (isSSR()) {
    // Create new store for every server-side request
    return makeStore();
  }

  if (!reduxStore) {
    reduxStore = makeStore();
  }
  return reduxStore;
}

export default initializeStore;
