
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import DevTools from '~/js/components/DevTools';
import combinedRedusers from '../reducers';

const loggerMiddleware = createLogger();

function isSSR() {
  return (typeof window === 'undefined');
}

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  ),
  DevTools.instrument(),
);

let reduxStore = null;

function makeStore(initializeState) {
  const store = createStore(combinedRedusers, initializeState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(combinedRedusers),
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
