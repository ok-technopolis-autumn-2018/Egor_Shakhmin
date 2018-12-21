import { combineReducers } from 'redux';

import todos from './todos';

const combinedReducers = combineReducers({
  todos,
});

export default combinedReducers;
